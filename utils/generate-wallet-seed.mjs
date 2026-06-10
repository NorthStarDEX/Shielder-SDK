#!/usr/bin/env node
import { randomBytes } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const WALLET_DIR = path.resolve(process.env.MULTI_RESERVE_WALLET_DIR ?? 'local/wallet-preprod');
const SEED_PATH = path.join(WALLET_DIR, 'wallet.seed');
const OVERWRITE = process.env.WALLET_SEED_OVERWRITE === '1';

const displayPath = (file) => {
  const relative = path.relative(process.cwd(), file);
  return relative && !relative.startsWith('..') && !path.isAbsolute(relative) ? relative : path.basename(file);
};

if (existsSync(SEED_PATH) && !OVERWRITE) {
  throw new Error('wallet.seed already exists; set WALLET_SEED_OVERWRITE=1 to replace it');
}

await mkdir(WALLET_DIR, { recursive: true });
await writeFile(SEED_PATH, `${randomBytes(32).toString('hex')}\n`, { mode: 0o600 });

console.log(`[wallet] seed saved: ${displayPath(SEED_PATH)}`);
console.log('[wallet] run `npm run wallet:sync` to create wallet.checkpoint.json');
