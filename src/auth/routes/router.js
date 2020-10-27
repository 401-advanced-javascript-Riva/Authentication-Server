'use strict';
const express = require('express');
const router = express.Router();
const asyncWrapper = require('../../middleware/asyncWrapper');
const bcrypt = require('bcrypt');
const Users = require('../models/user/user-model');
const jwt = require("jsonwebtoken");
const basicAuthentication = require('../../middleware/basic');

router.post('/signup', asyncWrapper(async (req, res) => {
    const user = new Users({
                username: req.body.name,
                password: hash
            })
            await user.save();
            return res.json({
                user: req.user,
                message: 'Signup Successful!'
            });
}));

router.post('/signin', basicAuthentication, asyncWrapper(async (req, res) => {
    const username = req.body.username;
    const user = {
        name: username
    }
    const accessToken = await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    return res.json({
        accessToken: accessToken
    });
}));

router.get('/users', asyncWrapper(async (req, res) => {
    const users = Users.find({});
    if (user === null) {
        return res.status(400).send('Unable to find user')
    } else {
        return users;
    }

}));

module.exports = router;