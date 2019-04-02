'use strict';
const LoggerHandler = require('./logger-handler');
const winston = require('winston');

class ConsoleLoggerHandler extends LoggerHandler {

    configureLogger(transports) {
        if (loggerConf.logger.consoleLogEnable) {
            winston.addColors(loggerConf.winstonColors);
            transports.push(new winston.transports.Console({
                level: loggerConf.logger.consoleLevel,
                format: winston.format.combine(
                    winston.format.colorize({all: true}))
            }))
        }
    }
}

module.exports = ConsoleLoggerHandler;
