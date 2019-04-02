'use strict';

require('./utils/global-setter');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const AugmentHandlerMiddleware = require('./middleware/augment-handle-middleware');
const augmentHandlerMiddleware = new AugmentHandlerMiddleware();
const ErrorHandlerMiddleware = require('./middleware/error-handle-middleware');
const errorHandlerMiddleware = new ErrorHandlerMiddleware();
const testRouter = require('./routers/test-router');
// Heartbeat endpoint
app.get('/status', (req, res) => {
    let message = 'Test is up & running.';
    res.status(200);
    res.format({
        'application/json': () => {
            res.send({status: 200, message: message});
        },
        'text/html': function () {
            res.send(message);
        },
        'default': function () {
            res.set('Content-Type', 'text/plain');
            res.send(message);
        }
    });
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(augmentHandlerMiddleware.augmentHandle);
app.use('/test', testRouter);
app.use(errorHandlerMiddleware.handleError);
const server = app.listen(conf.port, () => {
    logger.info('Service is running at: ' + conf.port);
});
//===========================================================================
process.on('exit', () => {
    logger.info("Exit");
});

process.on('SIGTERM', () => {
    gracefulShutdown('SIGTERM');
});

process.on('SIGINT', () => {
    gracefulShutdown('SIGINT');
});

let gracefulShutdown = (type) => {
    logger.info('Received kill signal shutting down gracefully by ' + type);
    server.close(() => {
        logger.info('Closed out remaining connections');
        process.exit();
    });

    setTimeout(() => {
        logger.info('Could not close connections in time, forcefully shutting down');
        process.exit();
    }, 3 * 1000)
};
//==========================================================================
