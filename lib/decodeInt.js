'use strict';

const ToString = require('#abstract/ToString');
const DecodeInt = require('#abstract-functions/DecodeInt');
const ToErrorMode = require('#abstract-functions/ToErrorMode');

const decodeInt = (string, errorMode) => {
  const chars = ToString(string);
  const mode = errorMode === undefined ? 'break' : ToErrorMode(errorMode);
  return DecodeInt(chars, mode);
}

module.exports = decodeInt;
