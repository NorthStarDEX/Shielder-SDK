import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
  registerReserve(context: __compactRuntime.CircuitContext<PS>,
                  foreignUnshieldedTokenType_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  shield(context: __compactRuntime.CircuitContext<PS>,
         foreignUnshieldedTokenType_0: Uint8Array,
         amount_0: bigint,
         recipient_0: { is_left: boolean,
                        left: { bytes: Uint8Array },
                        right: { bytes: Uint8Array }
                      },
         shieldNonce_0: Uint8Array): __compactRuntime.CircuitResults<PS, { nonce: Uint8Array,
                                                                           color: Uint8Array,
                                                                           value: bigint
                                                                         }>;
  shieldToCaller(context: __compactRuntime.CircuitContext<PS>,
                 foreignUnshieldedTokenType_0: Uint8Array,
                 amount_0: bigint,
                 shieldNonce_0: Uint8Array): __compactRuntime.CircuitResults<PS, { nonce: Uint8Array,
                                                                                   color: Uint8Array,
                                                                                   value: bigint
                                                                                 }>;
  unshield(context: __compactRuntime.CircuitContext<PS>,
           foreignUnshieldedTokenType_0: Uint8Array,
           coin_0: { nonce: Uint8Array, color: Uint8Array, value: bigint },
           amount_0: bigint,
           recipientBytes_0: Uint8Array): __compactRuntime.CircuitResults<PS, { change: { is_some: boolean,
                                                                                          value: { nonce: Uint8Array,
                                                                                                   color: Uint8Array,
                                                                                                   value: bigint
                                                                                                 }
                                                                                        },
                                                                                sent: { nonce: Uint8Array,
                                                                                        color: Uint8Array,
                                                                                        value: bigint
                                                                                      }
                                                                              }>;
  unshield4(context: __compactRuntime.CircuitContext<PS>,
            foreignUnshieldedTokenType_0: Uint8Array,
            coin0_0: { nonce: Uint8Array, color: Uint8Array, value: bigint },
            amount0_0: bigint,
            coin1_0: { nonce: Uint8Array, color: Uint8Array, value: bigint },
            amount1_0: bigint,
            coin2_0: { nonce: Uint8Array, color: Uint8Array, value: bigint },
            amount2_0: bigint,
            coin3_0: { nonce: Uint8Array, color: Uint8Array, value: bigint },
            amount3_0: bigint,
            recipientBytes_0: Uint8Array): __compactRuntime.CircuitResults<PS, bigint>;
  reserveExists(context: __compactRuntime.CircuitContext<PS>,
                foreignUnshieldedTokenType_0: Uint8Array): __compactRuntime.CircuitResults<PS, boolean>;
  getReserve(context: __compactRuntime.CircuitContext<PS>,
             foreignUnshieldedTokenType_0: Uint8Array): __compactRuntime.CircuitResults<PS, { foreignUnshieldedTokenType: Uint8Array,
                                                                                              shieldedWrapperDomain: Uint8Array,
                                                                                              shieldedWrapperTokenType: Uint8Array
                                                                                            }>;
  getShieldedWrapperTokenType(context: __compactRuntime.CircuitContext<PS>,
                              foreignUnshieldedTokenType_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  getShieldedWrapperDomain(context: __compactRuntime.CircuitContext<PS>,
                           foreignUnshieldedTokenType_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
}

export type ProvableCircuits<PS> = {
  registerReserve(context: __compactRuntime.CircuitContext<PS>,
                  foreignUnshieldedTokenType_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  shield(context: __compactRuntime.CircuitContext<PS>,
         foreignUnshieldedTokenType_0: Uint8Array,
         amount_0: bigint,
         recipient_0: { is_left: boolean,
                        left: { bytes: Uint8Array },
                        right: { bytes: Uint8Array }
                      },
         shieldNonce_0: Uint8Array): __compactRuntime.CircuitResults<PS, { nonce: Uint8Array,
                                                                           color: Uint8Array,
                                                                           value: bigint
                                                                         }>;
  shieldToCaller(context: __compactRuntime.CircuitContext<PS>,
                 foreignUnshieldedTokenType_0: Uint8Array,
                 amount_0: bigint,
                 shieldNonce_0: Uint8Array): __compactRuntime.CircuitResults<PS, { nonce: Uint8Array,
                                                                                   color: Uint8Array,
                                                                                   value: bigint
                                                                                 }>;
  unshield(context: __compactRuntime.CircuitContext<PS>,
           foreignUnshieldedTokenType_0: Uint8Array,
           coin_0: { nonce: Uint8Array, color: Uint8Array, value: bigint },
           amount_0: bigint,
           recipientBytes_0: Uint8Array): __compactRuntime.CircuitResults<PS, { change: { is_some: boolean,
                                                                                          value: { nonce: Uint8Array,
                                                                                                   color: Uint8Array,
                                                                                                   value: bigint
                                                                                                 }
                                                                                        },
                                                                                sent: { nonce: Uint8Array,
                                                                                        color: Uint8Array,
                                                                                        value: bigint
                                                                                      }
                                                                              }>;
  unshield4(context: __compactRuntime.CircuitContext<PS>,
            foreignUnshieldedTokenType_0: Uint8Array,
            coin0_0: { nonce: Uint8Array, color: Uint8Array, value: bigint },
            amount0_0: bigint,
            coin1_0: { nonce: Uint8Array, color: Uint8Array, value: bigint },
            amount1_0: bigint,
            coin2_0: { nonce: Uint8Array, color: Uint8Array, value: bigint },
            amount2_0: bigint,
            coin3_0: { nonce: Uint8Array, color: Uint8Array, value: bigint },
            amount3_0: bigint,
            recipientBytes_0: Uint8Array): __compactRuntime.CircuitResults<PS, bigint>;
  reserveExists(context: __compactRuntime.CircuitContext<PS>,
                foreignUnshieldedTokenType_0: Uint8Array): __compactRuntime.CircuitResults<PS, boolean>;
  getReserve(context: __compactRuntime.CircuitContext<PS>,
             foreignUnshieldedTokenType_0: Uint8Array): __compactRuntime.CircuitResults<PS, { foreignUnshieldedTokenType: Uint8Array,
                                                                                              shieldedWrapperDomain: Uint8Array,
                                                                                              shieldedWrapperTokenType: Uint8Array
                                                                                            }>;
  getShieldedWrapperTokenType(context: __compactRuntime.CircuitContext<PS>,
                              foreignUnshieldedTokenType_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  getShieldedWrapperDomain(context: __compactRuntime.CircuitContext<PS>,
                           foreignUnshieldedTokenType_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  registerReserve(context: __compactRuntime.CircuitContext<PS>,
                  foreignUnshieldedTokenType_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  shield(context: __compactRuntime.CircuitContext<PS>,
         foreignUnshieldedTokenType_0: Uint8Array,
         amount_0: bigint,
         recipient_0: { is_left: boolean,
                        left: { bytes: Uint8Array },
                        right: { bytes: Uint8Array }
                      },
         shieldNonce_0: Uint8Array): __compactRuntime.CircuitResults<PS, { nonce: Uint8Array,
                                                                           color: Uint8Array,
                                                                           value: bigint
                                                                         }>;
  shieldToCaller(context: __compactRuntime.CircuitContext<PS>,
                 foreignUnshieldedTokenType_0: Uint8Array,
                 amount_0: bigint,
                 shieldNonce_0: Uint8Array): __compactRuntime.CircuitResults<PS, { nonce: Uint8Array,
                                                                                   color: Uint8Array,
                                                                                   value: bigint
                                                                                 }>;
  unshield(context: __compactRuntime.CircuitContext<PS>,
           foreignUnshieldedTokenType_0: Uint8Array,
           coin_0: { nonce: Uint8Array, color: Uint8Array, value: bigint },
           amount_0: bigint,
           recipientBytes_0: Uint8Array): __compactRuntime.CircuitResults<PS, { change: { is_some: boolean,
                                                                                          value: { nonce: Uint8Array,
                                                                                                   color: Uint8Array,
                                                                                                   value: bigint
                                                                                                 }
                                                                                        },
                                                                                sent: { nonce: Uint8Array,
                                                                                        color: Uint8Array,
                                                                                        value: bigint
                                                                                      }
                                                                              }>;
  unshield4(context: __compactRuntime.CircuitContext<PS>,
            foreignUnshieldedTokenType_0: Uint8Array,
            coin0_0: { nonce: Uint8Array, color: Uint8Array, value: bigint },
            amount0_0: bigint,
            coin1_0: { nonce: Uint8Array, color: Uint8Array, value: bigint },
            amount1_0: bigint,
            coin2_0: { nonce: Uint8Array, color: Uint8Array, value: bigint },
            amount2_0: bigint,
            coin3_0: { nonce: Uint8Array, color: Uint8Array, value: bigint },
            amount3_0: bigint,
            recipientBytes_0: Uint8Array): __compactRuntime.CircuitResults<PS, bigint>;
  reserveExists(context: __compactRuntime.CircuitContext<PS>,
                foreignUnshieldedTokenType_0: Uint8Array): __compactRuntime.CircuitResults<PS, boolean>;
  getReserve(context: __compactRuntime.CircuitContext<PS>,
             foreignUnshieldedTokenType_0: Uint8Array): __compactRuntime.CircuitResults<PS, { foreignUnshieldedTokenType: Uint8Array,
                                                                                              shieldedWrapperDomain: Uint8Array,
                                                                                              shieldedWrapperTokenType: Uint8Array
                                                                                            }>;
  getShieldedWrapperTokenType(context: __compactRuntime.CircuitContext<PS>,
                              foreignUnshieldedTokenType_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  getShieldedWrapperDomain(context: __compactRuntime.CircuitContext<PS>,
                           foreignUnshieldedTokenType_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
}

export type Ledger = {
  reserves: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): { foreignUnshieldedTokenType: Uint8Array,
                                 shieldedWrapperDomain: Uint8Array,
                                 shieldedWrapperTokenType: Uint8Array
                               };
    [Symbol.iterator](): Iterator<[Uint8Array, { foreignUnshieldedTokenType: Uint8Array,
  shieldedWrapperDomain: Uint8Array,
  shieldedWrapperTokenType: Uint8Array
}]>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
