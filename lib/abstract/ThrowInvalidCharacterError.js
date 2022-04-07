'use strict';

const RangeError = require('#primordials/RangeError');

const ThrowInvalidCharacterError = index => {
  throw new RangeError(`Invalid Base58 character at index ${index}`);
}

module.exports = ThrowInvalidCharacterError;
