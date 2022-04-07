import ToString from '#abstract/ToString';
import ValidateString from '#abstract-functions/ValidateString';

const validate = string => {
  const chars = ToString(string);
  return ValidateString(chars);
}

export default validate;
