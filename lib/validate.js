'use strict';

const ToString = require('#abstract/ToString');
const ValidateString = require('#abstract-functions/ValidateString');

const validate = string => {
  const chars = ToString(string);
  return ValidateString(chars);
}

module.exports = validate;
