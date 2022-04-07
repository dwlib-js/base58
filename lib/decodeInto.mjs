import TypeError from '#primordials/TypeError';
import IsUint8Array from '#types/isUint8Array';
import ToString from '#abstract/ToString';
import DecodeBytesInto from '#abstract-functions/DecodeBytesInto';
import ToErrorMode from '#abstract-functions/ToErrorMode';

const decodeInto = (string, destination, errorMode) => {
  const chars = ToString(string);
  if (!IsUint8Array(destination)) {
    throw new TypeError('destination is not an instance of Uint8Array');
  }
  const mode = errorMode === undefined ? 'break' : ToErrorMode(errorMode);
  return DecodeBytesInto(chars, destination, mode);
}

export default decodeInto;
