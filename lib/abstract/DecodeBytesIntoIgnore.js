'use strict';

const TypedArrayLength = require('#primordials/TypedArrayLength');
const Uint8Array = require('#primordials/Uint8Array');
const AlphabetIndexOf = require('#internal/AlphabetIndexOf');
const GetMaxByteCount = require('./GetMaxByteCount');

const DecodeBytesIntoIgnore = (string, destination) => {
  const length = string.length;
  const destinationLength = TypedArrayLength(destination);
  let index = 0;
  let destinationIndex = 0;
  let leadingZeros = 0;
  while (index < length) {
    const char = string[index];
    if (char === '1') {
      leadingZeros++;
    } else {
      const charIndex = AlphabetIndexOf(char);
      if (charIndex !== undefined) {
        break;
      }
    }
    index++;
  }
  if (index === length) {
    while (destinationIndex < leadingZeros && destinationIndex < destinationLength) {
      destination[destinationIndex++] = 0;
    }
    return {
      read: index,
      decoded: leadingZeros,
      written: destinationIndex
    };
  }
  const maxByteCount = GetMaxByteCount(length - leadingZeros);
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
  const byteCount = maxByteCount - offset + leadingZeros;
  while (destinationIndex < leadingZeros && destinationIndex < destinationLength) {
    destination[destinationIndex++] = 0;
  }
  while (offset < maxByteCount && destinationIndex < destinationLength) {
    destination[destinationIndex++] = bytes[offset++];
  }
  return {
    read: index,
    decoded: byteCount,
    written: destinationIndex
  };
}

module.exports = DecodeBytesIntoIgnore;
