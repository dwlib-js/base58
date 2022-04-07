import ToBigInt from '#abstract/ToBigInt';
import EncodeBigInt from '#abstract-functions/EncodeBigInt';

const encodeBigInt = bigint => {
  const value = ToBigInt(bigint);
  return EncodeBigInt(value);
}

export default encodeBigInt;
