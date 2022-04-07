'use strict';

const TypedArrayLength = require('#primordials/TypedArrayLength');
const Uint8Array = require('#primordials/Uint8Array');
const ALPHABET = require('#internal/ALPHABET');
const GetMaxCharCount = require('./GetMaxCharCount');

const EncodeBytes = buffer => {
  const length = TypedArrayLength(buffer);
  let string = '';
  let index = 0;
  while (index < length && buffer[index] === 0) {
    string += '1';
    index++;
  }
  if (index === length) {
    return string;
  }
  const maxCharCount = GetMaxCharCount(length - index);
  const bytes = new Uint8Array(maxCharCount);
  const lastIndex = maxCharCount - 1;
  let offset = lastIndex;
  while (index < length) {
    let carry = buffer[index++];
    let j = lastIndex;
    while (carry || j >= offset) {
      const byte = bytes[j];
      carry += byte << 8;
      bytes[j--] = carry % 58;
      carry = (carry / 58) | 0;
    }
    offset = j + 1;
  }
  while (offset < maxCharCount) {
    const byte = bytes[offset++];
    string += ALPHABET[byte];
  }
  return string;
}

module.exports = EncodeBytes;
