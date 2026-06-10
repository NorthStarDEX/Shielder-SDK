import { randomBytes } from 'node:crypto';

export const MULTI_SHIELD_RESERVE_PRIVATE_STATE_ID = 'multiShieldReservePrivateState';
export const ZERO_BYTES32 = '0'.repeat(64);
export const NATIVE_NIGHT_TOKEN_TYPE = ZERO_BYTES32;
export const NATIVE_WRAPPER_DOMAIN_TEXT = 'NS_MULTI_NATIVE_WRAPPER:v1';
export const WRAPPER_DOMAIN_TAG_TEXT = 'NS_MULTI_WRAPPER:v1';

export const MULTI_SHIELD_RESERVE_WRITE_CIRCUITS = Object.freeze([
  'registerReserve',
  'shield',
  'shieldToCaller',
  'unshield',
  'unshield4',
]);

export const MULTI_SHIELD_RESERVE_READ_CIRCUITS = Object.freeze([
  'reserveExists',
  'getReserve',
  'getShieldedWrapperTokenType',
  'getShieldedWrapperDomain',
]);

export const MULTI_SHIELD_RESERVE_ALL_CIRCUITS = Object.freeze([
  ...MULTI_SHIELD_RESERVE_WRITE_CIRCUITS,
  ...MULTI_SHIELD_RESERVE_READ_CIRCUITS,
]);

const HEX_RE = /^[0-9a-f]+$/u;

export const UINT64_MAX = (1n << 64n) - 1n;
export const UINT128_MAX = (1n << 128n) - 1n;

export const normalizeHex = (value, label = 'hex') => {
  const normalized = String(value ?? '').trim().replace(/^0x/iu, '').toLowerCase();
  if (normalized.length === 0 || normalized.length % 2 !== 0 || !HEX_RE.test(normalized)) {
    throw new Error(`invalid_${label}`);
  }
  return normalized;
};

export const normalizeBytes32Hex = (value, label = 'bytes32') => {
  const normalized = normalizeHex(value, label);
  if (normalized.length !== 64) {
    throw new Error(`invalid_${label}_length:${normalized.length / 2}:expected_32`);
  }
  return normalized;
};

export const assertNonZeroBytes32 = (value, label = 'bytes32') => {
  const normalized = normalizeBytes32Hex(value, label);
  if (normalized === ZERO_BYTES32) {
    throw new Error(`${label}_must_not_be_zero`);
  }
  return normalized;
};

export const bytesFromHex = (value, label = 'hex', expectedLength = null) => {
  const hex = normalizeHex(value, label);
  const bytes = Uint8Array.from(Buffer.from(hex, 'hex'));
  if (expectedLength != null && bytes.length !== expectedLength) {
    throw new Error(`invalid_${label}_length:${bytes.length}:expected_${expectedLength}`);
  }
  return bytes;
};

export const bytes32FromHex = (value, label = 'bytes32') => bytesFromHex(value, label, 32);
export const bytesToHex = (value) => Buffer.from(value).toString('hex').toLowerCase();
export const randomBytes32Hex = () => randomBytes(32).toString('hex');
export const isNativeNightTokenType = (value) => normalizeBytes32Hex(value, 'token_type') === NATIVE_NIGHT_TOKEN_TYPE;

export const parseAmount = (value, label = 'amount', max = UINT128_MAX) => {
  const amount = typeof value === 'bigint' ? value : BigInt(String(value ?? ''));
  if (amount <= 0n) throw new Error(`${label}_must_be_greater_than_zero`);
  if (amount > max) throw new Error(`${label}_exceeds_uint_limit`);
  return amount;
};

export const parseOptionalAmount = (value, label = 'amount', max = UINT128_MAX) => {
  const amount = typeof value === 'bigint' ? value : BigInt(String(value ?? '0'));
  if (amount < 0n) throw new Error(`${label}_must_not_be_negative`);
  if (amount > max) throw new Error(`${label}_exceeds_uint_limit`);
  return amount;
};

export const parseUint64Amount = (value, label = 'amount') => parseAmount(value, label, UINT64_MAX);
export const parseUint128Amount = (value, label = 'amount') => parseAmount(value, label, UINT128_MAX);

