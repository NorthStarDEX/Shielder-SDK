import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import {
  DustSecretKey,
  LedgerParameters,
  ZswapSecretKeys,
  addressFromKey,
  nativeToken,
  signatureVerifyingKey,
} from '@midnight-ntwrk/ledger-v8';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { InMemoryTransactionHistoryStorage } from '@midnight-ntwrk/wallet-sdk-abstractions';
import { DustWallet } from '@midnight-ntwrk/wallet-sdk-dust-wallet';
import { WalletEntrySchema, WalletFacade, mergeWalletEntries } from '@midnight-ntwrk/wallet-sdk-facade';
import { HDWallet, Roles } from '@midnight-ntwrk/wallet-sdk-hd';
import { ShieldedWallet } from '@midnight-ntwrk/wallet-sdk-shielded';
import { PublicKey, UnshieldedWallet, createKeystore } from '@midnight-ntwrk/wallet-sdk-unshielded-wallet';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { u8aToHex } from '@polkadot/util';

export const NETWORK_ID = process.env.MIDNIGHT_NETWORK ?? 'preprod';
export const WALLET_DIR = path.resolve(process.env.MULTI_RESERVE_WALLET_DIR ?? 'local/wallet-preprod');
export const SEED_PATH = path.join(WALLET_DIR, 'wallet.seed');
export const CHECKPOINT_PATH = path.join(WALLET_DIR, 'wallet.checkpoint.json');
export const NATIVE_TOKEN = nativeToken().raw;

export const environment = {
  walletNetworkId: NETWORK_ID,
  indexer: process.env.PREPROD_INDEXER_URL ?? 'https://indexer.preprod.midnight.network/api/v4/graphql',
  indexerWS: process.env.PREPROD_INDEXER_WS_URL ?? 'wss://indexer.preprod.midnight.network/api/v4/graphql/ws',
  nodeWS: process.env.PREPROD_NODE_WS_URL ?? 'wss://rpc.preprod.midnight.network',
};

export const displayPath = (file) => {
  const relative = path.relative(process.cwd(), file);
  return relative && !relative.startsWith('..') && !path.isAbsolute(relative) ? relative : path.basename(file);
};

export const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

export const writeJson = async (file, value) => {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(
    file,
    `${JSON.stringify(
      value,
      (_key, item) => (typeof item === 'bigint' ? item.toString() : item),
      2,
    )}\n`,
    { mode: 0o600 },
  );
};

export const withTimeout = async (promise, label, timeoutMs) => {
  if (timeoutMs <= 0) return await promise;
  let timer;
  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(`${label}_timeout_after_${timeoutMs}ms`)), timeoutMs);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
};

export const normalizeSeed = (seed) => {
  const normalized = String(seed ?? '').trim().replace(/^0x/iu, '').toLowerCase();
  if (normalized.length < 64 || normalized.length % 2 !== 0 || !/^[0-9a-f]+$/u.test(normalized)) {
    throw new Error('wallet.seed must be hex and at least 32 bytes');
  }
  return normalized;
};

const deriveRoleSecret = ({ hdWallet, account, role, keyIndex }) => {
  const result = hdWallet.selectAccount(Number(account)).selectRole(role).deriveKeyAt(Number(keyIndex));
  if (result.type !== 'keyDerived') {
    throw new Error(`key_derivation_failed:${String(role)}:${keyIndex}`);
  }
  try {
    return Uint8Array.from(result.key);
  } finally {
    result.key.fill(0);
  }
};

const deriveAuthoritySecrets = ({ seed, account, keyIndex }) => {
  const result = HDWallet.fromSeed(Buffer.from(normalizeSeed(seed), 'hex'));
  if (result.type !== 'seedOk') throw new Error('invalid_seed_for_hd_wallet');
  try {
    return {
      shielded: deriveRoleSecret({ hdWallet: result.hdWallet, account, role: Roles.Zswap, keyIndex }),
      unshielded: deriveRoleSecret({ hdWallet: result.hdWallet, account, role: Roles.NightExternal, keyIndex }),
      dust: deriveRoleSecret({ hdWallet: result.hdWallet, account, role: Roles.Dust, keyIndex }),
    };
  } finally {
    result.hdWallet.clear();
  }
};

const deriveWalletMaterial = ({ seed, account, keyIndex }) => {
  const secrets = deriveAuthoritySecrets({ seed, account, keyIndex });
  const unshieldedKeyStore = createKeystore(secrets.unshielded, NETWORK_ID);
  const unshieldedPublicKey = signatureVerifyingKey(Buffer.from(secrets.unshielded).toString('hex'));
  const unshieldedAddressHex = String(addressFromKey(unshieldedPublicKey)).toLowerCase();

  return {
    account,
    keyIndex,
    shieldedSecretKeys: ZswapSecretKeys.fromSeed(secrets.shielded),
    dustSecretKey: DustSecretKey.fromSeed(secrets.dust),
    unshieldedKeyStore,
    unshieldedPublicKey,
    unshieldedAddress: unshieldedKeyStore.getBech32Address().toString(),
    unshieldedAddressHex,
    clear() {
      this.shieldedSecretKeys.clear?.();
      this.dustSecretKey.clear?.();
      for (const value of Object.values(secrets)) value.fill(0);
    },
  };
};

