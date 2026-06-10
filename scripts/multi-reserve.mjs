#!/usr/bin/env node
import { randomBytes } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import * as CompactJS from '@midnight-ntwrk/compact-js/effect';
import { createCircuitContext } from '@midnight-ntwrk/compact-runtime';
import {
  DustSecretKey,
  LedgerParameters,
  ZswapSecretKeys,
  addressFromKey,
  nativeToken,
  signatureVerifyingKey,
} from '@midnight-ntwrk/ledger-v8';
import { findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { asContractAddress } from '@midnight-ntwrk/midnight-js-types';
import { InMemoryTransactionHistoryStorage } from '@midnight-ntwrk/wallet-sdk-abstractions';
import { DustWallet } from '@midnight-ntwrk/wallet-sdk-dust-wallet';
import { WalletEntrySchema, WalletFacade, mergeWalletEntries } from '@midnight-ntwrk/wallet-sdk-facade';
import { HDWallet, Roles } from '@midnight-ntwrk/wallet-sdk-hd';
import { ShieldedWallet } from '@midnight-ntwrk/wallet-sdk-shielded';
import { PublicKey, UnshieldedWallet, createKeystore } from '@midnight-ntwrk/wallet-sdk-unshielded-wallet';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { u8aToHex } from '@polkadot/util';

import * as MultiShieldReserve from '../artifacts/MultiShieldReserve/contract/index.js';

const NETWORK_ID = process.env.MIDNIGHT_NETWORK ?? 'preprod';
const WALLET_DIR = path.resolve(process.env.MULTI_RESERVE_WALLET_DIR ?? 'local/wallet-preprod');
const SEED_PATH = path.join(WALLET_DIR, 'wallet.seed');
const CHECKPOINT_PATH = path.join(WALLET_DIR, 'wallet.checkpoint.json');
const RESULT_PATH = path.resolve('local', process.env.MULTI_RESERVE_RESULT_FILE ?? 'multi-shield-reserve-live-result.json');
const PRIVATE_PASSWORD = process.env.MIDNIGHT_PRIVATE_STATE_PASSWORD ?? 'Multi-Shield-Reserve-Local-Password-1!';
const PROOF_SERVER_URL = process.env.PREPROD_PROOF_SERVER_URL ?? 'http://127.0.0.1:6300';
const TX_TTL_SECONDS = Number(process.env.SHIELD_RESERVE_TX_TTL_SECONDS ?? 3600);
const SUBMIT_TIMEOUT_MS = Number(process.env.SHIELD_RESERVE_SUBMIT_TIMEOUT_MS ?? 60_000);
const SUBMIT_RETRY_ATTEMPTS = Number(process.env.SHIELD_RESERVE_SUBMIT_RETRY_ATTEMPTS ?? 3);
const CALL_RETRY_ATTEMPTS = Number(process.env.SHIELD_RESERVE_CALL_RETRY_ATTEMPTS ?? 2);
const FEE_BLOCKS_MARGIN = Number(process.env.SHIELD_RESERVE_FEE_BLOCKS_MARGIN ?? 10);
const ADDITIONAL_FEE_OVERHEAD = BigInt(process.env.SHIELD_RESERVE_ADDITIONAL_FEE_OVERHEAD ?? 1_000_000_000_000);
const INDEXER_WATCH_TIMEOUT_MS = Number(process.env.SHIELD_RESERVE_INDEXER_WATCH_TIMEOUT_MS ?? 300_000);
const SYNC_TIMEOUT_MS = Number(process.env.SHIELD_RESERVE_SYNC_TIMEOUT_MS ?? 300_000);
const CONTRACT_ADDRESS = process.env.MULTI_RESERVE_CONTRACT_ADDRESS?.trim() ?? '';
const ACTION = process.env.MULTI_RESERVE_ACTION?.trim() ?? '';
const AMOUNT = BigInt(process.env.MULTI_RESERVE_AMOUNT ?? 1);
const ZERO_BYTES32 = '0'.repeat(64);
const TOKEN_TYPES = (
  process.env.MULTI_RESERVE_TOKEN_TYPES?.split(',').map((value) => value.trim()).filter(Boolean) ??
  (process.env.MULTI_RESERVE_TOKEN_TYPE ? [process.env.MULTI_RESERVE_TOKEN_TYPE.trim()] : [])
);
const NATIVE_TOKEN = nativeToken().raw;

const environment = {
  walletNetworkId: NETWORK_ID,
  networkId: NETWORK_ID,
  indexer: process.env.PREPROD_INDEXER_URL ?? 'https://indexer.preprod.midnight.network/api/v4/graphql',
  indexerWS: process.env.PREPROD_INDEXER_WS_URL ?? 'wss://indexer.preprod.midnight.network/api/v4/graphql/ws',
  nodeWS: process.env.PREPROD_NODE_WS_URL ?? 'wss://rpc.preprod.midnight.network',
};

const multiReserveDir = path.resolve('artifacts', 'MultiShieldReserve');
const multiReserveCompiledContract = CompactJS.CompiledContract.make('MultiShieldReserve', MultiShieldReserve.Contract).pipe(
  CompactJS.CompiledContract.withVacantWitnesses,
  CompactJS.CompiledContract.withCompiledFileAssets(multiReserveDir),
);

const log = (message) => console.log(`[multi-reserve] ${message}`);
const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const displayPath = (file) => {
  const relative = path.relative(process.cwd(), file);
  return relative && !relative.startsWith('..') && !path.isAbsolute(relative) ? relative : path.basename(file);
};
const toHex = (bytes) => Buffer.from(bytes).toString('hex').toLowerCase();
const randomBytes32 = () => Uint8Array.from(randomBytes(32));
const hexToBytes32 = (hex, label = 'bytes32') => {
  const normalized = String(hex ?? '').trim().replace(/^0x/iu, '').toLowerCase();
  if (normalized.length !== 64 || !/^[0-9a-f]+$/u.test(normalized)) {
    throw new Error(`${label}_must_be_32_byte_hex`);
  }
  return Uint8Array.from(Buffer.from(normalized, 'hex'));
};
const coinToCompactShieldedInfo = (coin) => ({
  color: hexToBytes32(coin.type, 'shielded_coin_type'),
  nonce: hexToBytes32(coin.nonce, 'shielded_coin_nonce'),
  value: BigInt(coin.value),
});

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));
const writeJson = async (file, value) => {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(
    file,
    `${JSON.stringify(
      value,
      (_key, item) => {
        if (typeof item === 'bigint') return item.toString();
        if (item instanceof Uint8Array) return toHex(item);
        return item;
      },
      2,
    )}\n`,
    { mode: 0o600 },
  );
};

