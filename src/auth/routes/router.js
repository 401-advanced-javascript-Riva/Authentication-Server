'use strict';
const express = require('express');
const router = express.Router();
const asyncWrapper = require('../../middleware/asyncWrapper');
const bcrypt = require('bcrypt');
const Users = require('../models/user');
const jwt = require("jsonwebtoken");


router.post('/signup', asyncWrapper(async (req, res) => {
    const result = await Users.find({ name: req.body.name })
    .exec()
    if(user.length >= 1) {
        return res.status(409).json({
            message: 'Name exists'
        });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        })
    }
}));



router.post('/signin', asyncWrapper(async (req, res) => {
    //passing in middleware in route and send json
    ///create middleware basic auth
    const username = req.body.username;
    const user = { name: username }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken : accessToken });
}));



router.get('/users', asyncWrapper(async (req, res) => {
const user = users.find(user => user.name = req.body.name);
if (user === null) {
    return res.status(400).send('Unable to find user')
}
    //comparison for password
    //pass it the intial password and then hashed password
    //This will compare and get salt and make sure hashed version equals the same thing
    if (await bcrypt.compare(req.body.password, user.password)) {
        //will return true or false
        //if it is true then user is logged in
        res.send('Success');
    } else {
        //if passwords are not the same, then this will happen
        res.send('Not Allowed');
    }
return res.status(500).send()

}));