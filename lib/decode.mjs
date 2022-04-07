import ToString from '#abstract/ToString';
import DecodeBytes from '#abstract-functions/DecodeBytes';
import ToErrorMode from '#abstract-functions/ToErrorMode';

const decode = (string, errorMode) => {
  const chars = ToString(string);
  const mode = errorMode === undefined ? 'break' : ToErrorMode(errorMode);
  return DecodeBytes(chars, mode);
}

export default decode;
