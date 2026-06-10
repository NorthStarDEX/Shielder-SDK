export declare const MULTI_SHIELD_RESERVE_PRIVATE_STATE_ID = "multiShieldReservePrivateState";
export declare const ZERO_BYTES32: string;
export declare const NATIVE_NIGHT_TOKEN_TYPE: string;
export declare const NATIVE_WRAPPER_DOMAIN_TEXT = "NS_MULTI_NATIVE_WRAPPER:v1";
export declare const WRAPPER_DOMAIN_TAG_TEXT = "NS_MULTI_WRAPPER:v1";
export declare const MULTI_SHIELD_RESERVE_WRITE_CIRCUITS: readonly string[];
export declare const MULTI_SHIELD_RESERVE_READ_CIRCUITS: readonly string[];
export declare const MULTI_SHIELD_RESERVE_ALL_CIRCUITS: readonly string[];
export declare const UINT64_MAX: bigint;
export declare const UINT128_MAX: bigint;

export type Bytes32 = Uint8Array;
export type ShieldedCoinInfo = {
  color: Uint8Array;
  nonce: Uint8Array;
  value: bigint;
};
export type WalletCoinInfo = {
  type: string;
  nonce: string;
  value: string | bigint;
  mt_index?: string | bigint;
};
export type ShieldRecipient = {
  is_left: boolean;
  left: { bytes: Uint8Array };
  right: { bytes: Uint8Array };
};

export declare const normalizeHex: (value: unknown, label?: string) => string;
export declare const normalizeBytes32Hex: (value: unknown, label?: string) => string;
export declare const assertNonZeroBytes32: (value: unknown, label?: string) => string;
export declare const bytesFromHex: (value: unknown, label?: string, expectedLength?: number | null) => Uint8Array;
export declare const bytes32FromHex: (value: unknown, label?: string) => Uint8Array;
export declare const bytesToHex: (value: Uint8Array | Buffer) => string;
export declare const randomBytes32Hex: () => string;
export declare const isNativeNightTokenType: (value: unknown) => boolean;
export declare const parseAmount: (value: string | number | bigint, label?: string, max?: bigint) => bigint;
export declare const parseOptionalAmount: (value: string | number | bigint, label?: string, max?: bigint) => bigint;
export declare const parseUint64Amount: (value: string | number | bigint, label?: string) => bigint;
export declare const parseUint128Amount: (value: string | number | bigint, label?: string) => bigint;
export declare const zeroShieldedCoin: () => ShieldedCoinInfo;
export declare const zswapRecipientFromBytes32: (publicKeyBytes: string) => ShieldRecipient;
export declare const contractRecipientFromBytes32: (contractAddressBytes: string) => ShieldRecipient;
export declare const compactCoinFromWalletCoin: (coin: WalletCoinInfo) => ShieldedCoinInfo;

export declare const buildRegisterReserveArgs: (input: {
  foreignUnshieldedTokenType: string;
}) => [Uint8Array];

export declare const buildShieldToCallerArgs: (input: {
  foreignUnshieldedTokenType: string;
  amount: string | number | bigint;
  shieldNonce?: string;
}) => [Uint8Array, bigint, Uint8Array];

export declare const buildShieldArgs: (input: {
  foreignUnshieldedTokenType: string;
  amount: string | number | bigint;
  recipient: ShieldRecipient;
  shieldNonce?: string;
}) => [Uint8Array, bigint, ShieldRecipient, Uint8Array];

export declare const buildUnshieldArgs: (input: {
  foreignUnshieldedTokenType: string;
  coin: ShieldedCoinInfo;
  amount: string | number | bigint;
  recipientBytes: string;
}) => [Uint8Array, ShieldedCoinInfo, bigint, Uint8Array];

export declare const buildUnshield4Args: (input: {
  foreignUnshieldedTokenType: string;
  coins: [ShieldedCoinInfo, ShieldedCoinInfo, ShieldedCoinInfo, ShieldedCoinInfo];
  amounts: [
    string | number | bigint,
    string | number | bigint,
    string | number | bigint,
    string | number | bigint,
  ];
  recipientBytes: string;
}) => [
  Uint8Array,
  ShieldedCoinInfo,
  bigint,
  ShieldedCoinInfo,
  bigint,
  ShieldedCoinInfo,
  bigint,
  ShieldedCoinInfo,
  bigint,
  Uint8Array,
];