export const zeroShieldedCoin = () => ({
  color: bytes32FromHex(ZERO_BYTES32, 'zero_coin_color'),
  nonce: bytes32FromHex(ZERO_BYTES32, 'zero_coin_nonce'),
  value: 0n,
});

export const zswapRecipientFromBytes32 = (publicKeyBytes) => ({
  is_left: true,
  left: { bytes: bytes32FromHex(publicKeyBytes, 'zswap_public_key') },
  right: { bytes: bytes32FromHex(ZERO_BYTES32, 'zero_contract_address') },
});

export const contractRecipientFromBytes32 = (contractAddressBytes) => ({
  is_left: false,
  left: { bytes: bytes32FromHex(ZERO_BYTES32, 'zero_zswap_public_key') },
  right: { bytes: bytes32FromHex(contractAddressBytes, 'contract_address') },
});

export const compactCoinFromWalletCoin = (coin) => {
  if (coin == null || typeof coin !== 'object') throw new Error('wallet_coin_required');
  return {
    color: bytes32FromHex(coin.type, 'wallet_coin_type'),
    nonce: bytes32FromHex(coin.nonce, 'wallet_coin_nonce'),
    value: BigInt(coin.value),
  };
};

export const buildRegisterReserveArgs = ({ foreignUnshieldedTokenType }) => [
  bytes32FromHex(normalizeBytes32Hex(foreignUnshieldedTokenType, 'foreign_unshielded_token_type')),
];

export const buildShieldToCallerArgs = ({ foreignUnshieldedTokenType, amount, shieldNonce = randomBytes32Hex() }) => [
  bytes32FromHex(normalizeBytes32Hex(foreignUnshieldedTokenType, 'foreign_unshielded_token_type')),
  parseUint64Amount(amount, 'shield_amount'),
  bytes32FromHex(assertNonZeroBytes32(shieldNonce, 'shield_nonce')),
];

export const buildShieldArgs = ({ foreignUnshieldedTokenType, amount, recipient, shieldNonce = randomBytes32Hex() }) => {
  if (recipient == null) throw new Error('recipient_required');
  return [
    bytes32FromHex(normalizeBytes32Hex(foreignUnshieldedTokenType, 'foreign_unshielded_token_type')),
    parseUint64Amount(amount, 'shield_amount'),
    recipient,
    bytes32FromHex(assertNonZeroBytes32(shieldNonce, 'shield_nonce')),
  ];
};

export const buildUnshieldArgs = ({ foreignUnshieldedTokenType, coin, amount, recipientBytes }) => {
  if (coin == null || typeof coin !== 'object') throw new Error('shielded_coin_required');
  return [
    bytes32FromHex(normalizeBytes32Hex(foreignUnshieldedTokenType, 'foreign_unshielded_token_type')),
    coin,
    parseUint128Amount(amount, 'unshield_amount'),
    bytes32FromHex(assertNonZeroBytes32(recipientBytes, 'recipient')),
  ];
};

export const buildUnshield4Args = ({ foreignUnshieldedTokenType, coins, amounts, recipientBytes }) => {
  if (!Array.isArray(coins) || coins.length !== 4) throw new Error('unshield4_requires_4_coins');
  if (!Array.isArray(amounts) || amounts.length !== 4) throw new Error('unshield4_requires_4_amounts');
  const parsedAmounts = amounts.map((amount, index) => parseOptionalAmount(amount, `amount_${index}`, UINT128_MAX));
  if (parsedAmounts.every((amount) => amount === 0n)) throw new Error('unshield4_total_must_be_greater_than_zero');
  return [
    bytes32FromHex(normalizeBytes32Hex(foreignUnshieldedTokenType, 'foreign_unshielded_token_type')),
    coins[0],
    parsedAmounts[0],
    coins[1],
    parsedAmounts[1],
    coins[2],
    parsedAmounts[2],
    coins[3],
    parsedAmounts[3],
    bytes32FromHex(assertNonZeroBytes32(recipientBytes, 'recipient')),
  ];
};
