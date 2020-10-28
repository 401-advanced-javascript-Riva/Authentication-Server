'use strict';

const jwt = require("jsonwebtoken");
const bearerAuth  = require('../../middleware/bearer');
const express = require('express');
const router = express.Router();
const asyncWrapper = require('../../middleware/asyncWrapper');

router.get('/secret', bearerAuth, asyncWrapper(async(req,res, next) => {
    console.log('getting route secret')
    //bearer auth assigns user to the response object
    await res.status(200).json(res.user);
}));

module.exports = router;