import RangeError from '#primordials/RangeError';
import StringToLowerCase from '#primordials/StringToLowerCase';
import ToString from '#abstract/ToString';

const ToErrorMode = argument => {
  const string = ToString(argument);
  const errorMode = StringToLowerCase(string);
  if (
    errorMode !== 'strict' &&
    errorMode !== 'break' &&
    errorMode !== 'ignore'
  ) {
    throw new RangeError('Invalid error mode');
  }
  return errorMode;
}

export default ToErrorMode;
