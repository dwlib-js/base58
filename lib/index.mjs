import {
  BigInt,
  FunctionBind,
  Map,
  MapPrototypeGet,
  MapSet,
  MathCeil,
  MathFloor,
  MathLog,
  ObjectCreate,
  ObjectDefineProperties,
  ObjectPrototype,
  RangeError,
  StringFromCharCode,
  StringCharCodeAt,
  SymbolToStringTag,
  TypeError,
  TypedArrayLength,
  Uint8Array
} from '@dwlib/primordials';
import IsBuffer from '@dwlib/abstract/IsBuffer';
import IsUint8Array from '@dwlib/abstract/IsUint8Array';
import ToString from '@dwlib/abstract/ToString';
import ToIntegerOrInfinity from '@dwlib/abstract/ToIntegerOrInfinity';
import ToBigInt from '@dwlib/abstract/ToBigInt';
import {
  encode as UTF8Encode,
  decode as UTF8Decode
} from '@dwlib/utf8';

const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

const FACTOR = MathLog(256) / MathLog(58);
const INVERSE_FACTOR = MathLog(58) / MathLog(256);

const CreateLookups = alphabet => {
  const ALPHABET_LOOKUP = new Map();
  const BASE_MAP = new Map();
  const BASE_MAP_LOOKUP = new Map();
  for (let i = 0; i < 58; i++) {
    const char = alphabet[i];
    const charCode = StringCharCodeAt(alphabet, i);
    MapSet(ALPHABET_LOOKUP, char, i);
    MapSet(BASE_MAP, i, charCode);
    MapSet(BASE_MAP_LOOKUP, charCode, i);
  }
  return {
    ALPHABET_LOOKUP,
    BASE_MAP,
    BASE_MAP_LOOKUP
  };
}

const {
  ALPHABET_LOOKUP,
  BASE_MAP,
  BASE_MAP_LOOKUP
} = CreateLookups(ALPHABET);

const GetAlphabetCharIndex = FunctionBind(MapPrototypeGet, ALPHABET_LOOKUP);
const GetAlphabetCharCodeByIndex = FunctionBind(MapPrototypeGet, BASE_MAP);
const GetAlphabetCharIndexByCode = FunctionBind(MapPrototypeGet, BASE_MAP_LOOKUP);

const GetCapacity = length => MathCeil(length * FACTOR);

const GetInverseCapacity = length => MathCeil(length * INVERSE_FACTOR);

const RequireBuffer = argument => {
  if (!IsBuffer(argument)) {
    throw new TypeError('`buffer` is not an instance of ArrayBuffer or ArrayBufferView');
  }
}

const Encode = string => {
  const length = string.length;
  if (!length) {
    return '';
  }
  let leadingZeros = 0;
  while (leadingZeros < length && string[leadingZeros] === '\0') {
    leadingZeros++;
  }
  const capacity = GetCapacity(length - leadingZeros);
  const bytes = new Uint8Array(capacity);
  const lastIndex = capacity - 1;
  let offset = lastIndex;
  for (let i = leadingZeros; i < length; i++) {
    let carry = StringCharCodeAt(string, i);
    if (carry > 0xff) {
      throw new RangeError('Invalid ASCII encoding');
    }
    let index = lastIndex;
    while (carry || index >= offset) {
      carry += bytes[index] << 8;
      bytes[index] = carry % 58;
      carry = (carry / 58) | 0;
      index--;
    }
    offset = ++index;
  }
  let result = '';
  while (leadingZeros > 0) {
    result += '1';
    leadingZeros--;
  }
  while (offset < capacity) {
    const charIndex = bytes[offset++];
    result += ALPHABET[charIndex];
  }
  return result;
}

const EncodeToBytes = string => {
  const length = string.length;
  if (!length) {
    return new Uint8Array(0);
  }
  let leadingZeros = 0;
  while (leadingZeros < length && string[leadingZeros] === '\0') {
    leadingZeros++;
  }
  const capacity = GetCapacity(length - leadingZeros);
  const bytes = new Uint8Array(capacity);
  const lastIndex = capacity - 1;
  let offset = lastIndex;
  for (let i = leadingZeros; i < length; i++) {
    let carry = StringCharCodeAt(string, i);
    if (carry > 0xff) {
      throw new RangeError('Invalid ASCII encoding');
    }
    let index = lastIndex;
    while (carry || index >= offset) {
      carry += bytes[index] << 8;
      bytes[index] = carry % 58;
      carry = (carry / 58) | 0;
      index--;
    }
    offset = ++index;
  }
  const size = capacity - offset + leadingZeros;
  const result = new Uint8Array(size);
  let index = 0;
  while (index < leadingZeros) {
    result[index++] = 0x31;
  }
  while (index < size) {
    const charIndex = bytes[offset++];
    result[index++] = GetAlphabetCharCodeByIndex(charIndex);
  }
  return result;
}