const withTimeout = async (promise, label, timeoutMs) => {
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

const normalizeSeed = (seed) => {
  const normalized = String(seed ?? '').trim().replace(/^0x/iu, '').toLowerCase();
  if (normalized.length < 64 || normalized.length % 2 !== 0 || !/^[0-9a-f]+$/u.test(normalized)) {
    throw new Error('seed_must_be_hex_at_least_32_bytes');
  }
  return normalized;
};

const deriveRoleSecret = ({ hdWallet, account = 0, role, keyIndex = 0 }) => {
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

const deriveAuthoritySecrets = ({ seed, account = 0, keyIndex = 0 }) => {
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

const deriveWalletMaterial = (walletFile) => {
  const account = Number(walletFile.account ?? 0);
  const keyIndex = Number(walletFile.keyIndex ?? 0);
  const seed = normalizeSeed(walletFile.seed);
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
    body: JSON.stringify({ query: 'query MultiReserveDustParameters { block { ledgerParameters } }' }),
  });
  if (!response.ok) throw new Error(`indexer_dust_parameters_failed:${response.status}`);
  const body = await response.json();
  if (body.errors?.length) throw new Error(`indexer_dust_parameters_failed:${body.errors[0]?.message ?? 'unknown'}`);
  const ledgerParameters = body.data?.block?.ledgerParameters;
  if (ledgerParameters == null) throw new Error('indexer_dust_parameters_missing');
  return LedgerParameters.deserialize(Buffer.from(String(ledgerParameters), 'hex')).dust;
};

const openRuntime = async (walletFile, checkpoint) => {
  const material = deriveWalletMaterial(walletFile);
  if (checkpoint?.unshieldedAddress && checkpoint.unshieldedAddress !== material.unshieldedAddress) {
    throw new Error('checkpoint_unshielded_address_mismatch');
  }
  const txHistoryStorage = checkpoint?.txHistory
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
      feeBlocksMargin: FEE_BLOCKS_MARGIN,
      additionalFeeOverhead: ADDITIONAL_FEE_OVERHEAD,
    },
    batchUpdates: {
      size: Number(process.env.SHIELD_RESERVE_WALLET_SYNC_BATCH_SIZE ?? 1000),
      timeout: Number(process.env.SHIELD_RESERVE_WALLET_SYNC_BATCH_TIMEOUT_MS ?? 50),
      spacing: Number(process.env.SHIELD_RESERVE_WALLET_SYNC_BATCH_SPACING_MS ?? 0),
    },
    provingServerUrl: new URL(PROOF_SERVER_URL),
  };

  const shielded = checkpoint?.shieldedState
    ? ShieldedWallet(configuration).restore(checkpoint.shieldedState)
    : ShieldedWallet(configuration).startWithSecretKeys(material.shieldedSecretKeys);
  const unshielded = checkpoint?.unshieldedState
    ? UnshieldedWallet(configuration).restore(checkpoint.unshieldedState)
    : UnshieldedWallet(configuration).startWithPublicKey(PublicKey.fromKeyStore(material.unshieldedKeyStore));
  const dust = checkpoint?.dustState
    ? DustWallet(configuration).restore(checkpoint.dustState)
    : DustWallet(configuration).startWithSecretKey(material.dustSecretKey, await fetchDustParameters());
  const facade = await WalletFacade.init({
    configuration,
    shielded: () => shielded,
    unshielded: () => unshielded,
    dust: () => dust,
  });

  await facade.start(material.shieldedSecretKeys, material.dustSecretKey);
  return { facade, material, txHistoryStorage };
};

