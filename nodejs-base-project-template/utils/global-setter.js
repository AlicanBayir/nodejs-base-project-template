'use strict';
const LoggerChain = require('./logger/logger-chain');

global.conf = require('../config/config');
global.errorConst = require('../constants/error-constants');
global.appConst = require('../constants/app-constants');
global.loggerConf = require('../config/logger-config');
global.logger = new LoggerChain().getLogger();

