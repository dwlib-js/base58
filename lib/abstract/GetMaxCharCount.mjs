import MathCeil from '#primordials/MathCeil';
import MathLog from '#primordials/MathLog';

const FACTOR = MathLog(256) / MathLog(58);

const GetMaxCharCount = byteCount => MathCeil(byteCount * FACTOR);

export default GetMaxCharCount;
