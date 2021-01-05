'use strict';

const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const bearer  = require('../../middleware/bearer');
const asyncWrapper = require('../../middleware/asyncWrapper');
const validateUser = require('../../middleware/authorize');
const oAuth = require('../../middleware/oauth')
const Users = require('../models/user/user-model');

router.get('/secret', bearer.bearerAuth, asyncWrapper(async(req,res, next) => {
    // Bearer auth assigns user to the response object
    await res.status(200).json(res.user);
}));

router.get('/read', bearer.bearerAuth, validateUser('read'), asyncWrapper(async(req, res, next) => {
    const users = await Users.find({}).select('-password').lean().exec();
    res.status(200).json({data: users});
}));

router.get('/oauth',  oAuth, asyncWrapper(async(req, res, next)=> {
  await res.status(200).json( { user: req.user , token: req.token });
}))

router.post('/add', bearer.bearerAuth, validateUser('create'), asyncWrapper(async(req, res) => {
    const { username , password } = req.body;
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
    res.status(201).json(token);
}));

router.put('/change/:id', bearer.bearerAuth, asyncWrapper(async(req, res, next) => {
    const entry =  await Users.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    if (entry === null) {
       return null;
    }
    await entry.save();
    res.json(entry);
}));

router.delete('/remove/:id', bearer.bearerAuth, validateUser('delete'), asyncWrapper(async(req, res, next) => {
    const entry =  await Users.findByIdAndDelete(req.params.id);
    if ( entry === null) {
       return null;
    }
}));

module.exports = router;