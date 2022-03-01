# Base58

## Install
`npm i --save @dwlib/base58`

## Usage
```javascript
// CJS
const base58 = require('@dwlib/base58');
// ESM
import Base58 from '@dwlib/base58';
import * as base58 from '@dwlib/base58';
// Module Exports
const {
  Base58,
  encode,
  encodeToBytes,
  decode,
  decodeToBytes,
  encodeBytes,
  encodeBytesToString,
  decodeBytes,
  decodeBytesToString,
  encodeText,
  encodeTextToBytes,
  decodeText,
  decodeBytesToText,
  encodeInt,
  decodeInt,
  encodeBigInt,
  decodeBigInt
} = base58;

const text = 'Ave, Darkwolf!🐺🐺🐺';
const encodedString = Base58.encodeText(text); // => '31GEC6Z1ppWwvCikxA5J7EaPFzPWhoJejFpV'
const decodedText = Base58.decodeText(encodedString);
decodedText === text // => true
```
