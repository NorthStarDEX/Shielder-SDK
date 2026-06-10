#!/usr/bin/env node
import {
  CHECKPOINT_PATH,
  NATIVE_TOKEN,
  balanceOf,
  closeWalletRuntime,
  displayPath,
  dustBalance,
  openWalletRuntime,
  startWalletRuntime,
  syncAndSave,
} from './wallet-runtime.mjs';

const SYNC_TIMEOUT_MS = Number(process.env.SHIELD_RESERVE_SYNC_TIMEOUT_MS ?? 300_000);
const SYNC_PROGRESS_INTERVAL_MS = Number(process.env.SHIELD_RESERVE_SYNC_PROGRESS_INTERVAL_MS ?? 5_000);
const log = (message) => console.log(`[wallet] ${message}`);

const run = async () => {
  const runtime = await openWalletRuntime();
  try {
    await startWalletRuntime(runtime);
    log(`syncing${SYNC_TIMEOUT_MS <= 0 ? ' without timeout' : ''}`);
    const state = await syncAndSave(runtime, {
      log,
      timeoutMs: SYNC_TIMEOUT_MS,
      progressIntervalMs: SYNC_PROGRESS_INTERVAL_MS,
    });
    log(`checkpoint saved: ${displayPath(CHECKPOINT_PATH)}`);
    log(`synced=${Boolean(state.isSynced)} unshieldedNative=${balanceOf(state.unshielded?.balances, NATIVE_TOKEN)} dust=${dustBalance(state)}`);
  } finally {
    await closeWalletRuntime(runtime);
  }
};

run().catch((error) => {
  console.error(error?.stack ?? error);
  process.exitCode = 1;
});
