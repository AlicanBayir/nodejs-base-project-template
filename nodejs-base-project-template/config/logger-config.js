'use strict';

class LoggerConfig {

}

LoggerConfig.winstonLevels = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
};
LoggerConfig.winstonColors = {
    debug: 'green',
    info: 'cyan',
    silly: 'magenta',
    warn: 'yellow',
    error: 'red'
};
LoggerConfig.logger = {
    consoleLogEnable: true,
    consoleLevel: "silly",
    fileLogEnable: true,
    path: "logs",
    fileLevel: "info",
    fileName: "log_file",
    maxSize: 1024 * 1024 * 5,
    maxFiles: 30,
};

module.exports = LoggerConfig;
