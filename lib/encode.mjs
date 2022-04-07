import BufferSourceAsUint8Array from '#abstract/BufferSourceAsUint8Array';
import EncodeBytes from '#abstract-functions/EncodeBytes';

const encode = source => {
  const buffer = BufferSourceAsUint8Array(source);
  return EncodeBytes(buffer);
}

export default encode;
