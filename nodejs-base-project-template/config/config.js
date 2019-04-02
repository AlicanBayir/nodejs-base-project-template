'use strict';

class Config {

}

Config.port = process.env.PORT || 8000;
Config.defaultRequestTimeOut = 10000;

module.exports = Config;
