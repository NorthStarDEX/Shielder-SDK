#!/usr/bin/env node
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';

import * as MultiShieldReserve from '../artifacts/MultiShieldReserve/contract/index.js';
import {
  NATIVE_NIGHT_TOKEN_TYPE,
  bytes32FromHex,
  bytesToHex,
  normalizeBytes32Hex,
} from '../src/index.js';

const NETWORK_ID = process.env.MIDNIGHT_NETWORK ?? 'preprod';
const INDEXER_URL = process.env.PREPROD_INDEXER_URL ?? 'https://indexer.preprod.midnight.network/api/v4/graphql';
const INDEXER_WS_URL = process.env.PREPROD_INDEXER_WS_URL ?? 'wss://indexer.preprod.midnight.network/api/v4/graphql/ws';
const CONTRACT_ADDRESS = process.env.MULTI_RESERVE_CONTRACT_ADDRESS?.trim();
const QUERY_TOKEN_TYPES = process.env.MULTI_RESERVE_QUERY_TOKEN_TYPES
  ?.split(',')
  .map((token) => token.trim())
  .filter(Boolean)
  .map((token) => normalizeBytes32Hex(token, 'query_token_type'));

if (!CONTRACT_ADDRESS) {
  throw new Error('MULTI_RESERVE_CONTRACT_ADDRESS_required');
}

setNetworkId(NETWORK_ID);

const publicDataProvider = indexerPublicDataProvider(INDEXER_URL, INDEXER_WS_URL);
const state = await publicDataProvider.queryContractState(CONTRACT_ADDRESS);
if (state == null) {
  throw new Error(`contract_state_missing:${CONTRACT_ADDRESS}`);
}

const ledgerState = state.data ?? state;
const ledger = MultiShieldReserve.ledger(ledgerState);
const reserves = Array.from(ledger.reserves).map(([foreign, reserve]) => ({
  foreignUnshieldedTokenType: bytesToHex(foreign),
  shieldedWrapperDomain: bytesToHex(reserve.shieldedWrapperDomain),
  shieldedWrapperTokenType: bytesToHex(reserve.shieldedWrapperTokenType),
  nativeNight: bytesToHex(foreign) === NATIVE_NIGHT_TOKEN_TYPE,
}));
const reserveByForeign = new Map(reserves.map((reserve) => [reserve.foreignUnshieldedTokenType, reserve]));

const lookups = (QUERY_TOKEN_TYPES ?? []).map((tokenType) => ({
  foreignUnshieldedTokenType: tokenType,
  exists: reserveByForeign.has(tokenType),
  reserve: reserveByForeign.get(tokenType) ?? null,
}));

console.log(JSON.stringify(
  {
    network: NETWORK_ID,
    indexerUrl: INDEXER_URL,
    contractAddress: CONTRACT_ADDRESS,
    reserveCount: reserves.length,
    reserves,
    lookups,
  },
  null,
  2,
));
