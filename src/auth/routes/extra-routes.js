'use strict';

const jwt = require("jsonwebtoken");
const bearerAuth  = require('../../middleware/bearer');
const express = require('express');
const router = express.Router();
const asyncWrapper = require('../../middleware/asyncWrapper');

router.get('/secret', bearerAuth, asyncWrapper(async(req,res, next) => {
    console.log('getting route secret')
    await res.status(200).json({
        messages: "all messages"
    })
}));

module.exports = router;