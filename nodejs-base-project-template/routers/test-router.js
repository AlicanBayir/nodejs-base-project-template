'use strict';

const express = require('express');
const router = express.Router();
const TestService = require('../services/test-service');
const testService = new TestService();

router.get('/', async (req, res, next) => {
    try {
        logger.info("TEST_ROUTER_GET_REQUEST_RECEIVED");
        res.success('TEST_GET_SUCCESS', '', null);
    } catch (err) {
        logger.error("TEST_ROUTER_GET_REQUEST_ERROR");
        next(new Error(err.message));
    }

});

module.exports = router;
