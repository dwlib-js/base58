'use strict';

const MathCeil = require('#primordials/MathCeil');
const MathLog = require('#primordials/MathLog');

const FACTOR = MathLog(256) / MathLog(58);

const GetMaxCharCount = byteCount => MathCeil(byteCount * FACTOR);

module.exports = GetMaxCharCount;
