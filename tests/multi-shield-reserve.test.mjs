import assert from 'node:assert/strict';
import test from 'node:test';

import {
  createCircuitContext,
  createConstructorContext,
  encodeCoinPublicKey,
  sampleContractAddress,
  sampleSigningKey,
  signatureVerifyingKey,
} from '@midnight-ntwrk/compact-runtime';

import * as MultiShieldReserve from '../artifacts/MultiShieldReserve/contract/index.js';
import {
  MULTI_SHIELD_RESERVE_READ_CIRCUITS,
  MULTI_SHIELD_RESERVE_WRITE_CIRCUITS,
  NATIVE_NIGHT_TOKEN_TYPE,
  buildRegisterReserveArgs,
  buildShieldToCallerArgs,
  buildUnshield4Args,
  bytes32FromHex,
  bytesToHex,
  compactCoinFromWalletCoin,
  isNativeNightTokenType,
  zeroShieldedCoin,
  zswapRecipientFromBytes32,
} from '../src/index.js';

const makeRuntime = () => {
  const coinPublicKey = encodeCoinPublicKey(signatureVerifyingKey(sampleSigningKey()));
  const contractAddress = sampleContractAddress();
  const contract = new MultiShieldReserve.Contract({});
  const initial = contract.initialState(createConstructorContext({}, coinPublicKey));
  let context = createCircuitContext(
    contractAddress,
    coinPublicKey,
    initial.currentContractState,
    initial.currentPrivateState,
  );
  let chargedState = context.currentQueryContext.state;

  return {
    contract,
    get context() {
      return context;
    },
    get chargedState() {
      return chargedState;
    },
    register(foreignUnshieldedTokenType) {
      const out = contract.circuits.registerReserve(
        context,
        ...buildRegisterReserveArgs({ foreignUnshieldedTokenType }),
      );
      context = out.context;
      chargedState = out.context.currentQueryContext.state;
      return out.result;
    },
  };
};

test('generated circuits match the SDK circuit lists', () => {
  const { contract } = makeRuntime();
  const generatedCircuitNames = Object.keys(contract.circuits);
  const expected = [...MULTI_SHIELD_RESERVE_WRITE_CIRCUITS, ...MULTI_SHIELD_RESERVE_READ_CIRCUITS];

  assert.deepEqual(generatedCircuitNames.sort(), expected.sort());
});

test('registerReserve supports native NIGHT and multiple foreign token types', () => {
  const runtime = makeRuntime();
  const tokenA = '12'.repeat(32);
  const tokenB = '34'.repeat(32);

  const nightWrapper = runtime.register(NATIVE_NIGHT_TOKEN_TYPE);
  const wrapperA = runtime.register(tokenA);
  const wrapperB = runtime.register(tokenB);

  assert.equal(isNativeNightTokenType(NATIVE_NIGHT_TOKEN_TYPE), true);
  assert.notEqual(bytesToHex(nightWrapper), NATIVE_NIGHT_TOKEN_TYPE);
  assert.notEqual(bytesToHex(wrapperA), tokenA);
  assert.notEqual(bytesToHex(wrapperB), tokenB);
  assert.notEqual(bytesToHex(wrapperA), bytesToHex(wrapperB));
  assert.notEqual(bytesToHex(wrapperA), bytesToHex(nightWrapper));

  const reserveA = runtime.contract.circuits.getReserve(runtime.context, bytes32FromHex(tokenA)).result;
  assert.equal(bytesToHex(reserveA.foreignUnshieldedTokenType), tokenA);
  assert.equal(bytesToHex(reserveA.shieldedWrapperTokenType), bytesToHex(wrapperA));
  assert.equal(runtime.contract.circuits.reserveExists(runtime.context, bytes32FromHex(NATIVE_NIGHT_TOKEN_TYPE)).result, true);
});

test('registerReserve rejects duplicate foreign token types', () => {
  const runtime = makeRuntime();
  const tokenType = '12'.repeat(32);

  runtime.register(tokenType);

  assert.throws(() => runtime.register(tokenType), /MultiShieldReserve: reserve already registered/);
});

test('public reserve map is enumerable from generated ledger state', () => {
  const runtime = makeRuntime();
  const tokenA = '12'.repeat(32);
  const tokenB = '34'.repeat(32);
  const wrapperA = bytesToHex(runtime.register(tokenA));
  const wrapperB = bytesToHex(runtime.register(tokenB));
  const ledger = MultiShieldReserve.ledger(runtime.chargedState);
  const entries = Array.from(ledger.reserves).map(([foreign, reserve]) => [
    bytesToHex(foreign),
    bytesToHex(reserve.shieldedWrapperTokenType),
  ]);

  assert.equal(ledger.reserves.size(), 2n);
  assert.deepEqual(entries.sort(), [
    [tokenA, wrapperA],
    [tokenB, wrapperB],
  ].sort());
});

test('wrapper for one reserve cannot unshield through another reserve', () => {
  const runtime = makeRuntime();
  const tokenA = '12'.repeat(32);
  const tokenB = '34'.repeat(32);
  const wrapperA = runtime.register(tokenA);
  runtime.register(tokenB);

  assert.throws(
    () =>
      runtime.contract.circuits.unshield(
        runtime.context,
        bytes32FromHex(tokenB),
        {
          color: wrapperA,
          nonce: bytes32FromHex('ab'.repeat(32)),
          value: 25n,
        },
        25n,
        bytes32FromHex('cd'.repeat(32)),
      ),
    /MultiShieldReserve: wrong shielded wrapper token type/,
  );
});

test('SDK builders normalize Compact call arguments', () => {
  const recipient = zswapRecipientFromBytes32('ef'.repeat(32));
  const shieldArgs = buildShieldToCallerArgs({
    foreignUnshieldedTokenType: NATIVE_NIGHT_TOKEN_TYPE,
    amount: 1,
    shieldNonce: 'ab'.repeat(32),
  });
  const walletCoin = {
    type: '12'.repeat(32),
    nonce: '34'.repeat(32),
    value: '5',
    mt_index: 99n,
  };

  assert.equal(shieldArgs[0].length, 32);
  assert.equal(shieldArgs[1], 1n);
  assert.equal(shieldArgs[2].length, 32);
  assert.equal(recipient.is_left, true);
  assert.deepEqual(compactCoinFromWalletCoin(walletCoin), {
    color: bytes32FromHex('12'.repeat(32)),
    nonce: bytes32FromHex('34'.repeat(32)),
    value: 5n,
  });
});

test('unshield4 requires exactly four coins and positive total', () => {
  const coin = zeroShieldedCoin();

  assert.throws(
    () =>
      buildUnshield4Args({
        foreignUnshieldedTokenType: '12'.repeat(32),
        coins: [coin, coin, coin],
        amounts: [1, 0, 0, 0],
        recipientBytes: 'cd'.repeat(32),
      }),
    /unshield4_requires_4_coins/,
  );

  assert.throws(
    () =>
      buildUnshield4Args({
        foreignUnshieldedTokenType: '12'.repeat(32),
        coins: [coin, coin, coin, coin],
        amounts: [0, 0, 0, 0],
        recipientBytes: 'cd'.repeat(32),
      }),
    /unshield4_total_must_be_greater_than_zero/,
  );
});
