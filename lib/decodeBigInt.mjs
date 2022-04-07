import ToString from '#abstract/ToString';
import DecodeBigInt from '#abstract-functions/DecodeBigInt';
import ToErrorMode from '#abstract-functions/ToErrorMode';

const decodeBigInt = (string, errorMode) => {
  const chars = ToString(string);
  const mode = errorMode === undefined ? 'break' : ToErrorMode(errorMode);
  return DecodeBigInt(chars, mode);
}

export default decodeBigInt;
