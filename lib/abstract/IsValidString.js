'use strict';

const AlphabetIndexOf = require('#internal/AlphabetIndexOf');

const IsValidString = string => {
  const length = string.length;
  for (let i = 0; i < length; i++) {
    const char = string[i];
    const charIndex = AlphabetIndexOf(char);
    if (charIndex === undefined) {
      return false;
    }
  }
  return true;
}

module.exports = IsValidString;
