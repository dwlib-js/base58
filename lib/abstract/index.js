'use strict';

const HasIntrinsic = require('#intrinsics/HasIntrinsic');

const hasBigInt = HasIntrinsic('BigInt');

const DecodeBigInt = hasBigInt ? require('./DecodeBigInt') : undefined;
const DecodeBigIntBreak = hasBigInt ? require('./DecodeBigIntBreak') : undefined;
const DecodeBigIntIgnore = hasBigInt ? require('./DecodeBigIntIgnore') : undefined;
const DecodeBigIntStrict = hasBigInt ? require('./DecodeBigIntStrict') : undefined;
const DecodeBytes = require('./DecodeBytes');
const DecodeBytesBreak = require('./DecodeBytesBreak');
const DecodeBytesIgnore = require('./DecodeBytesIgnore');
const DecodeBytesStrict = require('./DecodeBytesStrict');
const DecodeBytesInto = require('./DecodeBytesInto');
const DecodeBytesIntoBreak = require('./DecodeBytesIntoBreak');
const DecodeBytesIntoIgnore = require('./DecodeBytesIntoIgnore');
const DecodeBytesIntoStrict = require('./DecodeBytesIntoStrict');
const DecodeInt = require('./DecodeInt');
const DecodeIntBreak = require('./DecodeIntBreak');
const DecodeIntIgnore = require('./DecodeIntIgnore');
const DecodeIntStrict = require('./DecodeIntStrict');
const EncodeBigInt = hasBigInt ? require('./EncodeBigInt') : undefined;
const EncodeBytes = require('./EncodeBytes');
const EncodeInt = require('./EncodeInt');
const GetMaxByteCount = require('./GetMaxByteCount');
const GetMaxCharCount = require('./GetMaxCharCount');
const IsValidString = require('./IsValidString');
const ThrowInvalidCharacterError = require('./ThrowInvalidCharacterError');
const ToErrorMode = require('./ToErrorMode');
const ValidateString = require('./ValidateString');

module.exports = {
  DecodeBigInt,
  DecodeBigIntBreak,
  DecodeBigIntIgnore,
  DecodeBigIntStrict,
  DecodeBytes,
  DecodeBytesBreak,
  DecodeBytesIgnore,
  DecodeBytesStrict,
  DecodeBytesInto,
  DecodeBytesIntoBreak,
  DecodeBytesIntoIgnore,
  DecodeBytesIntoStrict,
  DecodeInt,
  DecodeIntBreak,
  DecodeIntIgnore,
  DecodeIntStrict,
  EncodeBigInt,
  EncodeBytes,
  EncodeInt,
  GetMaxByteCount,
  GetMaxCharCount,
  IsValidString,
  ThrowInvalidCharacterError,
  ToErrorMode,
  ValidateString
};
