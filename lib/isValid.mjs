import ToString from '#abstract/ToString';
import IsValidString from '#abstract-functions/IsValidString';

const isValid = string => {
  const chars = ToString(string);
  return IsValidString(chars);
}

export default isValid;
