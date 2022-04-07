'use strict';

const ToBigInt = require('#abstract/ToBigInt');
const EncodeBigInt = require('#abstract-functions/EncodeBigInt');

const encodeBigInt = bigint => {
  const value = ToBigInt(bigint);
  return EncodeBigInt(value);
}

module.exports = encodeBigInt;
