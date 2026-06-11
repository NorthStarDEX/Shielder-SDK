import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const oldOwner = 'UTxO' + 'Maestro';
const oldOwnerLower = oldOwner.toLowerCase();
const oldRepo = 'Shielder' + 'Reserve';
const oldPackage = `${oldOwnerLower}/shielder-reserve`;
const localUser = 'work' + 'horse';

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');

const forbidden = [
  new RegExp(`${escapeRegExp(oldOwner)}/${escapeRegExp(oldRepo)}`, 'u'),
  new RegExp(`git@github\\.com:${escapeRegExp(oldOwner)}/${escapeRegExp(oldRepo)}`, 'u'),
  new RegExp(`github\\.com/${escapeRegExp(oldOwner)}/${escapeRegExp(oldRepo)}`, 'u'),
  new RegExp(`@${escapeRegExp(oldPackage)}`, 'u'),
  new RegExp(`/Users/${escapeRegExp(localUser)}`, 'u'),
  new RegExp(`\\b${escapeRegExp(localUser)}\\b`, 'u'),
];

const trackedFiles = execFileSync('git', ['ls-files'], { encoding: 'utf8' })
  .split('\n')
  .filter(Boolean)
  .filter((file) => !file.startsWith('artifacts/MultiShieldReserve/keys/'));

const failures = [];

for (const file of trackedFiles) {
  const content = readFileSync(file);
  if (content.includes(0)) continue;
  const text = content.toString('utf8');
  for (const pattern of forbidden) {
    if (pattern.test(text)) {
      failures.push(`${file}: matches ${pattern}`);
    }
  }
}

if (failures.length > 0) {
  console.error('[check-public-refs] forbidden public reference(s) found:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('[check-public-refs] ok');
