'use strict';

const MathFloor = require('#primordials/MathFloor');
const ALPHABET = require('#internal/ALPHABET');

const EncodeInt = integer => {
  if (!integer) {
    return '1';
  }
  let string = '';
  let carry = integer < 0 ? -integer : integer;
  while (carry) {
    const charIndex = carry % 58;
    const char = ALPHABET[charIndex];
    string = `${char}${string}`;
    carry = MathFloor(carry / 58);
  }
  return string;
}

module.exports = EncodeInt;
