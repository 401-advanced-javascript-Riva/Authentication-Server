'use strict';
const express = require('express');
const router = express.Router();
const asyncWrapper = require('../../middleware/asyncWrapper');
const basicAuth = require('../../middleware/basic');
const Collections = require('../models/user/mongo');
const UsersSchema = require('../models/user/user-schema');

const userCollection = new Collections('Users', UsersSchema);

router.post('/signup', asyncWrapper(async (req, res) => {
    console.log('body of signup request', req.body);
    const user = {
                username: req.body.username,
                password: req.body.password
                }
            await userCollection.create(user);
            return res.json({
                user: req.user,
                message: 'Signup Successful!'
            });
}));

router.post('/signin', basicAuth, asyncWrapper(async (req, res) => {
    return res.json({});
}));

router.get('/users', asyncWrapper(async (req, res) => {
    const users = userCollection.readAll();
    if (users === null) {
        return res.status(400).send('Unable to find user')
    } else {
        return res.json(users);
    }

}));

module.exports = router;