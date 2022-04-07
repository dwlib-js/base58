'use strict';

const BufferSourceAsUint8Array = require('#abstract/BufferSourceAsUint8Array');
const EncodeBytes = require('#abstract-functions/EncodeBytes');

const encode = source => {
  const buffer = BufferSourceAsUint8Array(source);
  return EncodeBytes(buffer);
}

module.exports = encode;
