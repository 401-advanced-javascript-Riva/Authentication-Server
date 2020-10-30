'use strict';

const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const bearerAuth  = require('../../middleware/bearer');
const asyncWrapper = require('../../middleware/asyncWrapper');
const validateUser = require('../../middleware/authorize');
const Users = require('../models/user/user-schema');


router.get('/secret', bearerAuth, asyncWrapper(async(req,res, next) => {
    console.log('getting route secret')
    //bearer auth assigns user to the response object
    await res.status(200).json(res.user);
}));

router.get('/read', bearerAuth, validateUser, asyncWrapper(async(req, res, next) => {
    
}));

router.post('/add', bearerAuth, validateUser, asyncWrapper(async(req, res) => {
    const { username , password } = req.body;
      if(!username || ! password) {
        res.status(400).json({ error: 'please enter the correct fields'})
    } 
    if(password !== confirmedPassword) {
        res.status(400).json({ error: "passcodes do not match" })
    }
    const user = await Users.create({
        username, 
        password,
        role: user
    })
    const token = await basicAuth(user);
    console.log('user in add route', user);
    res.status(201).json(token);
    console.log('token in add route', token);
}));

router.put('/change', bearerAuth, validateUser, asyncWrapper(async(req, res, next) => {

}));

router.delete('/remove', bearerAuth, validateUser, asyncWrapper(async(req, res, next) => {

}));


module.exports = router;