'use strict';

const Uint8Array = require('#primordials/Uint8Array');
const AlphabetIndexOf = require('#internal/AlphabetIndexOf');
const GetMaxByteCount = require('./GetMaxByteCount');

const DecodeBytesIgnore = string => {
  const length = string.length;
  let index = 0;
  let bufferIndex = 0;
  while (index < length) {
    const char = string[index];
    if (char === '1') {
      bufferIndex++;
    } else {
      const charIndex = AlphabetIndexOf(char);
      if (charIndex !== undefined) {
        break;
      }
    }
    index++;
  }
  if (index === length) {
    return new Uint8Array(bufferIndex);
  }
  const maxByteCount = GetMaxByteCount(length - bufferIndex);
  const bytes = new Uint8Array(maxByteCount);
  const lastIndex = maxByteCount - 1;
  let offset = lastIndex;
  while (index < length) {
    const char = string[index++];
    let carry = AlphabetIndexOf(char);
    if (carry === undefined) {
      continue;
    }
    let j = lastIndex;
    while (carry || j >= offset) {
      const byte = bytes[j];
      carry += byte * 58;
      bytes[j--] = carry & 0xff;
      carry >>= 8;
    }
    offset = j + 1;
  }
  const byteCount = maxByteCount - offset + bufferIndex;
  const buffer = new Uint8Array(byteCount);
  while (offset < maxByteCount) {
    buffer[bufferIndex++] = bytes[offset++];
  }
  return buffer;
}

module.exports = DecodeBytesIgnore;
