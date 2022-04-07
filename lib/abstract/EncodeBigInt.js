'use strict';

const BigInt = require('#primordials/BigInt');
const ALPHABET = require('#internal/ALPHABET');

const BASE = BigInt(58);
const ZERO = BigInt(0);

const EncodeBigInt = bigint => {
  if (!bigint) {
    return '1';
  }
  let string = '';
  let carry = bigint < ZERO ? -bigint : bigint;
  while (carry) {
    const charIndex = carry % BASE;
    const char = ALPHABET[charIndex];
    string = `${char}${string}`;
    carry /= BASE;
  }
  return string;
}

module.exports = EncodeBigInt;