const fetchDustParameters = async () => {
  const response = await fetch(environment.indexer, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: 'query MultiReserveWalletDustParameters { block { ledgerParameters } }' }),
  });
  if (!response.ok) throw new Error(`indexer_dust_parameters_failed:${response.status}`);
  const body = await response.json();
  if (body.errors?.length) throw new Error(`indexer_dust_parameters_failed:${body.errors[0]?.message ?? 'unknown'}`);
  const ledgerParameters = body.data?.block?.ledgerParameters;
  if (ledgerParameters == null) throw new Error('indexer_dust_parameters_missing');
  return LedgerParameters.deserialize(Buffer.from(String(ledgerParameters), 'hex')).dust;
};

export const openWalletRuntime = async () => {
  if (!existsSync(SEED_PATH)) {
    throw new Error('missing wallet.seed; run `npm run wallet:seed` first or set MULTI_RESERVE_WALLET_DIR');
  }

  setNetworkId(NETWORK_ID);
  const checkpoint = existsSync(CHECKPOINT_PATH) ? await readJson(CHECKPOINT_PATH) : {};
  const seed = normalizeSeed(await readFile(SEED_PATH, 'utf8'));
  const account = Number(checkpoint.account ?? process.env.MULTI_RESERVE_WALLET_ACCOUNT ?? 0);
  const keyIndex = Number(checkpoint.keyIndex ?? process.env.MULTI_RESERVE_WALLET_KEY_INDEX ?? 0);
  const material = deriveWalletMaterial({ seed, account, keyIndex });

  if (checkpoint.network && checkpoint.network !== NETWORK_ID) {
    throw new Error(`checkpoint_network_mismatch:${checkpoint.network}`);
  }
  if (checkpoint.unshieldedAddress && checkpoint.unshieldedAddress !== material.unshieldedAddress) {
    throw new Error('checkpoint_unshielded_address_mismatch');
  }

  const txHistoryStorage = checkpoint.txHistory
    ? InMemoryTransactionHistoryStorage.restore(checkpoint.txHistory, WalletEntrySchema, mergeWalletEntries)
    : new InMemoryTransactionHistoryStorage(WalletEntrySchema, mergeWalletEntries);
  const configuration = {
    networkId: environment.walletNetworkId,
    relayURL: new URL(environment.nodeWS),
    indexerClientConnection: {
      indexerHttpUrl: environment.indexer,
      indexerWsUrl: environment.indexerWS,
    },
    txHistoryStorage,
    costParameters: {
      feeBlocksMargin: Number(process.env.SHIELD_RESERVE_FEE_BLOCKS_MARGIN ?? 10),
      additionalFeeOverhead: BigInt(process.env.SHIELD_RESERVE_ADDITIONAL_FEE_OVERHEAD ?? 1_000_000_000_000),
    },
    batchUpdates: {
      size: Number(process.env.SHIELD_RESERVE_WALLET_SYNC_BATCH_SIZE ?? 1000),
      timeout: Number(process.env.SHIELD_RESERVE_WALLET_SYNC_BATCH_TIMEOUT_MS ?? 50),
      spacing: Number(process.env.SHIELD_RESERVE_WALLET_SYNC_BATCH_SPACING_MS ?? 0),
    },
    provingServerUrl: new URL(process.env.PREPROD_PROOF_SERVER_URL ?? 'http://127.0.0.1:6300'),
  };

  const shielded = checkpoint.shieldedState
    ? ShieldedWallet(configuration).restore(checkpoint.shieldedState)
    : ShieldedWallet(configuration).startWithSecretKeys(material.shieldedSecretKeys);
  const unshielded = checkpoint.unshieldedState
    ? UnshieldedWallet(configuration).restore(checkpoint.unshieldedState)
    : UnshieldedWallet(configuration).startWithPublicKey(PublicKey.fromKeyStore(material.unshieldedKeyStore));
  const dust = checkpoint.dustState
    ? DustWallet(configuration).restore(checkpoint.dustState)
    : DustWallet(configuration).startWithSecretKey(material.dustSecretKey, await fetchDustParameters());
  const facade = await WalletFacade.init({
    configuration,
    shielded: () => shielded,
    unshielded: () => unshielded,
    dust: () => dust,
  });

  return { facade, material, checkpoint, txHistoryStorage, started: false };
};

export const startWalletRuntime = async (runtime) => {
  await runtime.facade.start(runtime.material.shieldedSecretKeys, runtime.material.dustSecretKey);
  runtime.started = true;
};

