'use strict';
const express = require('express');
const router = express.Router();
const asyncWrapper = require('../../middleware/asyncWrapper');


router.post('/signup', asyncWrapper(async (req, res) => {
    // required in user model
    //new user with req.model
    //save()
}));

router.post('/signin', asyncWrapper(async (req, res) => {
    //passing in middleware in route and send json
    ///create middleware basic auth
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