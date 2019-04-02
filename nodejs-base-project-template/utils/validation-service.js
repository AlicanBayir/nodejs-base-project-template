'use strict';

class ValidationHelper {
    validate (alias, value, options) {
        if (options.hasOwnProperty('required')) {
            validateRequired(alias, value);
        }

        if (options.hasOwnProperty('type')) {
            validateType(alias, value, options.type);
        }

        if (options.hasOwnProperty('possibleValues')) {
            validatePossibleValues(alias, value, options.possibleValues);
        }

        if (options.hasOwnProperty('max')) {
            validateMax(alias, value, options.max);
        }

        if (options.hasOwnProperty('maxLength')) {
            validateMaxLength(alias, value, options.maxLength);
        }

        if (options.hasOwnProperty('min')) {
            validateMin(alias, value, options.min);
        }

        if (options.hasOwnProperty('minLength')) {
            validateMinLength(alias, value, options.minLength);
        }

        if (options.hasOwnProperty('pattern')) {
            validatePattern(alias, value, options.pattern);
        }
    }
}
/**
 * Validates given value according to given options.
 *
 * @param {string} alias - Alias for the given value. It is used for creation error message.
 * @param {*} value - Value that is checked for validity.
 * @param {object} options - There are 8 options which are listed below.
 * 		- {boolean} required
 * 		- {string} type
 * 		- {Array} possibleValues
 * 		- {number|Date} max
 * 		- {string} maxLength
 * 		- {number|Date} min
 * 		- {string} minLength
 * 		- {RegExp} pattern
 */

function validateRequired (alias, value) {
  if (isNullOrUndefined(value)) {
    throw new Error(alias + ' is required.').setErrorCode('ERR_MISSING_PARAM').setErrorData({alias: alias});
  }
}

function validateType (alias, value, type) {
  switch (type) {
    case 'boolean':
      if (!isBoolean(value)) {
        throw new TypeError(alias + ' is not a "boolean"').setErrorCode('ERR_INVALID_TYPE').setErrorData({alias: alias, value: value, type: type});
      }
      break;
    case 'number':
      if (!isNumber(value)) {
        throw new TypeError(alias + ' is not a "number"').setErrorCode('ERR_INVALID_TYPE').setErrorData({alias: alias, value: value, type: type});
      }
      break;
    case 'string':
      if (!isString(value)) {
        throw new TypeError(alias + ' is not a "string"').setErrorCode('ERR_INVALID_TYPE').setErrorData({alias: alias, value: value, type: type});
      }
      break;
    case 'object':
      if (!isObject(value)) {
        throw new TypeError(alias + ' is not an "object"').setErrorCode('ERR_INVALID_TYPE').setErrorData({alias: alias, value: value, type: type});
      }
      break;
    case 'function':
      if (!isFunction(value)) {
        throw new TypeError(alias + ' is not a "function"').setErrorCode('ERR_INVALID_TYPE').setErrorData({alias: alias, value: value, type: type});
      }
      break;
    case 'date':
      if (!isDate(value)) {
        throw new TypeError(alias + ' is not a "date"').setErrorCode('ERR_INVALID_TYPE').setErrorData({alias: alias, value: value, type: type});
      }
      break;
    default:
      if (!(value instanceof type)) {
        throw new TypeError(alias + ' is not an instance of ' + type).setErrorCode('ERR_INVALID_TYPE').setErrorData({alias: alias, value: value, type: type});
      }
      break;
  }
}

function validatePossibleValues (alias, value, possibleValues) {
  if (possibleValues.indexOf(value) === -1) {
    throw new Error(alias + ' is not valid.').setErrorCode('ERR_INVALID_VALUE').setErrorData({alias: alias, value: value, possibleValues: possibleValues});
  }
}

function validateMax (alias, value, max) {
  if (!isNullOrUndefined(value) && value > max) {
    throw new Error(alias + ' cannot be larger than ' + max).setErrorCode('ERR_MAX_VALUE_EXCEEDED').setErrorData({alias: alias, value: value, max: max});
  }
}

function validateMaxLength (alias, value, maxLength) {
  if (isString(value) && value.length > maxLength) {
    throw new Error(alias + ' cannot be longer than ' + maxLength).setErrorCode('ERR_MAXLENGTH_VALUE_EXCEEDED').setErrorData({alias: alias, value: value, maxLength: maxLength});
  }
}

function validateMin (alias, value, min) {
  if (!isNullOrUndefined(value) && value < min) {
    throw new Error(alias + ' cannot be smaller than ' + min).setErrorCode('ERR_MIN_VALUE_EXCEEDED').setErrorData({alias: alias, value: value, min: min});
  }
}

function validateMinLength (alias, value, minLength) {
  if (isString(value) && value.length < minLength) {
    throw new Error(alias + ' cannot be shorter than ' + minLength).setErrorCode('ERR_MINLENGTH_VALUE_EXCEEDED').setErrorData({alias: alias, value: value, minLength: minLength});
  }
}

function validatePattern (alias, value, pattern) {
  if (isString(value) && pattern instanceof RegExp && !value.match(pattern)) {
    throw new Error(alias + ' is invalid.').setErrorCode('ERR_PATTERN_NOT_MATCHED').setErrorData({alias: alias, value: value, pattern: pattern});
  }
}


function isArray(value) {
  return (value instanceof Array);
};

function isBoolean(value) {
  return (typeof value === 'boolean' || value instanceof Boolean);
};

function isDate(value) {
  return (new Date(value) !== "Invalid Date" && !isNaN(new Date(value)));
};

function isDefined(value) {
  return (value !== undefined);
};

function isFunction(value) {
  return (typeof value === 'function' || value instanceof Function);
};

function isNullOrUndefined(value) {
  return (value === undefined || value === null);
};

function isNumber(value) {
  return (typeof value === 'number' || value instanceof Number);
};

function isObject(value) {
  return (typeof value === 'object' || value instanceof Object);
};

function isString(value) {
  return (typeof value === 'string' || value instanceof String);
};

function isUndefined(value) {
  return (value === undefined);
};

module.exports = ValidationHelper;
