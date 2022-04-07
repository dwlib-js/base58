import DecodeBytesIntoBreak from './DecodeBytesIntoBreak.mjs';
import DecodeBytesIntoIgnore from './DecodeBytesIntoIgnore.mjs';
import DecodeBytesIntoStrict from './DecodeBytesIntoStrict.mjs';

const DecodeBytesInto = (string, destination, errorMode) => {
  const decodeInto = (
    errorMode === 'strict' ? DecodeBytesIntoStrict :
    errorMode === 'ignore' ? DecodeBytesIntoIgnore : DecodeBytesIntoBreak
  );
  return decodeInto(string, destination);
}

export default DecodeBytesInto;