const saveCheckpoint = async (runtime, walletFile, checkpoint = {}) => {
  const next = {
    ...checkpoint,
    network: NETWORK_ID,
    account: runtime.material.account,
    keyIndex: runtime.material.keyIndex,
    unshieldedAddress: runtime.material.unshieldedAddress,
    unshieldedAddressHex: runtime.material.unshieldedAddressHex,
    dust: checkpoint.dust ?? walletFile.dust,
    syncedAt: new Date().toISOString(),
    shieldedState: await runtime.facade.shielded.serializeState(),
    unshieldedState: await runtime.facade.unshielded.serializeState(),
    dustState: await runtime.facade.dust.serializeState(),
    txHistory: await runtime.txHistoryStorage.serialize(),
  };
  await writeJson(CHECKPOINT_PATH, next);
};

const closeRuntime = async (runtime, walletFile, checkpoint) => {
  try {
    await saveCheckpoint(runtime, walletFile, checkpoint).catch((error) =>
      log(`checkpoint save skipped: ${error instanceof Error ? error.message : error}`),
    );
    await runtime.facade.stop();
  } finally {
    runtime.material.clear();
  }
};

const balanceOf = (balances, token) => BigInt(balances?.[token] ?? balances?.[token.toLowerCase()] ?? 0n);
const dustBalance = (state) => BigInt(state.dust?.balance?.(new Date()) ?? 0n);
const snapshotState = (state, tokenTypes = []) => ({
  isSynced: Boolean(state.isSynced),
  unshieldedNative: balanceOf(state.unshielded?.balances, NATIVE_TOKEN).toString(),
  shieldedNative: balanceOf(state.shielded?.balances, NATIVE_TOKEN).toString(),
  dust: dustBalance(state).toString(),
  unshieldedUtxos: state.unshielded?.availableCoins?.length ?? null,
  tokens: Object.fromEntries(
    tokenTypes.map((token) => [
      token,
      {
        unshielded: balanceOf(state.unshielded?.balances, token).toString(),
        shielded: balanceOf(state.shielded?.balances, token).toString(),
      },
    ]),
  ),
});

const waitForSyncedState = async (runtime, label, walletFile, checkpoint, tokenTypes = []) => {
  log(`${label}: syncing`);
  const state = await withTimeout(runtime.facade.waitForSyncedState(), label.replace(/[^a-z0-9]+/giu, '_'), SYNC_TIMEOUT_MS);
  log(`${label}: ${JSON.stringify(snapshotState(state, tokenTypes))}`);
  await saveCheckpoint(runtime, walletFile, checkpoint);
  return state;
};

const transactionIdFromFinalized = (finalized) => {
  const identifiers = finalized?.identifiers?.();
  if (identifiers == null) return '';
  const values = typeof identifiers[Symbol.iterator] === 'function' ? Array.from(identifiers) : [identifiers];
  return String(values.at(-1) ?? '');
};

