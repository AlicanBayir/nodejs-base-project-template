'use strict';

const moment = require('moment');

class  DateHelper {

    getFormattedDate() {
        return moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
    }
}

module.exports = DateHelper;
