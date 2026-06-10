import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.16.0');

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

class _ReserveInfo_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      foreignUnshieldedTokenType: _descriptor_0.fromValue(value_0),
      shieldedWrapperDomain: _descriptor_0.fromValue(value_0),
      shieldedWrapperTokenType: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.foreignUnshieldedTokenType).concat(_descriptor_0.toValue(value_0.shieldedWrapperDomain).concat(_descriptor_0.toValue(value_0.shieldedWrapperTokenType)));
  }
}

const _descriptor_1 = new _ReserveInfo_0();

const _descriptor_2 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class _ShieldedCoinInfo_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment()));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_0.fromValue(value_0),
      color: _descriptor_0.fromValue(value_0),
      value: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.nonce).concat(_descriptor_0.toValue(value_0.color).concat(_descriptor_2.toValue(value_0.value)));
  }
}

const _descriptor_3 = new _ShieldedCoinInfo_0();

const _descriptor_4 = __compactRuntime.CompactTypeBoolean;

class _Maybe_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_3.alignment());
  }
  fromValue(value_0) {
    return {
      is_some: _descriptor_4.fromValue(value_0),
      value: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.is_some).concat(_descriptor_3.toValue(value_0.value));
  }
}

const _descriptor_5 = new _Maybe_0();

class _ShieldedSendResult_0 {
  alignment() {
    return _descriptor_5.alignment().concat(_descriptor_3.alignment());
  }
  fromValue(value_0) {
    return {
      change: _descriptor_5.fromValue(value_0),
      sent: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_5.toValue(value_0.change).concat(_descriptor_3.toValue(value_0.sent));
  }
}

const _descriptor_6 = new _ShieldedSendResult_0();

const _descriptor_7 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

class _ContractAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_8 = new _ContractAddress_0();

class _ZswapCoinPublicKey_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_9 = new _ZswapCoinPublicKey_0();

class _Either_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_9.alignment().concat(_descriptor_8.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_4.fromValue(value_0),
      left: _descriptor_9.fromValue(value_0),
      right: _descriptor_8.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.is_left).concat(_descriptor_9.toValue(value_0.left).concat(_descriptor_8.toValue(value_0.right)));
  }
}

const _descriptor_10 = new _Either_0();

class _QualifiedShieldedCoinInfo_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_7.alignment())));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_0.fromValue(value_0),
      color: _descriptor_0.fromValue(value_0),
      value: _descriptor_2.fromValue(value_0),
      mt_index: _descriptor_7.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.nonce).concat(_descriptor_0.toValue(value_0.color).concat(_descriptor_2.toValue(value_0.value).concat(_descriptor_7.toValue(value_0.mt_index))));
  }
}

const _descriptor_11 = new _QualifiedShieldedCoinInfo_0();

const _descriptor_12 = __compactRuntime.CompactTypeField;

const _descriptor_13 = new __compactRuntime.CompactTypeBytes(21);

class _CoinPreimage_0 {
  alignment() {
    return _descriptor_13.alignment().concat(_descriptor_3.alignment().concat(_descriptor_4.alignment().concat(_descriptor_0.alignment())));
  }
  fromValue(value_0) {
    return {
      domain_sep: _descriptor_13.fromValue(value_0),
      info: _descriptor_3.fromValue(value_0),
      dataType: _descriptor_4.fromValue(value_0),
      data: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_13.toValue(value_0.domain_sep).concat(_descriptor_3.toValue(value_0.info).concat(_descriptor_4.toValue(value_0.dataType).concat(_descriptor_0.toValue(value_0.data))));
  }
}

const _descriptor_14 = new _CoinPreimage_0();

const _descriptor_15 = new __compactRuntime.CompactTypeVector(2, _descriptor_0);

const _descriptor_16 = new __compactRuntime.CompactTypeVector(2, _descriptor_12);

class _Either_1 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_4.fromValue(value_0),
      left: _descriptor_0.fromValue(value_0),
      right: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.is_left).concat(_descriptor_0.toValue(value_0.left).concat(_descriptor_0.toValue(value_0.right)));
  }
}

const _descriptor_17 = new _Either_1();

class _UserAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_18 = new _UserAddress_0();

class _Either_2 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_8.alignment().concat(_descriptor_18.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_4.fromValue(value_0),
      left: _descriptor_8.fromValue(value_0),
      right: _descriptor_18.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.is_left).concat(_descriptor_8.toValue(value_0.left).concat(_descriptor_18.toValue(value_0.right)));
  }
}

const _descriptor_19 = new _Either_2();

const _descriptor_20 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

