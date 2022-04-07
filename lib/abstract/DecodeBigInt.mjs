import DecodeBigIntBreak from './DecodeBigIntBreak.mjs';
import DecodeBigIntIgnore from './DecodeBigIntIgnore.mjs';
import DecodeBigIntStrict from './DecodeBigIntStrict.mjs';

const DecodeBigInt = (string, errorMode) => {
  const decodeBigInt = (
    errorMode === 'strict' ? DecodeBigIntStrict :
    errorMode === 'ignore' ? DecodeBigIntIgnore : DecodeBigIntBreak
  );
  return decodeBigInt(string);
}

export default DecodeBigInt;
