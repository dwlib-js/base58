'use strict';

const MathCeil = require('#primordials/MathCeil');
const MathLog = require('#primordials/MathLog');

const FACTOR = MathLog(58) / MathLog(256);

const GetMaxByteCount = charCount => MathCeil(charCount * FACTOR);

module.exports = GetMaxByteCount;