const Decode = encodedString => {
  const length = encodedString.length;
  if (!length) {
    return '';
  }
  let leadingZeros = 0;
  while (leadingZeros < length && encodedString[leadingZeros] === '1') {
    leadingZeros++;
  }
  const capacity = GetCapacity(length - leadingZeros);
  const bytes = new Uint8Array(capacity);
  const lastIndex = capacity - 1;
  let offset = lastIndex;
  for (let i = leadingZeros; i < length; i++) {
    const charCode = StringCharCodeAt(encodedString, i);
    let carry = GetAlphabetCharIndexByCode(charCode);
    if (carry === undefined) {
      throw new RangeError('Invalid Base58 encoding');
    }
    let index = lastIndex;
    while (carry || index >= offset) {
      carry += bytes[index] * 58;
      bytes[index] = carry & 0xff;
      carry >>= 8;
      index--;
    }
    offset = ++index;
  }
  let result = '';
  while (leadingZeros > 0) {
    result += '\0';
    leadingZeros--;
  }
  while (offset < capacity) {
    const charCode = bytes[offset++];
    result += StringFromCharCode(charCode);
  }
  return result;
}

const DecodeToBytes = encodedString => {
  const length = encodedString.length;
  if (!length) {
    return new Uint8Array(0);
  }
  let leadingZeros = 0;
  while (leadingZeros < length && encodedString[leadingZeros] === '1') {
    leadingZeros++;
  }
  const capacity = GetCapacity(length - leadingZeros);
  const bytes = new Uint8Array(capacity);
  const lastIndex = capacity - 1;
  let offset = lastIndex;
  for (let i = leadingZeros; i < length; i++) {
    const charCode = StringCharCodeAt(encodedString, i);
    let carry = GetAlphabetCharIndexByCode(charCode);
    if (carry === undefined) {
      throw new RangeError('Invalid Base58 encoding');
    }
    let index = lastIndex;
    while (carry || index >= offset) {
      carry += bytes[index] * 58;
      bytes[index] = carry & 0xff;
      carry >>= 8;
      index--;
    }
    offset = ++index;
  }
  const size = capacity - offset + leadingZeros;
  const result = new Uint8Array(size);
  let index = leadingZeros;
  while (index < size) {
    result[index++] = bytes[offset++];
  }
  return result;
}

const EncodeBytes = buffer => {
  const source = IsUint8Array(buffer) ? buffer : new Uint8Array(buffer);
  const length = TypedArrayLength(source);
  if (!length) {
    return new Uint8Array(0);
  }
  let leadingZeros = 0;
  while (leadingZeros < length && source[leadingZeros] === 0) {
    leadingZeros++
  }
  const capacity = GetCapacity(length - leadingZeros);
  const bytes = new Uint8Array(capacity);
  const lastIndex = capacity - 1;
  let offset = lastIndex;
  for (let i = leadingZeros; i < length; i++) {
    let carry = source[i];
    let index = lastIndex;
    while (carry || index >= offset) {
      carry += bytes[index] << 8;
      bytes[index] = carry % 58;
      carry = (carry / 58) | 0;
      index--;
    }
    offset = ++index;
  }
  const size = capacity - offset + leadingZeros;
  const result = new Uint8Array(size);
  let index = 0;
  while (index < leadingZeros) {
    result[index++] = 0x31;
  }
  while (index < size) {
    const charIndex = bytes[offset++];
    result[index++] = GetAlphabetCharCodeByIndex(charIndex);
  }
  return result;
}

