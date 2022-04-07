'use strict';

const ToString = require('#abstract/ToString');
const DecodeBigInt = require('#abstract-functions/DecodeBigInt');
const ToErrorMode = require('#abstract-functions/ToErrorMode');

const decodeBigInt = (string, errorMode) => {
  const chars = ToString(string);
  const mode = errorMode === undefined ? 'break' : ToErrorMode(errorMode);
  return DecodeBigInt(chars, mode);
}

module.exports = decodeBigInt;