const submitDirectly = async (finalized) => {
  const serialized = finalized.serialize?.();
  if (!(serialized instanceof Uint8Array)) throw new Error('finalized_transaction_not_serializable');
  const api = await ApiPromise.create({
    provider: new WsProvider(environment.nodeWS),
    throwOnConnect: false,
    noInitWarn: true,
  });
  try {
    const extrinsic = api.tx.midnight.sendMnTransaction(u8aToHex(serialized));
    const txHash = await withTimeout(api.rpc.author.submitExtrinsic(extrinsic.toHex()), 'direct_rpc_submit', SUBMIT_TIMEOUT_MS);
    log(`direct RPC accepted extrinsic=${txHash?.toString?.() ?? String(txHash)}`);
  } finally {
    await api.disconnect().catch(() => undefined);
  }
};

const submitFinalizedTransaction = async (runtime, finalized) => {
  await runtime.facade.pendingTransactionsService?.addPendingTransaction?.(finalized).catch(() => undefined);
  const txId = transactionIdFromFinalized(finalized);
  if (!txId) throw new Error('finalized_transaction_id_missing');
  for (let attempt = 1; attempt <= SUBMIT_RETRY_ATTEMPTS; attempt += 1) {
    try {
      await submitDirectly(finalized);
      return txId;
    } catch (error) {
      if (attempt === SUBMIT_RETRY_ATTEMPTS) {
        await runtime.facade.revert(finalized).catch(() => undefined);
        throw error;
      }
      log(`submit attempt ${attempt}/${SUBMIT_RETRY_ATTEMPTS} failed: ${error instanceof Error ? error.message : error}`);
      await sleep(5_000 * attempt);
    }
  }
  throw new Error('submit_retry_loop_exhausted');
};

const makeWalletAndMidnightProvider = async (runtime, walletFile, checkpoint, tokenTypes = []) => {
  const initialState = await waitForSyncedState(runtime, 'wallet sync before provider build', walletFile, checkpoint, tokenTypes);
  const sign = (payload) => runtime.material.unshieldedKeyStore.signData(payload);
  const secrets = {
    shieldedSecretKeys: runtime.material.shieldedSecretKeys,
    dustSecretKey: runtime.material.dustSecretKey,
  };

  return {
    getCoinPublicKey() {
      return initialState.shielded.coinPublicKey.toHexString();
    },
    getEncryptionPublicKey() {
      return initialState.shielded.encryptionPublicKey.toHexString();
    },
    async balanceTx(tx, ttl = new Date(Date.now() + TX_TTL_SECONDS * 1000)) {
      const actorRecipe = await runtime.facade.balanceUnboundTransaction(tx, secrets, {
        ttl,
        tokenKindsToBalance: ['shielded', 'unshielded'],
      });
      const signedActorRecipe = await runtime.facade.signRecipe(actorRecipe, sign);
      const actorFinalized = await runtime.facade.finalizeRecipe(signedActorRecipe);
      const dustRecipe = await runtime.facade.balanceFinalizedTransaction(actorFinalized, secrets, {
        ttl,
        tokenKindsToBalance: ['dust'],
      });
      const signedDustRecipe = await runtime.facade.signRecipe(dustRecipe, sign);
      return await runtime.facade.finalizeRecipe(signedDustRecipe);
    },
    async submitTx(tx) {
      return await submitFinalizedTransaction(runtime, tx);
    },
  };
};

const makeProviders = async ({ runtime, publicDataProvider, walletFile, checkpoint, tokenTypes = [] }) => {
  const zkConfigProvider = new NodeZkConfigProvider(multiReserveDir);
  const walletAndMidnightProvider = await makeWalletAndMidnightProvider(runtime, walletFile, checkpoint, tokenTypes);
  const dbPrefix = `${runtime.material.unshieldedAddressHex.slice(0, 12)}-${Date.now()}-multiReserve`;
  return {
    privateStateProvider: levelPrivateStateProvider({
      midnightDbName: path.resolve('local', `multi-reserve-level-db-${dbPrefix}`),
      privateStateStoreName: 'multi-reserve-private-state',
      signingKeyStoreName: 'multi-reserve-signing-keys',
      privateStoragePasswordProvider: () => PRIVATE_PASSWORD,
      accountId: runtime.material.unshieldedAddress,
    }),
    publicDataProvider,
    zkConfigProvider,
    proofProvider: httpClientProofProvider(PROOF_SERVER_URL, zkConfigProvider),
    walletProvider: walletAndMidnightProvider,
    midnightProvider: walletAndMidnightProvider,
  };
};

