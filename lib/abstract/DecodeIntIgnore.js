'use strict';

const AlphabetIndexOf = require('#internal/AlphabetIndexOf');

const DecodeIntIgnore = string => {
  const length = string.length;
  let integer = 0;
  for (let i = 0; i < length; i++) {
    const char = string[i];
    const charIndex = AlphabetIndexOf(char);
    if (charIndex === undefined) {
      continue;
    }
    integer = integer * 58 + charIndex;
  }
  return integer;
}

module.exports = DecodeIntIgnore;
