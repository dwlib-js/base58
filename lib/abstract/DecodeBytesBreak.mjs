import Uint8Array from '#primordials/Uint8Array';
import AlphabetIndexOf from '#internal/AlphabetIndexOf';
import GetMaxByteCount from './GetMaxByteCount.mjs';

const DecodeBytesBreak = string => {
  const length = string.length;
  let index = 0;
  while (index < length && string[index] === '1') {
    index++;
  }
  if (index === length) {
    return new Uint8Array(length);
  }
  let bufferIndex = index;
  const maxByteCount = GetMaxByteCount(length - index);
  const bytes = new Uint8Array(maxByteCount);
  const lastIndex = maxByteCount - 1;
  let offset = lastIndex;
  while (index < length) {
    const char = string[index];
    let carry = AlphabetIndexOf(char);
    if (carry === undefined) {
      if (index === bufferIndex) {
        offset++;
      }
      break;
    }
    let j = lastIndex;
    while (carry || j >= offset) {
      const byte = bytes[j];
      carry += byte * 58;
      bytes[j--] = carry & 0xff;
      carry >>= 8;
    }
    offset = j + 1;
    index++;
  }
  const byteCount = maxByteCount - offset + bufferIndex;
  const buffer = new Uint8Array(byteCount);
  while (offset < maxByteCount) {
    buffer[bufferIndex++] = bytes[offset++];
  }
  return buffer;
}

export default DecodeBytesBreak;