const readCircuitLocal = async ({ providers, address, circuit, args = [] }) => {
  const state = await providers.publicDataProvider.queryContractState(address);
  if (state == null) throw new Error(`contract_state_missing:${address}`);
  const contract = new MultiShieldReserve.Contract({});
  const runWithState = (contractState) => {
    const context = createCircuitContext(
      asContractAddress(address),
      providers.walletProvider.getCoinPublicKey(),
      contractState,
      undefined,
    );
    return contract.circuits[circuit](context, ...args);
  };
  try {
    return runWithState(state).result;
  } catch (error) {
    if (state.data == null) throw error;
    return runWithState(state.data).result;
  }
};

const txIdOf = (txData) => String(txData?.public?.txId ?? txData?.txId ?? '');

const watchTx = async (publicDataProvider, txId, label) => {
  if (!txId) throw new Error(`${label}_tx_id_missing`);
  log(`${label}: watching ${txId}`);
  await withTimeout(publicDataProvider.watchForTxData(txId), `${label}_indexer_watch`, INDEXER_WATCH_TIMEOUT_MS);
  log(`${label}: indexed`);
};

const callAndConfirm = async ({ label, fn, runtime, publicDataProvider, walletFile, checkpoint, records, tokenTypes = [] }) => {
  for (let attempt = 1; attempt <= CALL_RETRY_ATTEMPTS; attempt += 1) {
    try {
      log(`${label}: submitting${attempt > 1 ? ` retry ${attempt}/${CALL_RETRY_ATTEMPTS}` : ''}`);
      const tx = await fn();
      const txId = txIdOf(tx);
      log(`${label}: tx=${txId}`);
      records.push({ label, txId });
      await watchTx(publicDataProvider, txId, label);
      await sleep(2_000);
      await waitForSyncedState(runtime, `wallet sync after ${label}`, walletFile, checkpoint, tokenTypes);
      return tx;
    } catch (error) {
      if (attempt === CALL_RETRY_ATTEMPTS) throw error;
      log(`${label}: call attempt ${attempt}/${CALL_RETRY_ATTEMPTS} failed: ${error instanceof Error ? error.message : error}`);
      await waitForSyncedState(runtime, `wallet sync before retry ${label}`, walletFile, checkpoint, tokenTypes);
      await sleep(3_000 * attempt);
    }
  }
  throw new Error(`${label}_call_retry_loop_exhausted`);
};

const findMultiReserve = async (providers, contractAddress) =>
  findDeployedContract(providers, {
    compiledContract: multiReserveCompiledContract,
    contractAddress: asContractAddress(contractAddress),
    privateStateId: 'multiShieldReservePrivateState',
    initialPrivateState: {},
  });

const loadWalletInput = async () => {
  if (!existsSync(SEED_PATH)) throw new Error('missing_seed_file: expected wallet.seed in MULTI_RESERVE_WALLET_DIR');
  if (!existsSync(CHECKPOINT_PATH)) {
    throw new Error('missing_checkpoint_file: expected wallet.checkpoint.json in MULTI_RESERVE_WALLET_DIR');
  }
  const checkpoint = await readJson(CHECKPOINT_PATH);
  const seed = normalizeSeed(await readFile(SEED_PATH, 'utf8'));
  return {
    checkpoint,
    walletFile: {
      network: NETWORK_ID,
      seed,
      account: checkpoint.account ?? 0,
      keyIndex: checkpoint.keyIndex ?? 0,
      unshieldedAddress: checkpoint.unshieldedAddress,
      unshieldedAddressHex: checkpoint.unshieldedAddressHex,
      dust: checkpoint.dust,
    },
  };
};

const checkProofServer = async () => {
  const response = await fetch(new URL('/version', PROOF_SERVER_URL));
  if (!response.ok) throw new Error(`proof_server_version_failed:${response.status}`);
  const version = (await response.text()).trim();
  log(`proof server ${PROOF_SERVER_URL} version=${version}`);
};

