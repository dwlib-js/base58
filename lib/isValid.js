'use strict';

const ToString = require('#abstract/ToString');
const IsValidString = require('#abstract-functions/IsValidString');

const isValid = string => {
  const chars = ToString(string);
  return IsValidString(chars);
}

module.exports = isValid;
