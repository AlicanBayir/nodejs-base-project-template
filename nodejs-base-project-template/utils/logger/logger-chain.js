'use strict';
const LoggerHandler = require('./logger-handler');
const ConsoleLoggerHandler = require('./console-logger-handler');
const FileLoggerHandler = require('./file-logger-handler');

class LoggerChain {

    constructor() {
        this.logger = new LoggerHandler();
        let fileLogger = new FileLoggerHandler();
        let consoleLogger = new ConsoleLoggerHandler();
        this.logger.setNextLogger(consoleLogger);
        consoleLogger.setNextLogger(fileLogger);
        fileLogger.setNextLogger(null);
        this.logger.loggerProcessor();
    }

    getLogger() {
       return this.logger.getLogger();
    }
}

module.exports = LoggerChain;
