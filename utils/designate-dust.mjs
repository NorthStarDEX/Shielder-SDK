#!/usr/bin/env node
import {
  CHECKPOINT_PATH,
  NATIVE_TOKEN,
  closeWalletRuntime,
  displayPath,
  openWalletRuntime,
  startWalletRuntime,
  submitFinalizedTransaction,
  syncAndSave,
  watchTx,
} from './wallet-runtime.mjs';

const SYNC_TIMEOUT_MS = Number(process.env.SHIELD_RESERVE_SYNC_TIMEOUT_MS ?? 300_000);
const SYNC_PROGRESS_INTERVAL_MS = Number(process.env.SHIELD_RESERVE_SYNC_PROGRESS_INTERVAL_MS ?? 5_000);
const MAX_UTXOS = Number(process.env.WALLET_DUST_MAX_UTXOS ?? 1);
const MIN_NIGHT = BigInt(process.env.WALLET_DUST_MIN_NIGHT ?? 1);
const DRY_RUN = process.env.WALLET_DUST_DRY_RUN === '1';
const log = (message) => console.log(`[wallet:dust] ${message}`);

const isEligibleNightUtxo = ({ utxo, meta }) =>
  utxo.type === NATIVE_TOKEN &&
  BigInt(utxo.value) >= MIN_NIGHT &&
  meta.registeredForDustGeneration !== true;

const run = async () => {
  if (!Number.isInteger(MAX_UTXOS) || MAX_UTXOS < 1) throw new Error('WALLET_DUST_MAX_UTXOS_must_be_positive_integer');

  const runtime = await openWalletRuntime();
  try {
    await startWalletRuntime(runtime);
    log(`syncing${SYNC_TIMEOUT_MS <= 0 ? ' without timeout' : ''}`);
    const state = await syncAndSave(runtime, {
      log,
      timeoutMs: SYNC_TIMEOUT_MS,
      progressIntervalMs: SYNC_PROGRESS_INTERVAL_MS,
    });

    const eligible = state.unshielded.availableCoins.filter(isEligibleNightUtxo);
    if (eligible.length === 0) {
      log('eligible=0 selected=0');
      log('nothing to designate');
      log(`checkpoint saved: ${displayPath(CHECKPOINT_PATH)}`);
      return;
    }

    const selected = eligible.slice(0, MAX_UTXOS);
    log(`eligible=${eligible.length} selected=${selected.length}`);

    if (DRY_RUN) {
      const estimate = await runtime.facade.estimateRegistration(selected);
      log(`dry_run=1 estimated_fee=${estimate.fee}`);
      log(`checkpoint saved: ${displayPath(CHECKPOINT_PATH)}`);
      return;
    }

    const sign = (payload) => runtime.material.unshieldedKeyStore.signData(payload);
    const recipe = await runtime.facade.registerNightUtxosForDustGeneration(
      selected,
      runtime.material.unshieldedPublicKey,
      sign,
    );
    const finalized = await runtime.facade.finalizeRecipe(recipe);
    const txId = await submitFinalizedTransaction(runtime, finalized);
    log(`tx=${txId}`);
    await watchTx(txId, 'dust_registration');
    log('indexed');
    await syncAndSave(runtime, {
      log,
      timeoutMs: SYNC_TIMEOUT_MS,
      progressIntervalMs: SYNC_PROGRESS_INTERVAL_MS,
    });
    log(`checkpoint saved: ${displayPath(CHECKPOINT_PATH)}`);
  } finally {
    await closeWalletRuntime(runtime);
  }
};

run().catch((error) => {
  console.error(error?.stack ?? error);
  process.exitCode = 1;
});
