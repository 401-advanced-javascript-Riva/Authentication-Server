'use strict';

const jwt = require("jsonwebtoken");
const bearerAuth  = require('../../middleware/bearer');
const express = require('express');
const router = express.Router();
const asyncWrapper = require('../../middleware/asyncWrapper');
const validateUser = require('../../middleware/authorize');


router.get('/secret', bearerAuth, asyncWrapper(async(req,res, next) => {
    console.log('getting route secret')
    //bearer auth assigns user to the response object
    await res.status(200).json(res.user);
}));

router.get('/read', bearerAuth, validateUser, asyncWrapper(async(req, res, next) => {

}));

router.post('/add', bearerAuth, validateUser, asyncWrapper(async(req, res) => {

}));

router.put('/change', bearerAuth, validateUser, asyncWrapper(async(req, res, next) => {

}));

router.delete('/remove', bearerAuth, validateUser, asyncWrapper(async(req, res, next) => {

}));


module.exports = router;