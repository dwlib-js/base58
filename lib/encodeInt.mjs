import ToInteger from '#abstract/ToInteger';
import EncodeInt from '#abstract-functions/EncodeInt';

const encodeInt = integer => {
  const value = ToInteger(integer);
  return EncodeInt(value);
}

export default encodeInt;
