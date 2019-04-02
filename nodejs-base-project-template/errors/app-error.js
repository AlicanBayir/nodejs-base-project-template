'use strict';

class AppError extends Error {

    constructor (code, message, status, data) {
        // Calling parent constructor of base Error class.
        super(message);
        // Saving class name in the property of our custom error as a shortcut.
        this.name = this.constructor.name;
        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
        // You can use any additional properties you want.
        // I'm going to use preferred HTTP status for this error types.
        // `500` is the default value if not specified.
        this.status = status || 500;
        this.setCode(code);
        this.setMessage(message);
        this.setData(data);
    }
}

Error.prototype.setCode = Error.prototype.setErrorCode = function (code) {
    this.code = code;
    return this;
};

Error.prototype.getCode = Error.prototype.getErrorCode = function () {
    return this.code || 'ERR';
};

Error.prototype.setData = Error.prototype.setErrorData = function (data) {
    this.data = data;
    return this;
};

Error.prototype.getData = Error.prototype.getErrorData = function () {
    return this.data;
};

Error.prototype.setMessage = Error.prototype.setErrorMessage = function (message) {
    this.message = message;
    return this;
};

Error.prototype.getMessage = Error.prototype.getErrorMessage = function () {
    return this.message || 'An error occurred.';
};


module.exports = AppError;
