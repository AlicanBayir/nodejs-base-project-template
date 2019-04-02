'use strict';
const winston = require('winston');
const fs = require('fs');
const path = require('path');
const LoggerHandler = require('./logger-handler');

class FileLoggerHandler extends LoggerHandler {

    configureLogger(transports) {
        if (loggerConf.logger.fileLogEnable) {
            transports.push(new winston.transports.File({
                filename: path.join(loggerConf.logger.path, loggerConf.logger.fileName),
                level: loggerConf.logger.fileLevel,
                maxFiles: loggerConf.logger.maxFiles,
                maxsize: loggerConf.logger.maxSize,
                options: {encoding: 'utf8'},
                tailable: true,
                zippedArchive: true
            }))
            this.existFile(loggerConf.logger.path);
        }
    }

    existFile(logPath) {
        if (!fs.existsSync(logPath)) {
            fs.mkdirSync(logPath);
        }
    }
}

module.exports = FileLoggerHandler;