export class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      registerReserve: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`registerReserve: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const foreignUnshieldedTokenType_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('registerReserve',
                                     'argument 1 (as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 47 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(foreignUnshieldedTokenType_0.buffer instanceof ArrayBuffer && foreignUnshieldedTokenType_0.BYTES_PER_ELEMENT === 1 && foreignUnshieldedTokenType_0.length === 32)) {
          __compactRuntime.typeError('registerReserve',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 47 char 1',
                                     'Bytes<32>',
                                     foreignUnshieldedTokenType_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(foreignUnshieldedTokenType_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._registerReserve_0(context,
                                                 partialProofData,
                                                 foreignUnshieldedTokenType_0);
        partialProofData.output = { value: _descriptor_0.toValue(result_0), alignment: _descriptor_0.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      shield: (...args_1) => {
        if (args_1.length !== 5) {
          throw new __compactRuntime.CompactError(`shield: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const foreignUnshieldedTokenType_0 = args_1[1];
        const amount_0 = args_1[2];
        const recipient_0 = args_1[3];
        const shieldNonce_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('shield',
                                     'argument 1 (as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 109 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(foreignUnshieldedTokenType_0.buffer instanceof ArrayBuffer && foreignUnshieldedTokenType_0.BYTES_PER_ELEMENT === 1 && foreignUnshieldedTokenType_0.length === 32)) {
          __compactRuntime.typeError('shield',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 109 char 1',
                                     'Bytes<32>',
                                     foreignUnshieldedTokenType_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('shield',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 109 char 1',
                                     'Uint<0..18446744073709551616>',
                                     amount_0)
        }
        if (!(typeof(recipient_0) === 'object' && typeof(recipient_0.is_left) === 'boolean' && typeof(recipient_0.left) === 'object' && recipient_0.left.bytes.buffer instanceof ArrayBuffer && recipient_0.left.bytes.BYTES_PER_ELEMENT === 1 && recipient_0.left.bytes.length === 32 && typeof(recipient_0.right) === 'object' && recipient_0.right.bytes.buffer instanceof ArrayBuffer && recipient_0.right.bytes.BYTES_PER_ELEMENT === 1 && recipient_0.right.bytes.length === 32)) {
          __compactRuntime.typeError('shield',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 109 char 1',
                                     'struct Either<is_left: Boolean, left: struct ZswapCoinPublicKey<bytes: Bytes<32>>, right: struct ContractAddress<bytes: Bytes<32>>>',
                                     recipient_0)
        }
        if (!(shieldNonce_0.buffer instanceof ArrayBuffer && shieldNonce_0.BYTES_PER_ELEMENT === 1 && shieldNonce_0.length === 32)) {
          __compactRuntime.typeError('shield',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 109 char 1',
                                     'Bytes<32>',
                                     shieldNonce_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(foreignUnshieldedTokenType_0).concat(_descriptor_7.toValue(amount_0).concat(_descriptor_10.toValue(recipient_0).concat(_descriptor_0.toValue(shieldNonce_0)))),
            alignment: _descriptor_0.alignment().concat(_descriptor_7.alignment().concat(_descriptor_10.alignment().concat(_descriptor_0.alignment())))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._shield_0(context,
                                        partialProofData,
                                        foreignUnshieldedTokenType_0,
                                        amount_0,
                                        recipient_0,
                                        shieldNonce_0);
        partialProofData.output = { value: _descriptor_3.toValue(result_0), alignment: _descriptor_3.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      shieldToCaller: (...args_1) => {
        if (args_1.length !== 4) {
          throw new __compactRuntime.CompactError(`shieldToCaller: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const foreignUnshieldedTokenType_0 = args_1[1];
        const amount_0 = args_1[2];
        const shieldNonce_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('shieldToCaller',
                                     'argument 1 (as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 124 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(foreignUnshieldedTokenType_0.buffer instanceof ArrayBuffer && foreignUnshieldedTokenType_0.BYTES_PER_ELEMENT === 1 && foreignUnshieldedTokenType_0.length === 32)) {
          __compactRuntime.typeError('shieldToCaller',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 124 char 1',
                                     'Bytes<32>',
                                     foreignUnshieldedTokenType_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('shieldToCaller',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 124 char 1',
                                     'Uint<0..18446744073709551616>',
                                     amount_0)
        }
        if (!(shieldNonce_0.buffer instanceof ArrayBuffer && shieldNonce_0.BYTES_PER_ELEMENT === 1 && shieldNonce_0.length === 32)) {
          __compactRuntime.typeError('shieldToCaller',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 124 char 1',
                                     'Bytes<32>',
                                     shieldNonce_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(foreignUnshieldedTokenType_0).concat(_descriptor_7.toValue(amount_0).concat(_descriptor_0.toValue(shieldNonce_0))),
            alignment: _descriptor_0.alignment().concat(_descriptor_7.alignment().concat(_descriptor_0.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._shieldToCaller_0(context,
                                                partialProofData,
                                                foreignUnshieldedTokenType_0,
                                                amount_0,
                                                shieldNonce_0);
        partialProofData.output = { value: _descriptor_3.toValue(result_0), alignment: _descriptor_3.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      unshield: (...args_1) => {
        if (args_1.length !== 5) {
          throw new __compactRuntime.CompactError(`unshield: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const foreignUnshieldedTokenType_0 = args_1[1];
        const coin_0 = args_1[2];
        const amount_0 = args_1[3];
        const recipientBytes_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('unshield',
                                     'argument 1 (as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 170 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(foreignUnshieldedTokenType_0.buffer instanceof ArrayBuffer && foreignUnshieldedTokenType_0.BYTES_PER_ELEMENT === 1 && foreignUnshieldedTokenType_0.length === 32)) {
          __compactRuntime.typeError('unshield',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 170 char 1',
                                     'Bytes<32>',
                                     foreignUnshieldedTokenType_0)
        }
        if (!(typeof(coin_0) === 'object' && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof(coin_0.value) === 'bigint' && coin_0.value >= 0n && coin_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('unshield',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 170 char 1',
                                     'struct ShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>>',
                                     coin_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('unshield',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 170 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     amount_0)
        }
        if (!(recipientBytes_0.buffer instanceof ArrayBuffer && recipientBytes_0.BYTES_PER_ELEMENT === 1 && recipientBytes_0.length === 32)) {
          __compactRuntime.typeError('unshield',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 170 char 1',
                                     'Bytes<32>',
                                     recipientBytes_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(foreignUnshieldedTokenType_0).concat(_descriptor_3.toValue(coin_0).concat(_descriptor_2.toValue(amount_0).concat(_descriptor_0.toValue(recipientBytes_0)))),
            alignment: _descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment())))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._unshield_0(context,
                                          partialProofData,
                                          foreignUnshieldedTokenType_0,
                                          coin_0,
                                          amount_0,
                                          recipientBytes_0);
        partialProofData.output = { value: _descriptor_6.toValue(result_0), alignment: _descriptor_6.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      unshield4: (...args_1) => {
        if (args_1.length !== 11) {
          throw new __compactRuntime.CompactError(`unshield4: expected 11 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const foreignUnshieldedTokenType_0 = args_1[1];
        const coin0_0 = args_1[2];
        const amount0_0 = args_1[3];
        const coin1_0 = args_1[4];
        const amount1_0 = args_1[5];
        const coin2_0 = args_1[6];
        const amount2_0 = args_1[7];
        const coin3_0 = args_1[8];
        const amount3_0 = args_1[9];
        const recipientBytes_0 = args_1[10];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('unshield4',
                                     'argument 1 (as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 192 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(foreignUnshieldedTokenType_0.buffer instanceof ArrayBuffer && foreignUnshieldedTokenType_0.BYTES_PER_ELEMENT === 1 && foreignUnshieldedTokenType_0.length === 32)) {
          __compactRuntime.typeError('unshield4',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 192 char 1',
                                     'Bytes<32>',
                                     foreignUnshieldedTokenType_0)
        }
        if (!(typeof(coin0_0) === 'object' && coin0_0.nonce.buffer instanceof ArrayBuffer && coin0_0.nonce.BYTES_PER_ELEMENT === 1 && coin0_0.nonce.length === 32 && coin0_0.color.buffer instanceof ArrayBuffer && coin0_0.color.BYTES_PER_ELEMENT === 1 && coin0_0.color.length === 32 && typeof(coin0_0.value) === 'bigint' && coin0_0.value >= 0n && coin0_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('unshield4',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 192 char 1',
                                     'struct ShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>>',
                                     coin0_0)
        }
        if (!(typeof(amount0_0) === 'bigint' && amount0_0 >= 0n && amount0_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('unshield4',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 192 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     amount0_0)
        }
        if (!(typeof(coin1_0) === 'object' && coin1_0.nonce.buffer instanceof ArrayBuffer && coin1_0.nonce.BYTES_PER_ELEMENT === 1 && coin1_0.nonce.length === 32 && coin1_0.color.buffer instanceof ArrayBuffer && coin1_0.color.BYTES_PER_ELEMENT === 1 && coin1_0.color.length === 32 && typeof(coin1_0.value) === 'bigint' && coin1_0.value >= 0n && coin1_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('unshield4',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 192 char 1',
                                     'struct ShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>>',
                                     coin1_0)
        }
        if (!(typeof(amount1_0) === 'bigint' && amount1_0 >= 0n && amount1_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('unshield4',
                                     'argument 5 (argument 6 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 192 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     amount1_0)
        }
        if (!(typeof(coin2_0) === 'object' && coin2_0.nonce.buffer instanceof ArrayBuffer && coin2_0.nonce.BYTES_PER_ELEMENT === 1 && coin2_0.nonce.length === 32 && coin2_0.color.buffer instanceof ArrayBuffer && coin2_0.color.BYTES_PER_ELEMENT === 1 && coin2_0.color.length === 32 && typeof(coin2_0.value) === 'bigint' && coin2_0.value >= 0n && coin2_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('unshield4',
                                     'argument 6 (argument 7 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 192 char 1',
                                     'struct ShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>>',
                                     coin2_0)
        }
        if (!(typeof(amount2_0) === 'bigint' && amount2_0 >= 0n && amount2_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('unshield4',
                                     'argument 7 (argument 8 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 192 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     amount2_0)
        }
        if (!(typeof(coin3_0) === 'object' && coin3_0.nonce.buffer instanceof ArrayBuffer && coin3_0.nonce.BYTES_PER_ELEMENT === 1 && coin3_0.nonce.length === 32 && coin3_0.color.buffer instanceof ArrayBuffer && coin3_0.color.BYTES_PER_ELEMENT === 1 && coin3_0.color.length === 32 && typeof(coin3_0.value) === 'bigint' && coin3_0.value >= 0n && coin3_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('unshield4',
                                     'argument 8 (argument 9 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 192 char 1',
                                     'struct ShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>>',
                                     coin3_0)
        }
        if (!(typeof(amount3_0) === 'bigint' && amount3_0 >= 0n && amount3_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('unshield4',
                                     'argument 9 (argument 10 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 192 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     amount3_0)
        }
        if (!(recipientBytes_0.buffer instanceof ArrayBuffer && recipientBytes_0.BYTES_PER_ELEMENT === 1 && recipientBytes_0.length === 32)) {
          __compactRuntime.typeError('unshield4',
                                     'argument 10 (argument 11 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 192 char 1',
                                     'Bytes<32>',
                                     recipientBytes_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(foreignUnshieldedTokenType_0).concat(_descriptor_3.toValue(coin0_0).concat(_descriptor_2.toValue(amount0_0).concat(_descriptor_3.toValue(coin1_0).concat(_descriptor_2.toValue(amount1_0).concat(_descriptor_3.toValue(coin2_0).concat(_descriptor_2.toValue(amount2_0).concat(_descriptor_3.toValue(coin3_0).concat(_descriptor_2.toValue(amount3_0).concat(_descriptor_0.toValue(recipientBytes_0)))))))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_2.alignment().concat(_descriptor_3.alignment().concat(_descriptor_2.alignment().concat(_descriptor_3.alignment().concat(_descriptor_2.alignment().concat(_descriptor_3.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment())))))))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._unshield4_0(context,
                                           partialProofData,
                                           foreignUnshieldedTokenType_0,
                                           coin0_0,
                                           amount0_0,
                                           coin1_0,
                                           amount1_0,
                                           coin2_0,
                                           amount2_0,
                                           coin3_0,
                                           amount3_0,
                                           recipientBytes_0);
        partialProofData.output = { value: _descriptor_2.toValue(result_0), alignment: _descriptor_2.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      reserveExists: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`reserveExists: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const foreignUnshieldedTokenType_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('reserveExists',
                                     'argument 1 (as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 237 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(foreignUnshieldedTokenType_0.buffer instanceof ArrayBuffer && foreignUnshieldedTokenType_0.BYTES_PER_ELEMENT === 1 && foreignUnshieldedTokenType_0.length === 32)) {
          __compactRuntime.typeError('reserveExists',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 237 char 1',
                                     'Bytes<32>',
                                     foreignUnshieldedTokenType_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(foreignUnshieldedTokenType_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._reserveExists_0(context,
                                               partialProofData,
                                               foreignUnshieldedTokenType_0);
        partialProofData.output = { value: _descriptor_4.toValue(result_0), alignment: _descriptor_4.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      getReserve: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`getReserve: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const foreignUnshieldedTokenType_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('getReserve',
                                     'argument 1 (as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 241 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(foreignUnshieldedTokenType_0.buffer instanceof ArrayBuffer && foreignUnshieldedTokenType_0.BYTES_PER_ELEMENT === 1 && foreignUnshieldedTokenType_0.length === 32)) {
          __compactRuntime.typeError('getReserve',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 241 char 1',
                                     'Bytes<32>',
                                     foreignUnshieldedTokenType_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(foreignUnshieldedTokenType_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getReserve_0(context,
                                            partialProofData,
                                            foreignUnshieldedTokenType_0);
        partialProofData.output = { value: _descriptor_1.toValue(result_0), alignment: _descriptor_1.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      getShieldedWrapperTokenType: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`getShieldedWrapperTokenType: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const foreignUnshieldedTokenType_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('getShieldedWrapperTokenType',
                                     'argument 1 (as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 245 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(foreignUnshieldedTokenType_0.buffer instanceof ArrayBuffer && foreignUnshieldedTokenType_0.BYTES_PER_ELEMENT === 1 && foreignUnshieldedTokenType_0.length === 32)) {
          __compactRuntime.typeError('getShieldedWrapperTokenType',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 245 char 1',
                                     'Bytes<32>',
                                     foreignUnshieldedTokenType_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(foreignUnshieldedTokenType_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getShieldedWrapperTokenType_0(context,
                                                             partialProofData,
                                                             foreignUnshieldedTokenType_0);
        partialProofData.output = { value: _descriptor_0.toValue(result_0), alignment: _descriptor_0.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      getShieldedWrapperDomain: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`getShieldedWrapperDomain: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const foreignUnshieldedTokenType_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('getShieldedWrapperDomain',
                                     'argument 1 (as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 250 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(foreignUnshieldedTokenType_0.buffer instanceof ArrayBuffer && foreignUnshieldedTokenType_0.BYTES_PER_ELEMENT === 1 && foreignUnshieldedTokenType_0.length === 32)) {
          __compactRuntime.typeError('getShieldedWrapperDomain',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'multi-shield-reserve.compact line 250 char 1',
                                     'Bytes<32>',
                                     foreignUnshieldedTokenType_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(foreignUnshieldedTokenType_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._getShieldedWrapperDomain_0(context,
                                                          partialProofData,
                                                          foreignUnshieldedTokenType_0);
        partialProofData.output = { value: _descriptor_0.toValue(result_0), alignment: _descriptor_0.alignment() };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      registerReserve: this.circuits.registerReserve,
      shield: this.circuits.shield,
      shieldToCaller: this.circuits.shieldToCaller,
      unshield: this.circuits.unshield,
      unshield4: this.circuits.unshield4,
      reserveExists: this.circuits.reserveExists,
      getReserve: this.circuits.getReserve,
      getShieldedWrapperTokenType: this.circuits.getShieldedWrapperTokenType,
      getShieldedWrapperDomain: this.circuits.getShieldedWrapperDomain
    };
    this.provableCircuits = {
      registerReserve: this.circuits.registerReserve,
      shield: this.circuits.shield,
      shieldToCaller: this.circuits.shieldToCaller,
      unshield: this.circuits.unshield,
      unshield4: this.circuits.unshield4,
      reserveExists: this.circuits.reserveExists,
      getReserve: this.circuits.getReserve,
      getShieldedWrapperTokenType: this.circuits.getShieldedWrapperTokenType,
      getShieldedWrapperDomain: this.circuits.getShieldedWrapperDomain
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('registerReserve', new __compactRuntime.ContractOperation());
    state_0.setOperation('shield', new __compactRuntime.ContractOperation());
    state_0.setOperation('shieldToCaller', new __compactRuntime.ContractOperation());
    state_0.setOperation('unshield', new __compactRuntime.ContractOperation());
    state_0.setOperation('unshield4', new __compactRuntime.ContractOperation());
    state_0.setOperation('reserveExists', new __compactRuntime.ContractOperation());
    state_0.setOperation('getReserve', new __compactRuntime.ContractOperation());
    state_0.setOperation('getShieldedWrapperTokenType', new __compactRuntime.ContractOperation());
    state_0.setOperation('getShieldedWrapperDomain', new __compactRuntime.ContractOperation());
    const context = __compactRuntime.createCircuitContext(__compactRuntime.dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_20.toValue(0n),
                                                                                              alignment: _descriptor_20.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } }]);
    state_0.data = new __compactRuntime.ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _some_0(value_0) { return { is_some: true, value: value_0 }; }
  _none_0() {
    return { is_some: false,
             value:
               { nonce: new Uint8Array(32), color: new Uint8Array(32), value: 0n } };
  }
  _left_0(value_0) {
    return { is_left: true, left: value_0, right: { bytes: new Uint8Array(32) } };
  }
  _left_1(value_0) {
    return { is_left: true, left: value_0, right: new Uint8Array(32) };
  }
  _right_0(value_0) {
    return { is_left: false, left: { bytes: new Uint8Array(32) }, right: value_0 };
  }
  _right_1(value_0) {
    return { is_left: false, left: { bytes: new Uint8Array(32) }, right: value_0 };
  }
  _tokenType_0(domain_sep_0, contractAddress_0) {
    return this._persistentCommit_0([domain_sep_0, contractAddress_0.bytes],
                                    new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 100, 101, 114, 105, 118, 101, 95, 116, 111, 107, 101, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
  }
  _mintShieldedToken_0(context,
                       partialProofData,
                       domain_sep_0,
                       value_0,
                       nonce_0,
                       recipient_0)
  {
    const coin_0 = { nonce: nonce_0,
                     color:
                       this._tokenType_0(domain_sep_0,
                                         _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                   partialProofData,
                                                                                                   [
                                                                                                    { dup: { n: 2 } },
                                                                                                    { idx: { cached: true,
                                                                                                             pushPath: false,
                                                                                                             path: [
                                                                                                                    { tag: 'value',
                                                                                                                      value: { value: _descriptor_20.toValue(0n),
                                                                                                                               alignment: _descriptor_20.alignment() } }] } },
                                                                                                    { popeq: { cached: true,
                                                                                                               result: undefined } }]).value)),
                     value: value_0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_20.toValue(4n),
                                                                  alignment: _descriptor_20.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(domain_sep_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { dup: { n: 1 } },
                                       { dup: { n: 1 } },
                                       'member',
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(value_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { swap: { n: 0 } },
                                       'neg',
                                       { branch: { skip: 4 } },
                                       { dup: { n: 2 } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: true,
                                                pushPath: false,
                                                path: [ { tag: 'stack' }] } },
                                       'add',
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    this._createZswapOutput_0(context, partialProofData, coin_0, recipient_0);
    const cm_0 = this._coinCommitment_0(coin_0, recipient_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_20.toValue(2n),
                                                                  alignment: _descriptor_20.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cm_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    if (!recipient_0.is_left
        &&
        this._equal_0(recipient_0.right.bytes,
                      _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 2 } },
                                                                                 { idx: { cached: true,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_20.toValue(0n),
                                                                                                            alignment: _descriptor_20.alignment() } }] } },
                                                                                 { popeq: { cached: true,
                                                                                            result: undefined } }]).value).bytes))
    {
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { swap: { n: 0 } },
                                         { idx: { cached: true,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_20.toValue(1n),
                                                                    alignment: _descriptor_20.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cm_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newNull().encode() } },
                                         { ins: { cached: true, n: 2 } },
                                         { swap: { n: 0 } }]);
    }
    return coin_0;
  }
  _shieldedBurnAddress_0() {
    return this._left_0({ bytes: new Uint8Array(32) });
  }
  _receiveShielded_0(context, partialProofData, coin_0) {
    const recipient_0 = this._right_0(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                partialProofData,
                                                                                                [
                                                                                                 { dup: { n: 2 } },
                                                                                                 { idx: { cached: true,
                                                                                                          pushPath: false,
                                                                                                          path: [
                                                                                                                 { tag: 'value',
                                                                                                                   value: { value: _descriptor_20.toValue(0n),
                                                                                                                            alignment: _descriptor_20.alignment() } }] } },
                                                                                                 { popeq: { cached: true,
                                                                                                            result: undefined } }]).value));
    this._createZswapOutput_0(context, partialProofData, coin_0, recipient_0);
    const tmp_0 = this._coinCommitment_0(coin_0, recipient_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_20.toValue(1n),
                                                                  alignment: _descriptor_20.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    return [];
  }
  _sendShielded_0(context, partialProofData, input_0, recipient_0, value_0) {
    const selfAddr_0 = _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 2 } },
                                                                                  { idx: { cached: true,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_20.toValue(0n),
                                                                                                             alignment: _descriptor_20.alignment() } }] } },
                                                                                  { popeq: { cached: true,
                                                                                             result: undefined } }]).value);
    this._createZswapInput_0(context, partialProofData, input_0);
    const tmp_0 = this._coinNullifier_0(this._downcastQualifiedCoin_0(input_0),
                                        selfAddr_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_20.toValue(0n),
                                                                  alignment: _descriptor_20.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    let t_0;
    const change_0 = (t_0 = input_0.value,
                      (__compactRuntime.assert(t_0 >= value_0,
                                               'result of subtraction would be negative'),
                       t_0 - value_0));
    const output_0 = { nonce:
                         this._upgradeFromTransient_0(this._transientHash_0([__compactRuntime.convertBytesToField(28,
                                                                                                                  new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101]),
                                                                                                                  '<standard library>'),
                                                                             this._degradeToTransient_0(input_0.nonce)])),
                       color: input_0.color,
                       value: value_0 };
    this._createZswapOutput_0(context, partialProofData, output_0, recipient_0);
    const tmp_1 = this._coinCommitment_0(output_0, recipient_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_20.toValue(2n),
                                                                  alignment: _descriptor_20.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_1),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    if (!recipient_0.is_left
        &&
        this._equal_1(recipient_0.right.bytes, selfAddr_0.bytes))
    {
      const tmp_2 = this._coinCommitment_0(output_0, recipient_0);
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { swap: { n: 0 } },
                                         { idx: { cached: true,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_20.toValue(1n),
                                                                    alignment: _descriptor_20.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_2),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newNull().encode() } },
                                         { ins: { cached: true, n: 2 } },
                                         { swap: { n: 0 } }]);
    }
    if (this._equal_2(change_0, 0n)) {
      return { change: this._none_0(), sent: output_0 };
    } else {
      const changeCoin_0 = { nonce:
                               this._upgradeFromTransient_0(this._transientHash_0([__compactRuntime.convertBytesToField(30,
                                                                                                                        new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101, 47, 50]),
                                                                                                                        '<standard library>'),
                                                                                   this._degradeToTransient_0(input_0.nonce)])),
                             color: input_0.color,
                             value: change_0 };
      this._createZswapOutput_0(context,
                                partialProofData,
                                changeCoin_0,
                                this._right_0(selfAddr_0));
      const cm_0 = this._coinCommitment_0(changeCoin_0,
                                          this._right_0(selfAddr_0));
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { swap: { n: 0 } },
                                         { idx: { cached: true,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_20.toValue(2n),
                                                                    alignment: _descriptor_20.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cm_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newNull().encode() } },
                                         { ins: { cached: true, n: 2 } },
                                         { swap: { n: 0 } }]);
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { swap: { n: 0 } },
                                         { idx: { cached: true,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_20.toValue(1n),
                                                                    alignment: _descriptor_20.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cm_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newNull().encode() } },
                                         { ins: { cached: true, n: 2 } },
                                         { swap: { n: 0 } }]);
      return { change: this._some_0(changeCoin_0), sent: output_0 };
    }
  }
  _sendImmediateShielded_0(context, partialProofData, input_0, target_0, value_0)
  {
    return this._sendShielded_0(context,
                                partialProofData,
                                this._upcastQualifiedCoin_0(input_0),
                                target_0,
                                value_0);
  }
  _downcastQualifiedCoin_0(coin_0) {
    return { nonce: coin_0.nonce, color: coin_0.color, value: coin_0.value };
  }
  _upcastQualifiedCoin_0(coin_0) {
    return { nonce: coin_0.nonce,
             color: coin_0.color,
             value: coin_0.value,
             mt_index: 0n };
  }
  _coinCommitment_0(coin_0, recipient_0) {
    return this._persistentHash_1({ domain_sep:
                                      new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 122, 115, 119, 97, 112, 45, 99, 99, 91, 118, 49, 93]),
                                    info: coin_0,
                                    dataType: recipient_0.is_left,
                                    data:
                                      recipient_0.is_left ?
                                      recipient_0.left.bytes :
                                      recipient_0.right.bytes });
  }
  _coinNullifier_0(coin_0, addr_0) {
    return this._persistentHash_1({ domain_sep:
                                      new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 122, 115, 119, 97, 112, 45, 99, 110, 91, 118, 49, 93]),
                                    info: coin_0,
                                    dataType: false,
                                    data: addr_0.bytes });
  }
  _sendUnshielded_0(context, partialProofData, color_0, amount_0, recipient_0) {
    const tmp_0 = this._left_1(color_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_20.toValue(7n),
                                                                  alignment: _descriptor_20.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_17.toValue(tmp_0),
                                                                                              alignment: _descriptor_17.alignment() }).encode() } },
                                       { dup: { n: 1 } },
                                       { dup: { n: 1 } },
                                       'member',
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(amount_0),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { swap: { n: 0 } },
                                       'neg',
                                       { branch: { skip: 4 } },
                                       { dup: { n: 2 } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: true,
                                                pushPath: false,
                                                path: [ { tag: 'stack' }] } },
                                       'add',
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    const tmp_1 = this._left_1(color_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_20.toValue(8n),
                                                                  alignment: _descriptor_20.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell(__compactRuntime.alignedConcat(
                                                                                              { value: _descriptor_17.toValue(tmp_1),
                                                                                                alignment: _descriptor_17.alignment() },
                                                                                              { value: _descriptor_19.toValue(recipient_0),
                                                                                                alignment: _descriptor_19.alignment() }
                                                                                            )).encode() } },
                                       { dup: { n: 1 } },
                                       { dup: { n: 1 } },
                                       'member',
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(amount_0),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { swap: { n: 0 } },
                                       'neg',
                                       { branch: { skip: 4 } },
                                       { dup: { n: 2 } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: true,
                                                pushPath: false,
                                                path: [ { tag: 'stack' }] } },
                                       'add',
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    if (recipient_0.is_left
        &&
        this._equal_3(recipient_0.left.bytes,
                      _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 2 } },
                                                                                 { idx: { cached: true,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_20.toValue(0n),
                                                                                                            alignment: _descriptor_20.alignment() } }] } },
                                                                                 { popeq: { cached: true,
                                                                                            result: undefined } }]).value).bytes))
    {
      const tmp_2 = this._left_1(color_0);
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { swap: { n: 0 } },
                                         { idx: { cached: true,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_20.toValue(6n),
                                                                    alignment: _descriptor_20.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_17.toValue(tmp_2),
                                                                                                alignment: _descriptor_17.alignment() }).encode() } },
                                         { dup: { n: 1 } },
                                         { dup: { n: 1 } },
                                         'member',
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(amount_0),
                                                                                                alignment: _descriptor_2.alignment() }).encode() } },
                                         { swap: { n: 0 } },
                                         'neg',
                                         { branch: { skip: 4 } },
                                         { dup: { n: 2 } },
                                         { dup: { n: 2 } },
                                         { idx: { cached: true,
                                                  pushPath: false,
                                                  path: [ { tag: 'stack' }] } },
                                         'add',
                                         { ins: { cached: true, n: 2 } },
                                         { swap: { n: 0 } }]);
    }
    return [];
  }
  _receiveUnshielded_0(context, partialProofData, color_0, amount_0) {
    const tmp_0 = this._left_1(color_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_20.toValue(6n),
                                                                  alignment: _descriptor_20.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_17.toValue(tmp_0),
                                                                                              alignment: _descriptor_17.alignment() }).encode() } },
                                       { dup: { n: 1 } },
                                       { dup: { n: 1 } },
                                       'member',
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(amount_0),
                                                                                              alignment: _descriptor_2.alignment() }).encode() } },
                                       { swap: { n: 0 } },
                                       'neg',
                                       { branch: { skip: 4 } },
                                       { dup: { n: 2 } },
                                       { dup: { n: 2 } },
                                       { idx: { cached: true,
                                                pushPath: false,
                                                path: [ { tag: 'stack' }] } },
                                       'add',
                                       { ins: { cached: true, n: 2 } },
                                       { swap: { n: 0 } }]);
    return [];
  }
  _transientHash_0(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_16, value_0);
    return result_0;
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_15, value_0);
    return result_0;
  }
  _persistentHash_1(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_14, value_0);
    return result_0;
  }
  _persistentCommit_0(value_0, rand_0) {
    const result_0 = __compactRuntime.persistentCommit(_descriptor_15,
                                                       value_0,
                                                       rand_0);
    return result_0;
  }
  _degradeToTransient_0(x_0) {
    const result_0 = __compactRuntime.degradeToTransient(x_0);
    return result_0;
  }
  _upgradeFromTransient_0(x_0) {
    const result_0 = __compactRuntime.upgradeFromTransient(x_0);
    return result_0;
  }
  _ownPublicKey_0(context, partialProofData) {
    const result_0 = __compactRuntime.ownPublicKey(context);
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_9.toValue(result_0),
      alignment: _descriptor_9.alignment()
    });
    return result_0;
  }
  _createZswapInput_0(context, partialProofData, coin_0) {
    const result_0 = __compactRuntime.createZswapInput(context, coin_0);
    partialProofData.privateTranscriptOutputs.push({
      value: [],
      alignment: []
    });
    return result_0;
  }
  _createZswapOutput_0(context, partialProofData, coin_0, recipient_0) {
    const result_0 = __compactRuntime.createZswapOutput(context,
                                                        coin_0,
                                                        recipient_0);
    partialProofData.privateTranscriptOutputs.push({
      value: [],
      alignment: []
    });
    return result_0;
  }
  __deriveWrapperDomain_0(foreignUnshieldedTokenType_0) {
    if (this._equal_4(foreignUnshieldedTokenType_0, new Uint8Array(32))) {
      return new Uint8Array([78, 83, 95, 77, 85, 76, 84, 73, 95, 78, 65, 84, 73, 86, 69, 95, 87, 82, 65, 80, 80, 69, 82, 58, 118, 49, 0, 0, 0, 0, 0, 0]);
    } else {
      return this._persistentHash_0([new Uint8Array([78, 83, 95, 77, 85, 76, 84, 73, 95, 87, 82, 65, 80, 80, 69, 82, 58, 118, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                                     foreignUnshieldedTokenType_0]);
    }
  }
  __computeWrapperTokenType_0(context,
                              partialProofData,
                              foreignUnshieldedTokenType_0)
  {
    const wrapperDomain_0 = this.__deriveWrapperDomain_0(foreignUnshieldedTokenType_0);
    const wrapperTokenType_0 = this._tokenType_0(wrapperDomain_0,
                                                 _descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                           partialProofData,
                                                                                                           [
                                                                                                            { dup: { n: 2 } },
                                                                                                            { idx: { cached: true,
                                                                                                                     pushPath: false,
                                                                                                                     path: [
                                                                                                                            { tag: 'value',
                                                                                                                              value: { value: _descriptor_20.toValue(0n),
                                                                                                                                       alignment: _descriptor_20.alignment() } }] } },
                                                                                                            { popeq: { cached: true,
                                                                                                                       result: undefined } }]).value));
    __compactRuntime.assert(!this._equal_5(wrapperTokenType_0,
                                           new Uint8Array(32)),
                            'MultiShieldReserve: wrapper token type cannot be zero');
    __compactRuntime.assert(!this._equal_6(wrapperTokenType_0,
                                           foreignUnshieldedTokenType_0),
                            'MultiShieldReserve: wrapper token collides with foreign token');
    return wrapperTokenType_0;
  }
  __lookupReserve_0(context, partialProofData, foreignUnshieldedTokenType_0) {
    __compactRuntime.assert(_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_20.toValue(0n),
                                                                                                                  alignment: _descriptor_20.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(foreignUnshieldedTokenType_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'MultiShieldReserve: unknown reserve');
    return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_20.toValue(0n),
                                                                                                 alignment: _descriptor_20.alignment() } }] } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_0.toValue(foreignUnshieldedTokenType_0),
                                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }]).value);
  }
  __deriveShieldNonce_0(userNonce_0) {
    __compactRuntime.assert(!this._equal_7(userNonce_0, new Uint8Array(32)),
                            'MultiShieldReserve: nonce cannot be zero');
    return userNonce_0;
  }
  _registerReserve_0(context, partialProofData, foreignUnshieldedTokenType_0) {
    const foreignTokenType_0 = foreignUnshieldedTokenType_0;
    const wrapperDomain_0 = this.__deriveWrapperDomain_0(foreignTokenType_0);
    const wrapperTokenType_0 = this.__computeWrapperTokenType_0(context,
                                                                partialProofData,
                                                                foreignTokenType_0);
    __compactRuntime.assert(!_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_20.toValue(0n),
                                                                                                                   alignment: _descriptor_20.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(foreignTokenType_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'MultiShieldReserve: reserve already registered');
    const tmp_0 = { foreignUnshieldedTokenType: foreignTokenType_0,
                    shieldedWrapperDomain: wrapperDomain_0,
                    shieldedWrapperTokenType: wrapperTokenType_0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_20.toValue(0n),
                                                                  alignment: _descriptor_20.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(foreignTokenType_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_0),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return wrapperTokenType_0;
  }
  __shieldInternal_0(context,
                     partialProofData,
                     reserve_0,
                     recipient_0,
                     amount_0,
                     shieldNonce_0)
  {
    __compactRuntime.assert(amount_0 > 0n,
                            'MultiShieldReserve: amount must be greater than zero');
    const actualNonce_0 = this.__deriveShieldNonce_0(shieldNonce_0);
    const delta_0 = amount_0;
    this._receiveUnshielded_0(context,
                              partialProofData,
                              reserve_0.foreignUnshieldedTokenType,
                              delta_0);
    if (this._equal_8(reserve_0.foreignUnshieldedTokenType, new Uint8Array(32)))
    {
      const nativeWrapper_0 = this._mintShieldedToken_0(context,
                                                        partialProofData,
                                                        reserve_0.shieldedWrapperDomain,
                                                        amount_0,
                                                        actualNonce_0,
                                                        recipient_0);
      __compactRuntime.assert(this._equal_9(nativeWrapper_0.color,
                                            reserve_0.shieldedWrapperTokenType),
                              'MultiShieldReserve: shielded wrapper token type mismatch');
      __compactRuntime.assert(this._equal_10(nativeWrapper_0.value, delta_0),
                              'MultiShieldReserve: shielded wrapper amount mismatch');
      return nativeWrapper_0;
    } else {
      const contractRecipient_0 = this._right_0(_descriptor_8.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                          partialProofData,
                                                                                                          [
                                                                                                           { dup: { n: 2 } },
                                                                                                           { idx: { cached: true,
                                                                                                                    pushPath: false,
                                                                                                                    path: [
                                                                                                                           { tag: 'value',
                                                                                                                             value: { value: _descriptor_20.toValue(0n),
                                                                                                                                      alignment: _descriptor_20.alignment() } }] } },
                                                                                                           { popeq: { cached: true,
                                                                                                                      result: undefined } }]).value));
      const wrapperCoin_0 = this._mintShieldedToken_0(context,
                                                      partialProofData,
                                                      reserve_0.shieldedWrapperDomain,
                                                      amount_0,
                                                      actualNonce_0,
                                                      contractRecipient_0);
      __compactRuntime.assert(this._equal_11(wrapperCoin_0.color,
                                             reserve_0.shieldedWrapperTokenType),
                              'MultiShieldReserve: shielded wrapper token type mismatch');
      __compactRuntime.assert(this._equal_12(wrapperCoin_0.value, delta_0),
                              'MultiShieldReserve: shielded wrapper amount mismatch');
      const sendRes_0 = this._sendImmediateShielded_0(context,
                                                      partialProofData,
                                                      wrapperCoin_0,
                                                      recipient_0,
                                                      delta_0);
      return sendRes_0.sent;
    }
  }
  _shield_0(context,
            partialProofData,
            foreignUnshieldedTokenType_0,
            amount_0,
            recipient_0,
            shieldNonce_0)
  {
    const reserve_0 = this.__lookupReserve_0(context,
                                             partialProofData,
                                             foreignUnshieldedTokenType_0);
    return this.__shieldInternal_0(context,
                                   partialProofData,
                                   reserve_0,
                                   recipient_0,
                                   amount_0,
                                   shieldNonce_0);
  }
  _shieldToCaller_0(context,
                    partialProofData,
                    foreignUnshieldedTokenType_0,
                    amount_0,
                    shieldNonce_0)
  {
    const reserve_0 = this.__lookupReserve_0(context,
                                             partialProofData,
                                             foreignUnshieldedTokenType_0);
    const recipient_0 = this._left_0(this._ownPublicKey_0(context,
                                                          partialProofData));
    return this.__shieldInternal_0(context,
                                   partialProofData,
                                   reserve_0,
                                   recipient_0,
                                   amount_0,
                                   shieldNonce_0);
  }
  __sendShieldedChangeToCaller_0(context, partialProofData, sendRes_0) {
    if (sendRes_0.change.is_some) {
      const caller_0 = this._left_0(this._ownPublicKey_0(context,
                                                         partialProofData));
      this._sendImmediateShielded_0(context,
                                    partialProofData,
                                    sendRes_0.change.value,
                                    caller_0,
                                    sendRes_0.change.value.value);
    }
    return [];
  }
  __sendUnshieldedToUser_0(context,
                           partialProofData,
                           reserve_0,
                           amount_0,
                           recipientBytes_0)
  {
    __compactRuntime.assert(amount_0 > 0n,
                            'MultiShieldReserve: amount must be greater than zero');
    __compactRuntime.assert(!this._equal_13(recipientBytes_0, new Uint8Array(32)),
                            'MultiShieldReserve: recipient cannot be zero');
    const recipient_0 = this._right_1({ bytes: recipientBytes_0 });
    this._sendUnshielded_0(context,
                           partialProofData,
                           reserve_0.foreignUnshieldedTokenType,
                           amount_0,
                           recipient_0);
    return [];
  }
  __burnShieldedWrapperAmount_0(context,
                                partialProofData,
                                reserve_0,
                                coin_0,
                                amount_0)
  {
    __compactRuntime.assert(amount_0 > 0n,
                            'MultiShieldReserve: amount must be greater than zero');
    __compactRuntime.assert(this._equal_14(coin_0.color,
                                           reserve_0.shieldedWrapperTokenType),
                            'MultiShieldReserve: wrong shielded wrapper token type');
    __compactRuntime.assert(!this._equal_15(coin_0.nonce, new Uint8Array(32)),
                            'MultiShieldReserve: shielded coin nonce cannot be zero');
    let t_0;
    __compactRuntime.assert((t_0 = coin_0.value, t_0 >= amount_0),
                            'MultiShieldReserve: insufficient shielded wrapper amount');
    this._receiveShielded_0(context, partialProofData, coin_0);
    const sendRes_0 = this._sendImmediateShielded_0(context,
                                                    partialProofData,
                                                    coin_0,
                                                    this._shieldedBurnAddress_0(),
                                                    amount_0);
    this.__sendShieldedChangeToCaller_0(context, partialProofData, sendRes_0);
    return sendRes_0;
  }
  _unshield_0(context,
              partialProofData,
              foreignUnshieldedTokenType_0,
              coin_0,
              amount_0,
              recipientBytes_0)
  {
    const reserve_0 = this.__lookupReserve_0(context,
                                             partialProofData,
                                             foreignUnshieldedTokenType_0);
    const unshieldCoin_0 = coin_0;
    const unshieldAmount_0 = amount_0;
    const recipient_0 = recipientBytes_0;
    const sendRes_0 = this.__burnShieldedWrapperAmount_0(context,
                                                         partialProofData,
                                                         reserve_0,
                                                         unshieldCoin_0,
                                                         unshieldAmount_0);
    this.__sendUnshieldedToUser_0(context,
                                  partialProofData,
                                  reserve_0,
                                  unshieldAmount_0,
                                  recipient_0);
    return sendRes_0;
  }
  __addU128_0(leftValue_0, rightValue_0) {
    const sum_0 = ((t1) => {
                    if (t1 > 340282366920938463463374607431768211455n) {
                      throw new __compactRuntime.CompactError('multi-shield-reserve.compact line 187 char 15: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                    }
                    return t1;
                  })(leftValue_0 + rightValue_0);
    __compactRuntime.assert(sum_0 >= leftValue_0,
                            'MultiShieldReserve: Uint128 addition overflow');
    return sum_0;
  }
  _unshield4_0(context,
               partialProofData,
               foreignUnshieldedTokenType_0,
               coin0_0,
               amount0_0,
               coin1_0,
               amount1_0,
               coin2_0,
               amount2_0,
               coin3_0,
               amount3_0,
               recipientBytes_0)
  {
    const reserve_0 = this.__lookupReserve_0(context,
                                             partialProofData,
                                             foreignUnshieldedTokenType_0);
    const c0_0 = coin0_0;
    const c1_0 = coin1_0;
    const c2_0 = coin2_0;
    const c3_0 = coin3_0;
    const a0_0 = amount0_0;
    const a1_0 = amount1_0;
    const a2_0 = amount2_0;
    const a3_0 = amount3_0;
    const recipient_0 = recipientBytes_0;
    const total01_0 = this.__addU128_0(a0_0, a1_0);
    const total012_0 = this.__addU128_0(total01_0, a2_0);
    const total_0 = this.__addU128_0(total012_0, a3_0);
    __compactRuntime.assert(total_0 > 0n,
                            'MultiShieldReserve: total amount must be greater than zero');
    if (a0_0 > 0n) {
      this.__burnShieldedWrapperAmount_0(context,
                                         partialProofData,
                                         reserve_0,
                                         c0_0,
                                         a0_0);
    }
    if (a1_0 > 0n) {
      this.__burnShieldedWrapperAmount_0(context,
                                         partialProofData,
                                         reserve_0,
                                         c1_0,
                                         a1_0);
    }
    if (a2_0 > 0n) {
      this.__burnShieldedWrapperAmount_0(context,
                                         partialProofData,
                                         reserve_0,
                                         c2_0,
                                         a2_0);
    }
    if (a3_0 > 0n) {
      this.__burnShieldedWrapperAmount_0(context,
                                         partialProofData,
                                         reserve_0,
                                         c3_0,
                                         a3_0);
    }
    this.__sendUnshieldedToUser_0(context,
                                  partialProofData,
                                  reserve_0,
                                  total_0,
                                  recipient_0);
    return total_0;
  }
  _reserveExists_0(context, partialProofData, foreignUnshieldedTokenType_0) {
    return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_20.toValue(0n),
                                                                                                 alignment: _descriptor_20.alignment() } }] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(foreignUnshieldedTokenType_0),
                                                                                                                             alignment: _descriptor_0.alignment() }).encode() } },
                                                                      'member',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value);
  }
  _getReserve_0(context, partialProofData, foreignUnshieldedTokenType_0) {
    return this.__lookupReserve_0(context,
                                  partialProofData,
                                  foreignUnshieldedTokenType_0);
  }
  _getShieldedWrapperTokenType_0(context,
                                 partialProofData,
                                 foreignUnshieldedTokenType_0)
  {
    const reserve_0 = this.__lookupReserve_0(context,
                                             partialProofData,
                                             foreignUnshieldedTokenType_0);
    return reserve_0.shieldedWrapperTokenType;
  }
  _getShieldedWrapperDomain_0(context,
                              partialProofData,
                              foreignUnshieldedTokenType_0)
  {
    const reserve_0 = this.__lookupReserve_0(context,
                                             partialProofData,
                                             foreignUnshieldedTokenType_0);
    return reserve_0.shieldedWrapperDomain;
  }
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_1(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_2(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_3(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_4(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_5(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_6(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_7(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_8(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_9(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_10(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_11(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_12(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_13(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_14(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_15(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
}
export function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime.StateValue ? new __compactRuntime.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new __compactRuntime.QueryContext(chargedState, __compactRuntime.dummyContractAddress()),
    costModel: __compactRuntime.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    reserves: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_20.toValue(0n),
                                                                                                     alignment: _descriptor_20.alignment() } }] } },
                                                                          'size',
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(0n),
                                                                                                                                 alignment: _descriptor_7.alignment() }).encode() } },
                                                                          'eq',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_20.toValue(0n),
                                                                                                     alignment: _descriptor_20.alignment() } }] } },
                                                                          'size',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'multi-shield-reserve.compact line 11 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_20.toValue(0n),
                                                                                                     alignment: _descriptor_20.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'multi-shield-reserve.compact line 11 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_20.toValue(0n),
                                                                                                     alignment: _descriptor_20.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_0.toValue(key_0),
                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_1.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    }
  };
}
const _emptyContext = {
  currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({ });
export const pureCircuits = {};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map
