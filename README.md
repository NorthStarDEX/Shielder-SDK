# MultiShieldReserve SDK

One deployed contract handles every registered unshielded asset.

Native NIGHT token type:

```text
0000000000000000000000000000000000000000000000000000000000000000
```

## Install

```bash
git clone https://github.com/NorthStarDEX/Shielder-SDK.git
cd Shielder-SDK
npm install
npm test
```

## Config

```bash
export MULTI_RESERVE_CONTRACT_ADDRESS=7d04b86f6149c38a8644317686b001aff48bed6f36ff1a7347438fd4c8d803b5
export NIGHT_TOKEN_TYPE=0000000000000000000000000000000000000000000000000000000000000000
```

Wallet files for transactions:

```text
local/wallet-preprod/wallet.seed
local/wallet-preprod/wallet.checkpoint.json
```

Create and sync them:

```bash
npm run wallet:seed
npm run wallet:sync
```

Long sync with progress:

```bash
SHIELD_RESERVE_SYNC_TIMEOUT_MS=0 npm run wallet:sync
```

Designate NIGHT UTXOs for DUST generation:

```bash
npm run wallet:dust
```

Optional:

```bash
export MULTI_RESERVE_WALLET_DIR=/absolute/path/to/wallet-dir
export SHIELD_RESERVE_ADDITIONAL_FEE_OVERHEAD=1000000000000
```

## Query

```bash
npm run query:reserves
```

## Register

```bash
MULTI_RESERVE_ACTION=register \
MULTI_RESERVE_TOKEN_TYPES=$NIGHT_TOKEN_TYPE \
npm run live:multi-reserve
```

## Shield

```bash
MULTI_RESERVE_ACTION=shield \
MULTI_RESERVE_TOKEN_TYPES=$NIGHT_TOKEN_TYPE \
MULTI_RESERVE_AMOUNT=1 \
npm run live:multi-reserve
```

## Unshield

```bash
MULTI_RESERVE_ACTION=unshield \
MULTI_RESERVE_TOKEN_TYPES=$NIGHT_TOKEN_TYPE \
MULTI_RESERVE_AMOUNT=1 \
npm run live:multi-reserve
```

For another token, replace `$NIGHT_TOKEN_TYPE` with its 32-byte unshielded token type.

## Build

```bash
npm run fetch-compactc
npm run compile
npm test
```

Files: `contracts/multi-shield-reserve.compact`, `artifacts/MultiShieldReserve/`, `src/index.js`, `scripts/`, `utils/`.
