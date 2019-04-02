'use strict';
const winston = require('winston');
const DateHelper = require('../date-helper');
const dateHelper = new DateHelper();

class LoggerHandler {

    constructor() {
     this.transports = [];
    }

    setNextLogger(nextLogger) {
        this.nextLogger = nextLogger;
    }

    loggerProcessor() {
        if(this.nextLogger) {
            this.nextLogger.configureLogger(this.transports);
            this.nextLogger = this.nextLogger.nextLogger;
            this.loggerProcessor();
        }
    }

    getLogger() {
        let logger = winston.createLogger({
            levels: loggerConf.winstonLevels,
            format: winston.format.printf(info => `${dateHelper.getFormattedDate()} [${info.level}] ${info.message}`),
            transports: this.transports
        });
        return logger;
    }
}

module.exports = LoggerHandler;