const EncodeBytesToString = buffer => {
  const source = IsUint8Array(buffer) ? buffer : new Uint8Array(buffer);
  const length = TypedArrayLength(source);
  if (!length) {
    return '';
  }
  let leadingZeros = 0;
  while (leadingZeros < length && source[leadingZeros] === 0) {
    leadingZeros++
  }
  const capacity = GetCapacity(length - leadingZeros);
  const bytes = new Uint8Array(capacity);
  const lastIndex = capacity - 1;
  let offset = lastIndex;
  for (let i = leadingZeros; i < length; i++) {
    let carry = source[i];
    let index = lastIndex;
    while (carry || index >= offset) {
      carry += bytes[index] << 8;
      bytes[index] = carry % 58;
      carry = (carry / 58) | 0;
      index--;
    }
    offset = ++index;
  }
  let result = '';
  while (leadingZeros > 0) {
    result += '1';
    leadingZeros--;
  }
  while (offset < capacity) {
    const charIndex = bytes[offset++];
    result += ALPHABET[charIndex];
  }
  return result;
}

const DecodeBytes = buffer => {
  const source = IsUint8Array(buffer) ? buffer : new Uint8Array(buffer);
  const length = TypedArrayLength(source);
  if (!length) {
    return new Uint8Array(0);
  }
  let leadingZeros = 0;
  while (leadingZeros < length && source[leadingZeros] === 0x31) {
    leadingZeros++;
  }
  const capacity = GetInverseCapacity(length - leadingZeros);
  const bytes = new Uint8Array(capacity);
  const lastIndex = capacity - 1;
  let offset = lastIndex;
  for (let i = leadingZeros; i < length; i++) {
    const charCode = source[i];
    let carry = GetAlphabetCharIndexByCode(charCode);
    if (carry === undefined) {
      throw new RangeError('Invalid Base58 encoding');
    }
    let index = lastIndex;
    while (carry || index >= offset) {
      carry += bytes[index] * 58;
      bytes[index] = carry & 0xff;
      carry >>= 8;
      index--;
    }
    offset = ++index;
  }
  const size = capacity - offset + leadingZeros;
  const result = new Uint8Array(size);
  let index = leadingZeros;
  while (index < size) {
    result[index++] = bytes[offset++];
  }
  return result;
}

const DecodeBytesToString = buffer => {
  const source = IsUint8Array(buffer) ? buffer : new Uint8Array(buffer);
  const length = TypedArrayLength(source);
  if (!length) {
    return '';
  }
  let leadingZeros = 0;
  while (leadingZeros < length && source[leadingZeros] === 0x31) {
    leadingZeros++;
  }
  const capacity = GetInverseCapacity(length - leadingZeros);
  const bytes = new Uint8Array(capacity);
  const lastIndex = capacity - 1;
  let offset = lastIndex;
  for (let i = leadingZeros; i < length; i++) {
    const charCode = source[i];
    let carry = GetAlphabetCharIndexByCode(charCode);
    if (carry === undefined) {
      throw new RangeError('Invalid Base58 encoding');
    }
    let index = lastIndex;
    while (carry || index >= offset) {
      carry += bytes[index] * 58;
      bytes[index] = carry & 0xff;
      carry >>= 8;
      index--;
    }
    offset = ++index;
  }
  let result = '';
  while (leadingZeros > 0) {
    result += '\0';
    leadingZeros--;
  }
  while (offset < capacity) {
    const charCode = bytes[offset++];
    result += StringFromCharCode(charCode);
  }
  return result;
}

const EncodeText = text => {
  const buffer = UTF8Encode(text);
  return EncodeBytesToString(buffer);
}

const EncodeTextToBytes = text => {
  const buffer = UTF8Encode(text);
  return EncodeBytes(buffer);
}

const DecodeText = encodedString => {
  const buffer = DecodeToBytes(encodedString);
  return UTF8Decode(buffer);
}

const DecodeBytesToText = buffer => {
  const bytes = DecodeBytes(buffer);
  return UTF8Decode(bytes);
}

const EncodeInt = integer => {
  if (!integer) {
    return '1';
  }
  let result = '';
  let carry = integer;
  while (carry) {
    const charIndex = carry % 58;
    const char = ALPHABET[charIndex];
    result = `${char}${result}`;
    carry = MathFloor(carry / 58);
  }
  return result;
}

const DecodeInt = encodedInteger => {
  const length = encodedInteger.length;
  if (!length) {
    return NaN;
  }
  let leadingZeros = 0;
  while (leadingZeros < length && encodedInteger[leadingZeros] === '1') {
    leadingZeros++;
  }
  let result = 0;
  for (let i = leadingZeros; i < length; i++) {
    const char = encodedInteger[i];
    const charIndex = GetAlphabetCharIndex(char);
    if (charIndex === undefined) {
      return NaN;
    }
    result = result * 58 + charIndex;
  }
  return result;
}

export const encode = string => {
  const $string = ToString(string);
  return Encode($string);
}