export const saveCheckpoint = async (runtime) => {
  const next = {
    ...runtime.checkpoint,
    network: NETWORK_ID,
    account: runtime.material.account,
    keyIndex: runtime.material.keyIndex,
    unshieldedAddress: runtime.material.unshieldedAddress,
    unshieldedAddressHex: runtime.material.unshieldedAddressHex,
    syncedAt: new Date().toISOString(),
    shieldedState: await runtime.facade.shielded.serializeState(),
    unshieldedState: await runtime.facade.unshielded.serializeState(),
    dustState: await runtime.facade.dust.serializeState(),
    txHistory: await runtime.txHistoryStorage.serialize(),
  };
  await writeJson(CHECKPOINT_PATH, next);
  runtime.checkpoint = next;
};

export const closeWalletRuntime = async (runtime) => {
  try {
    if (runtime.started) await runtime.facade.stop().catch(() => undefined);
  } finally {
    runtime.material.clear();
  }
};

export const balanceOf = (balances, token) => BigInt(balances?.[token] ?? balances?.[token.toLowerCase()] ?? 0n);

export const dustBalance = (state) => BigInt(state.dust?.balance?.(new Date()) ?? 0n);

const progressRatio = ({ applied, target, connected }) => {
  if (!connected) return { pct: 0, applied, target };
  if (target <= 0n) return { pct: 100, applied, target };
  const boundedApplied = applied > target ? target : applied;
  return { pct: Number((boundedApplied * 10_000n) / target) / 100, applied, target };
};

const indexedProgress = (progress) =>
  progressRatio({
    applied: BigInt(progress?.appliedIndex ?? 0n),
    target: BigInt(progress?.highestRelevantWalletIndex ?? progress?.highestIndex ?? 0n),
    connected: Boolean(progress?.isConnected),
  });

const unshieldedProgress = (progress) =>
  progressRatio({
    applied: BigInt(progress?.appliedId ?? 0n),
    target: BigInt(progress?.highestTransactionId ?? 0n),
    connected: Boolean(progress?.isConnected),
  });

const fmtProgress = ({ pct, applied, target }) => `${pct.toFixed(2)}% (${applied}/${target})`;

export const syncProgressLine = (state) => {
  const shielded = indexedProgress(state?.shielded?.progress);
  const unshielded = unshieldedProgress(state?.unshielded?.progress);
  const dust = indexedProgress(state?.dust?.progress);
  const total = Math.min(shielded.pct, unshielded.pct, dust.pct);
  return `sync ${total.toFixed(2)}% | shielded=${fmtProgress(shielded)} unshielded=${fmtProgress(unshielded)} dust=${fmtProgress(dust)}`;
};

export const syncAndSave = async (runtime, { log = () => undefined, timeoutMs = 300_000, progressIntervalMs = 5_000 } = {}) => {
  let latestState;
  const subscription = runtime.facade.state().subscribe((state) => {
    latestState = state;
  });
  const progressTimer = setInterval(() => {
    if (latestState) log(syncProgressLine(latestState));
  }, progressIntervalMs);
  let state;
  try {
    state = await withTimeout(runtime.facade.waitForSyncedState(), 'wallet_sync', timeoutMs);
  } finally {
    clearInterval(progressTimer);
    subscription.unsubscribe();
  }
  log(syncProgressLine(state));
  await saveCheckpoint(runtime);
  return state;
};

export const transactionIdFromFinalized = (finalized) => {
  const identifiers = finalized?.identifiers?.();
  if (identifiers == null) return '';
  const values = typeof identifiers[Symbol.iterator] === 'function' ? Array.from(identifiers) : [identifiers];
  return String(values.at(-1) ?? '');
};

export const submitDirectly = async (finalized) => {
  const serialized = finalized.serialize?.();
  if (!(serialized instanceof Uint8Array)) throw new Error('finalized_transaction_not_serializable');
  const api = await ApiPromise.create({
    provider: new WsProvider(environment.nodeWS),
    throwOnConnect: false,
    noInitWarn: true,
  });
  try {
    const extrinsic = api.tx.midnight.sendMnTransaction(u8aToHex(serialized));
    return await withTimeout(api.rpc.author.submitExtrinsic(extrinsic.toHex()), 'direct_rpc_submit', Number(process.env.SHIELD_RESERVE_SUBMIT_TIMEOUT_MS ?? 60_000));
  } finally {
    await api.disconnect().catch(() => undefined);
  }
};

export const submitFinalizedTransaction = async (runtime, finalized) => {
  await runtime.facade.pendingTransactionsService?.addPendingTransaction?.(finalized).catch(() => undefined);
  const txId = transactionIdFromFinalized(finalized);
  if (!txId) throw new Error('finalized_transaction_id_missing');
  await submitDirectly(finalized);
  return txId;
};

export const watchTx = async (txId, label) => {
  if (!txId) throw new Error(`${label}_tx_id_missing`);
  const provider = indexerPublicDataProvider(environment.indexer, environment.indexerWS);
  await withTimeout(provider.watchForTxData(txId), `${label}_indexer_watch`, Number(process.env.SHIELD_RESERVE_INDEXER_WATCH_TIMEOUT_MS ?? 300_000));
};