const requireReserve = async ({ providers, address, foreignTokenType }) => {
  const foreign = hexToBytes32(foreignTokenType, 'foreign_token_type');
  const exists = await readCircuitLocal({
    providers,
    address,
    circuit: 'reserveExists',
    args: [foreign],
  });
  if (!exists) {
    throw new Error(`reserve_not_registered:${foreignTokenType}`);
  }
  const reserve = await readCircuitLocal({
    providers,
    address,
    circuit: 'getReserve',
    args: [foreign],
  });
  return {
    foreign,
    foreignTokenType,
    wrapperTokenType: toHex(reserve.shieldedWrapperTokenType),
    wrapperDomain: toHex(reserve.shieldedWrapperDomain),
  };
};

const registerReserve = async ({ providers, multiAddress, foreignTokenType, runtime, publicDataProvider, walletFile, checkpoint, records }) => {
  const foreign = hexToBytes32(foreignTokenType, 'foreign_token_type');
  const exists = await readCircuitLocal({
    providers,
    address: multiAddress,
    circuit: 'reserveExists',
    args: [foreign],
  });
  if (exists) {
    const reserve = await requireReserve({ providers, address: multiAddress, foreignTokenType });
    return { ...reserve, registerTxId: null, alreadyRegistered: true };
  }

  const registerTx = await callAndConfirm({
    label: `register reserve ${foreignTokenType}`,
    fn: async () => {
      const multiReserve = await findMultiReserve(providers, multiAddress);
      return multiReserve.callTx.registerReserve(foreign);
    },
    runtime,
    publicDataProvider,
    walletFile,
    checkpoint,
    records,
    tokenTypes: [foreignTokenType],
  });
  const reserve = await requireReserve({ providers, address: multiAddress, foreignTokenType });
  return { ...reserve, registerTxId: txIdOf(registerTx), alreadyRegistered: false };
};

