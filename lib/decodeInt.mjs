import ToString from '#abstract/ToString';
import DecodeInt from '#abstract-functions/DecodeInt';
import ToErrorMode from '#abstract-functions/ToErrorMode';

const decodeInt = (string, errorMode) => {
  const chars = ToString(string);
  const mode = errorMode === undefined ? 'break' : ToErrorMode(errorMode);
  return DecodeInt(chars, mode);
}

export default decodeInt;