export const encodeToBytes = string => {
  const $string = ToString(string);
  return EncodeToBytes($string);
}

export const decode = encodedString => {
  const $encodedString = ToString(encodedString);
  return Decode($encodedString);
}

export const decodeToBytes = encodedString => {
  const $encodedString = ToString(encodedString);
  return DecodeToBytes($encodedString);
}

export const encodeBytes = buffer => {
  RequireBuffer(buffer);
  return EncodeBytes(buffer);
}

export const encodeBytesToString = buffer => {
  RequireBuffer(buffer);
  return EncodeBytesToString(buffer);
}

export const decodeBytes = buffer => {
  RequireBuffer(buffer);
  return DecodeBytes(buffer);
}

export const decodeBytesToString = buffer => {
  RequireBuffer(buffer);
  return DecodeBytesToString(buffer);
}

export const encodeText = text => EncodeText(text);

export const encodeTextToBytes = text => EncodeTextToBytes(text);

export const decodeText = encodedString => {
  const $encodedString = ToString(encodedString);
  return DecodeText($encodedString);
}

export const decodeBytesToText = buffer => {
  RequireBuffer(buffer);
  return DecodeBytesToText(buffer);
}

export const encodeInt = integer => {
  const $integer = ToIntegerOrInfinity(integer);
  if ($integer < 0) {
    throw new RangeError('`integer` cannot be negative');
  }
  if ($integer === Infinity) {
    throw new RangeError('`integer` is not finite');
  }
  return EncodeInt($integer);
}

export const decodeInt = encodedInteger => {
  const $encodedInteger = ToString(encodedInteger);
  return DecodeInt($encodedInteger);
}

export const Base58 = ObjectCreate(ObjectPrototype, {
  encode: {
    value: encode
  },
  encodeToBytes: {
    value: encodeToBytes
  },
  decode: {
    value: decode
  },
  decodeToBytes: {
    value: decodeToBytes
  },
  encodeBytes: {
    value: encodeBytes
  },
  encodeBytesToString: {
    value: encodeBytesToString
  },
  decodeBytes: {
    value: decodeBytes
  },
  decodeBytesToString: {
    value: decodeBytesToString
  },
  encodeText: {
    value: encodeText
  },
  encodeTextToBytes: {
    value: encodeTextToBytes
  },
  decodeText: {
    value: decodeText
  },
  decodeBytesToText: {
    value: decodeBytesToText
  },
  encodeInt: {
    value: encodeInt
  },
  decodeInt: {
    value: decodeInt
  },
  [SymbolToStringTag]: {
    value: 'Base58'
  }
});
export default Base58;

export let encodeBigInt;
export let decodeBigInt;

if (BigInt) {
  const BIGINT_ZERO = BigInt(0);
  const BIGINT_BASE = BigInt(58);

  const EncodeBigInt = bigint => {
    if (!bigint) {
      return '1';
    }
    let result = '';
    let carry = bigint;
    while (carry) {
      const charIndex = carry % BIGINT_BASE;
      const char = ALPHABET[charIndex];
      result = `${char}${result}`;
      carry /= BIGINT_BASE;
    }
    return result;
  }

  const DecodeBigInt = encodedInteger => {
    const length = encodedInteger.length;
    if (!length) {
      throw new RangeError('Invalid Base58 encoded integer');
    }
    let leadingZeros = 0;
    while (leadingZeros < length && encodedInteger[leadingZeros] === '1') {
      leadingZeros++;
    }
    let result = BIGINT_ZERO;
    for (let i = leadingZeros; i < length; i++) {
      const char = encodedInteger[i];
      const charIndex = GetAlphabetCharIndex(char);
      if (charIndex === undefined) {
        throw new RangeError('Invalid Base58 encoded integer');
      }
      result = result * BIGINT_BASE + BigInt(charIndex);
    }
    return result;
  }

  encodeBigInt = bigint => {
    const $bigint = ToBigInt(bigint);
    if ($bigint < BIGINT_ZERO) {
      throw new RangeError('`bigint` cannot be negative');
    }
    return EncodeBigInt($bigint);
  }

  decodeBigInt = encodedInteger => {
    const $encodedInteger = ToString(encodedInteger);
    return DecodeBigInt($encodedInteger);
  }

  ObjectDefineProperties(Base58, {
    encodeBigInt: {
      value: encodeBigInt
    },
    decodeBigInt: {
      value: decodeBigInt
    }
  });
}
