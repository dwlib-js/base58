'use strict';

const RangeError = require('#primordials/RangeError');
const StringToLowerCase = require('#primordials/StringToLowerCase');
const ToString = require('#abstract/ToString');

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

module.exports = ToErrorMode;
