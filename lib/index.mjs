import GetIntrinsicOrThrow from '#intrinsics/GetIntrinsicOrThrow';
import HasIntrinsic from '#intrinsics/HasIntrinsic';
import ObjectCreate from '#primordials/ObjectCreate';
import ReflectDefineProperty from '#primordials/ReflectDefineProperty';
import Base58Decode from './decode.mjs';
import Base58DecodeInt from './decodeInt.mjs';
import Base58DecodeInto from './decodeInto.mjs';
import Base58Encode from './encode.mjs';
import Base58EncodeInt from './encodeInt.mjs';
import Base58IsValid from './isValid.mjs';
import Base58Validate from './validate.mjs';

const ImportFunction = async name => {
  const module = await import(`./${name}.mjs`);
  return module.default;
}

const hasBigInt = HasIntrinsic('BigInt');

const Base58DecodeBigInt = hasBigInt ? await ImportFunction('decodeBigInt') : undefined;
const Base58EncodeBigInt = hasBigInt ? await ImportFunction('encodeBigInt') : undefined;

const ObjectPrototype = GetIntrinsicOrThrow('Object.prototype');
const SymbolToStringTag = GetIntrinsicOrThrow('@@toStringTag');

const Base58 = ObjectCreate(ObjectPrototype, {
  decode: {
    value: Base58Decode
  },
  decodeBigInt: {
    value: Base58DecodeBigInt
  },
  decodeInt: {
    value: Base58DecodeInt
  },
  decodeInto: {
    value: Base58DecodeInto
  },
  encode: {
    value: Base58Encode
  },
  encodeBigInt: {
    value: Base58EncodeBigInt
  },
  encodeInt: {
    value: Base58EncodeInt
  },
  isValid: {
    value: Base58IsValid
  },
  validate: {
    value: Base58Validate
  }
});
ReflectDefineProperty(Base58, SymbolToStringTag, {
  value: 'Base58'
});

export default Base58;
