'use strict';

const GetIntrinsicOrThrow = require('#intrinsics/GetIntrinsicOrThrow');
const HasIntrinsic = require('#intrinsics/HasIntrinsic');
const ObjectCreate = require('#primordials/ObjectCreate');
const ReflectDefineProperty = require('#primordials/ReflectDefineProperty');
const Base58Decode = require('./decode');
const Base58DecodeInt = require('./decodeInt');
const Base58DecodeInto = require('./decodeInto');
const Base58Encode = require('./encode');
const Base58EncodeInt = require('./encodeInt');
const Base58IsValid = require('./isValid');
const Base58Validate = require('./validate');

const hasBigInt = HasIntrinsic('BigInt');

const Base58DecodeBigInt = hasBigInt ? require('./decodeBigInt') : undefined;
const Base58EncodeBigInt = hasBigInt ? require('./encodeBigInt') : undefined;

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

module.exports = Base58;
