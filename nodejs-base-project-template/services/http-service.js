'use strict';
const rp = require('request-promise');

class HttpService {

    async postAsyncJson(requestOptions) {
        const options = {
            uri: requestOptions.url,
            method: 'POST',
            json: requestOptions.params,
            resolveWithFullResponse: true
        };
        handleGenericOptions(requestOptions, options);
        return await makeRequestPostAsync(options);
    }

    async getAsyncJson(requestOptions) {
        const options = {
            uri: requestOptions.url,
            method: 'GET',
            json: requestOptions.params,
            resolveWithFullResponse: true
        };
        handleGenericOptions(requestOptions, options);
        return await makeRequestGetAsync(options);
    }
}

function handleGenericOptions(requestOptions, options) {
    if (requestOptions.hasOwnProperty('auth')) {
        options.auth = requestOptions.auth;
    }
    options.timeout = requestOptions.timeout || conf.defaultRequestTimeOut;
}

function makeRequestPostAsync(options) {
    return rp.post(options);
}

async function makeRequestGetAsync(options) {
    let response = await rp.get(options);
    let result = {response: response.body, statusCode: response.statusCode};
    return result;
}

module.exports = HttpService;