const run = async () => {
  if (!['register', 'shield', 'unshield'].includes(ACTION)) {
    throw new Error('MULTI_RESERVE_ACTION_must_be_register_shield_or_unshield');
  }
  if (!CONTRACT_ADDRESS) throw new Error('MULTI_RESERVE_CONTRACT_ADDRESS_required');
  if (TOKEN_TYPES.length === 0) throw new Error('MULTI_RESERVE_TOKEN_TYPES_required');
  if (AMOUNT <= 0n) throw new Error('MULTI_RESERVE_AMOUNT_must_be_greater_than_zero');

  setNetworkId(NETWORK_ID);
  await checkProofServer();
  const { walletFile, checkpoint } = await loadWalletInput();
  log('wallet loaded');
  log(`contract=${CONTRACT_ADDRESS}`);
  log(`action=${ACTION} amount=${AMOUNT}`);
  log(`fee_blocks_margin=${FEE_BLOCKS_MARGIN} additional_fee_overhead=${ADDITIONAL_FEE_OVERHEAD}`);

  const runtime = await openRuntime(walletFile, checkpoint);
  const publicDataProvider = indexerPublicDataProvider(environment.indexer, environment.indexerWS);
  const records = [];

  try {
    const initialState = await waitForSyncedState(runtime, 'wallet sync before contract action', walletFile, checkpoint);
    if (dustBalance(initialState) <= 0n) throw new Error('missing_dust_balance');

    const providers = await makeProviders({
      runtime,
      publicDataProvider,
      walletFile,
      checkpoint,
      tokenTypes: TOKEN_TYPES,
    });

    const multiReserve = await findMultiReserve(providers, CONTRACT_ADDRESS);
    if (!multiReserve) throw new Error(`contract_not_found:${CONTRACT_ADDRESS}`);

    const ownerBytes = hexToBytes32(runtime.material.unshieldedAddressHex, 'wallet_owner');
    const reserves = [];
    for (const tokenType of TOKEN_TYPES.map((token) => hexToBytes32(token, 'token_type')).map(toHex)) {
      if (ACTION === 'register') {
        reserves.push(await registerReserve({
          providers,
          multiAddress: CONTRACT_ADDRESS,
          foreignTokenType: tokenType,
          runtime,
          publicDataProvider,
          walletFile,
          checkpoint,
          records,
        }));
      } else {
        reserves.push(await requireReserve({ providers, address: CONTRACT_ADDRESS, foreignTokenType: tokenType }));
      }
    }

    const tokenTypes = reserves.map((reserve) => reserve.foreignTokenType);
    const wrapperTypes = reserves.map((reserve) => reserve.wrapperTokenType);

    if (ACTION === 'register') {
      const finalState = await waitForSyncedState(runtime, 'wallet sync after register action', walletFile, checkpoint, tokenTypes);
      await writeJson(RESULT_PATH, {
        completedAt: new Date().toISOString(),
        network: NETWORK_ID,
        contractAddress: CONTRACT_ADDRESS,
        action: ACTION,
        amount: AMOUNT.toString(),
        reserves,
        balancesFinal: snapshotState(finalState, [...tokenTypes, ...wrapperTypes]),
        records,
      });
      log(`register action complete; result=${displayPath(RESULT_PATH)}`);
      return;
    }

    const stateBefore = await waitForSyncedState(
      runtime,
      `wallet sync before ${ACTION}`,
      walletFile,
      checkpoint,
      [...tokenTypes, ...wrapperTypes],
    );
    const initialBalances = snapshotState(stateBefore, [...tokenTypes, ...wrapperTypes]);

    if (ACTION === 'shield') {
      const shieldedRecipient = {
        is_left: true,
        left: { bytes: hexToBytes32(stateBefore.shielded.coinPublicKey.toHexString(), 'shielded_coin_public_key') },
        right: { bytes: hexToBytes32(ZERO_BYTES32, 'zero_contract_address') },
      };

      for (const reserve of reserves) {
        const available = balanceOf(stateBefore.unshielded?.balances, reserve.foreignTokenType);
        if (available < AMOUNT) {
          throw new Error(`unshielded_balance_too_low:${reserve.foreignTokenType}:${available}:need_${AMOUNT}`);
        }

        const shieldTx = await callAndConfirm({
          label: `shield ${AMOUNT} ${reserve.foreignTokenType}`,
          fn: async () => {
            const contract = await findMultiReserve(providers, CONTRACT_ADDRESS);
            return contract.callTx.shield(reserve.foreign, AMOUNT, shieldedRecipient, randomBytes32());
          },
          runtime,
          publicDataProvider,
          walletFile,
          checkpoint,
          records,
          tokenTypes: [...tokenTypes, ...wrapperTypes],
        });
        const shieldCoin = shieldTx.private.result;
        if (toHex(shieldCoin.color) !== reserve.wrapperTokenType) {
          throw new Error(`shielded_wrapper_mismatch:${reserve.foreignTokenType}`);
        }
        reserve.shieldTxId = txIdOf(shieldTx);
      }
    }

    if (ACTION === 'unshield') {
      for (const reserve of reserves) {
        const coinEntry = stateBefore.shielded.availableCoins.find(
          ({ coin }) => coin.type.toLowerCase() === reserve.wrapperTokenType && BigInt(coin.value) >= AMOUNT,
        );
        if (coinEntry == null) {
          throw new Error(`wrapper_coin_not_available:${reserve.wrapperTokenType}:need_${AMOUNT}`);
        }

        const unshieldTx = await callAndConfirm({
          label: `unshield ${AMOUNT} ${reserve.foreignTokenType}`,
          fn: async () => {
            const contract = await findMultiReserve(providers, CONTRACT_ADDRESS);
            return contract.callTx.unshield(
              reserve.foreign,
              coinToCompactShieldedInfo(coinEntry.coin),
              AMOUNT,
              ownerBytes,
            );
          },
          runtime,
          publicDataProvider,
          walletFile,
          checkpoint,
          records,
          tokenTypes: [...tokenTypes, ...wrapperTypes],
        });
        reserve.unshieldTxId = txIdOf(unshieldTx);
      }
    }

    const finalState = await waitForSyncedState(
      runtime,
      `wallet sync after ${ACTION}`,
      walletFile,
      checkpoint,
      [...tokenTypes, ...wrapperTypes],
    );
    const finalBalances = snapshotState(finalState, [...tokenTypes, ...wrapperTypes]);

    await writeJson(RESULT_PATH, {
      completedAt: new Date().toISOString(),
      network: NETWORK_ID,
      contractAddress: CONTRACT_ADDRESS,
      action: ACTION,
      amount: AMOUNT.toString(),
      reserves,
      balancesInitial: initialBalances,
      balancesFinal: finalBalances,
      records,
    });
    log(`${ACTION} action complete; result=${displayPath(RESULT_PATH)}`);
  } finally {
    await closeRuntime(runtime, walletFile, checkpoint);
  }
};

run().catch((error) => {
  console.error(error?.stack ?? error);
  process.exitCode = 1;
});
