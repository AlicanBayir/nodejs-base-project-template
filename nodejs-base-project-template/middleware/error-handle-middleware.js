'use strict';

const AppError = require('../errors/app-error');

class ErrorHandlerMiddleware {

    handleError(err, req, res, next) {
        if (err instanceof AppError) {
            logger.error("AppError: " +  err.getMessage());
            return res.status(err.status).error(err.getCode(), err.getMessage(), null);
        }
        if (err instanceof Error) {
            logger.error("Error: " +  err);
            return res.status(errorConst.ERR_INTERNAL_SERVER_ERROR).error(err.getCode(), "Something went wrong.", null);
        }
    }
}

module.exports = ErrorHandlerMiddleware;
