import MathCeil from '#primordials/MathCeil';
import MathLog from '#primordials/MathLog';

const FACTOR = MathLog(58) / MathLog(256);

const GetMaxByteCount = charCount => MathCeil(charCount * FACTOR);

export default GetMaxByteCount;
