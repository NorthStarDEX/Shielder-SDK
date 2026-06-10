#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);

const patchFile = async (relativePath, replacements) => {
  const file = path.join(root, relativePath);
  let source = await readFile(file, 'utf8');
  let changed = false;

  for (const { name, before, after, marker } of replacements) {
    if (source.includes(after) || (marker && source.includes(marker))) {
      continue;
    }
    if (!source.includes(before)) {
      throw new Error(`Cannot apply ${name}; expected source block not found in ${relativePath}`);
    }
    source = source.replace(before, after);
    changed = true;
  }

  if (changed) {
    await writeFile(file, source);
    console.log(`[midnight-sdk-patches] patched ${relativePath}`);
  } else {
    console.log(`[midnight-sdk-patches] already patched ${relativePath}`);
  }
};

await patchFile('node_modules/@midnight-ntwrk/midnight-js-contracts/dist/index.mjs', [
  {
    name: 'make zswapStateToOffer segment-aware',
    before: `const zswapStateToOffer = (zswapLocalState, encryptionPublicKeyOrResolver, addressAndChainStateTuple) => {
    const resolver = typeof encryptionPublicKeyOrResolver === 'function'
        ? encryptionPublicKeyOrResolver
        : () => encryptionPublicKeyOrResolver;
    const unprovenOutputs = new Map(zswapLocalState.outputs.map((output) => [
        serializeCoinInfo(output.coinInfo),
        createZswapOutput(output, resolver, DEFAULT_SEGMENT_NUMBER)
    ]));
    const unprovenInputs = new Map();
    const unprovenTransients = new Map();
    const rehashedChainState = addressAndChainStateTuple?.zswapChainState.postBlockUpdate(new Date());
    zswapLocalState.inputs.forEach((qualifiedCoinInfo) => {
        const serializedCoinInfo = serializeQualifiedShieldedCoinInfo(qualifiedCoinInfo);
        const unprovenOutput = unprovenOutputs.get(serializedCoinInfo);
        if (unprovenOutput) {
            unprovenTransients.set(serializedCoinInfo, ZswapTransient.newFromContractOwnedOutput(qualifiedCoinInfo, DEFAULT_SEGMENT_NUMBER, unprovenOutput));
            unprovenOutputs.delete(serializedCoinInfo);
        }
        else {
            assertDefined(addressAndChainStateTuple, \`Only outputs or transients are expected when no chain state is provided\`);
            assertDefined(rehashedChainState, \`Only outputs or transients are expected when no chain state is provided\`);
            assertIsContractAddress(addressAndChainStateTuple.contractAddress);
            unprovenInputs.set(serializedCoinInfo, ZswapInput.newContractOwned(qualifiedCoinInfo, DEFAULT_SEGMENT_NUMBER, addressAndChainStateTuple.contractAddress, rehashedChainState));
        }
    });`,
    after: `const zswapStateToOffer = (zswapLocalState, encryptionPublicKeyOrResolver, addressAndChainStateTuple, segmentNumber = DEFAULT_SEGMENT_NUMBER) => {
    const resolver = typeof encryptionPublicKeyOrResolver === 'function'
        ? encryptionPublicKeyOrResolver
        : () => encryptionPublicKeyOrResolver;
    const unprovenOutputs = new Map(zswapLocalState.outputs.map((output) => [
        serializeCoinInfo(output.coinInfo),
        createZswapOutput(output, resolver, segmentNumber)
    ]));
    const unprovenInputs = new Map();
    const unprovenTransients = new Map();
    const rehashedChainState = addressAndChainStateTuple?.zswapChainState.postBlockUpdate(new Date());
    zswapLocalState.inputs.forEach((qualifiedCoinInfo) => {
        const serializedCoinInfo = serializeQualifiedShieldedCoinInfo(qualifiedCoinInfo);
        const unprovenOutput = unprovenOutputs.get(serializedCoinInfo);
        if (unprovenOutput) {
            unprovenTransients.set(serializedCoinInfo, ZswapTransient.newFromContractOwnedOutput(qualifiedCoinInfo, segmentNumber, unprovenOutput));
            unprovenOutputs.delete(serializedCoinInfo);
        }
        else {
            assertDefined(addressAndChainStateTuple, \`Only outputs or transients are expected when no chain state is provided\`);
            assertDefined(rehashedChainState, \`Only outputs or transients are expected when no chain state is provided\`);
            assertIsContractAddress(addressAndChainStateTuple.contractAddress);
            unprovenInputs.set(serializedCoinInfo, ZswapInput.newContractOwned(qualifiedCoinInfo, segmentNumber, addressAndChainStateTuple.contractAddress, rehashedChainState));
        }
    });`,
  },
  {
    name: 'build fallible contract-call zswap offers in the intent segment',
    before: `    return Transaction.fromPartsRandomized(getNetworkId(), zswapStateToOffer(nextZswapLocalState, encryptionPublicKey, {
        contractAddress,
        zswapChainState
    }), undefined, intent);
};`,
    after: `    if (!partitionedTranscript[1]) {
        return Transaction.fromPartsRandomized(getNetworkId(), zswapStateToOffer(nextZswapLocalState, encryptionPublicKey, {
            contractAddress,
            zswapChainState
        }), undefined, intent);
    }
    const tx = Transaction.fromPartsRandomized(getNetworkId(), undefined, undefined, intent);
    const intentSegment = Array.from(tx.intents.keys())[0];
    assertDefined(intentSegment, \`Unable to find fallible contract-call intent segment\`);
    return tx.addZswapOffer({ tag: 'specific', value: intentSegment }, zswapStateToOffer(nextZswapLocalState, encryptionPublicKey, {
        contractAddress,
        zswapChainState
    }, intentSegment));
};`,
    marker: 'Unable to find fallible contract-call intent segment',
  },
]);

await patchFile('node_modules/@midnight-ntwrk/wallet-sdk-shielded/dist/v1/Transacting.js', [
  {
    name: 'allow fallible-only shielded balancing',
    before: `            return yield* pipe(this.#prepareOffer(secretKeys, state, balanceRecipe, 0), Either.fromOption(() => {
                return new OtherWalletError({
                    message: 'Could not create a valid guaranteed offer',
                });
            }));
        });
    }`,
    after: `            return yield* pipe(this.#prepareOffer(secretKeys, state, balanceRecipe, 0), Option.match({
                onNone: () => Either.right({ offer: undefined, newState: state }),
                onSome: (res) => Either.right(res),
            }));
        });
    }`,
    marker: 'onNone: () => Either.right({ offer: undefined, newState: state })',
  },
]);
