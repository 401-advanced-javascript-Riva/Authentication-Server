'use strict';
const express = require('express');
const router = express.Router();
const asyncWrapper = require('../../middleware/asyncWrapper');
const bcrypt = require('bcrypt');
const Users = require('../models/user/user-model');
const jwt = require("jsonwebtoken");
const basicAuth = require('../../middleware/basic');

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

router.post('/signin', basicAuth, asyncWrapper(async (req, res) => {
    // const username = req.body;
    // const user = { name: username }
    const accessToken = await jwt.sign( process.env.JWT_SECRET, { expiresIn: '30m'});
    let refreshToken = await jwt.sign( process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30m'});
    return res.json({
        accessToken: accessToken,
        refreshToken: refreshToken
    });
}));

// app.post('/token', (req, res) => {
//     const { token } = req.body;
//      if (!token) {
//         return res.sendStatus(401);
//     }
//     if (!refreshTokens.includes(token)) {
//         return res.sendStatus(403);
//     }
//     jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//         if (err) {
//             return res.sendStatus(403);
//         }
//          const accessToken = jwt.sign({ username:  }, accessTokenSecret, { expiresIn: '20m' });
//         res.json({
//             accessToken
//         });
//     });

router.get('/users', asyncWrapper(async (req, res) => {
    const users = Users.find({});
    if (user === null) {
        return res.status(400).send('Unable to find user')
    } else {
        return users;
    }

}));

module.exports = router;