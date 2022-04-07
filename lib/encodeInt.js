'use strict';

const ToInteger = require('#abstract/ToInteger');
const EncodeInt = require('#abstract-functions/EncodeInt');

const encodeInt = integer => {
  const value = ToInteger(integer);
  return EncodeInt(value);
}

module.exports = encodeInt;
