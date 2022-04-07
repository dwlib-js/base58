'use strict';

const BigInt = require('#primordials/BigInt');
const AlphabetIndexOf = require('#internal/AlphabetIndexOf');

const BASE = BigInt(58);
const ZERO = BigInt(0);

const DecodeBigIntIgnore = string => {
  const length = string.length;
  let bigint = ZERO;
  for (let i = 0; i < length; i++) {
    const char = string[i];
    const charIndex = AlphabetIndexOf(char);
    if (charIndex === undefined) {
      continue;
    }
    bigint = bigint * BASE + BigInt(charIndex);
  }
  return bigint;
}

module.exports = DecodeBigIntIgnore;
