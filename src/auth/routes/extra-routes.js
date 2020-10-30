'use strict';

const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const bearerAuth  = require('../../middleware/bearer');
const asyncWrapper = require('../../middleware/asyncWrapper');
const validateUser = require('../../middleware/authorize');
const Users = require('../models/user/user-model');
const UsersSchema = require("../models/user/user-schema");


router.get('/secret', bearerAuth, asyncWrapper(async(req,res, next) => {
    console.log('getting route secret')
    //bearer auth assigns user to the response object
    await res.status(200).json(res.user);
}));

router.get('/read', bearerAuth, validateUser('read'), asyncWrapper(async(req, res, next) => {
    const users = await Users.find({}).select('-password').lean().exec();
    res.status(200).json({data: users});
}));

router.post('/add', bearerAuth, validateUser('create'), asyncWrapper(async(req, res) => {
    const { username , password } = req.body;
    console.log('add route running', req.body);
      if(!username || ! password) {
        res.status(400).json({ error: 'please enter the correct fields'})
    } 
    if(password !== confirmedPassword) {
        res.status(400).json({ error: 'passcodes do not match' })
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

router.put('/change/:id', bearerAuth, asyncWrapper(async(req, res, next) => {
    const entry =  await Users.findByIdAndUpdate(req.params.id, req.body, {
        //telling Mongo to return updated version of the data
        new: true
    });
    if (entry === null) {
       return null;
    }
    // after we update the doc we want to save it
    await entry.save();
    res.json(entry);
}));

router.delete('/remove/:id', bearerAuth, validateUser('delete'), asyncWrapper(async(req, res, next) => {
    const entry =  await Users.findByIdAndDelete(req.params.id);
    if ( entry === null) {
       return null;
    }
}));


module.exports = router;