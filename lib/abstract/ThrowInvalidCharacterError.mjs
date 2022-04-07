import RangeError from '#primordials/RangeError';

const ThrowInvalidCharacterError = index => {
  throw new RangeError(`Invalid Base58 character at index ${index}`);
}

export default ThrowInvalidCharacterError;
