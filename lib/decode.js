'use strict';

const ToString = require('#abstract/ToString');
const DecodeBytes = require('#abstract-functions/DecodeBytes');
const ToErrorMode = require('#abstract-functions/ToErrorMode');

const decode = (string, errorMode) => {
  const chars = ToString(string);
  const mode = errorMode === undefined ? 'break' : ToErrorMode(errorMode);
  return DecodeBytes(chars, mode);
}

module.exports = decode;
