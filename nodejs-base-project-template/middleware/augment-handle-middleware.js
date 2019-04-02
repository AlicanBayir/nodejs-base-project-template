'use strict';

class AugmentHandleMiddleware {

    augmentHandle(req, res, next) {
        res.error = res.sendErrorMessage = function (code, message, data) {
            if (code instanceof Error) {
                this.send({
                    status: 'ERROR',
                    code: code.getCode(),
                    message: code.getMessage(),
                    data: code.getData()
                })
            } else {
                this.send({
                    status: 'ERROR',
                    code: code,
                    message: message,
                    data: data
                });
            }
        };

        res.success = res.sendSuccessMessage = function (code, message, data) {
            this.send({
                status: 'SUCCESS',
                code: code,
                message: message,
                data: data
            });
        };
        next();
    }
}

module.exports = AugmentHandleMiddleware;
