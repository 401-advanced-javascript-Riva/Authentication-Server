'use strict';
const express = require('express');
const router = express.Router();
const asyncWrapper = require('../../middleware/asyncWrapper');
const bcrypt = require('bcrypt');
const Users = require('../models/user/user-model');
const jwt = require("jsonwebtoken");
const basicAuth = require('../../middleware/basic');

router.post('/signup', asyncWrapper(async (req, res) => {
    console.log('body of signup request', req.body);
    const user = new Users({
                username: req.body.username,
                password: req.body.password
            })
            await user.save();
            return res.json({
                user: req.user,
                message: 'Signup Successful!'
            });
}));

router.post('/signin', basicAuth, asyncWrapper(async (req, res) => {
    return res.json({});
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