'use strict'

const jwt = require("jsonwebtoken");

module.exports = function tokenAuthentication(req, res, next) {
    //get token that is sent, verify it is the correct user and then return user in function in post
    //token comes from the header
    //format is bearer, followed by token
    const authHeader = req.headers['authorization'];
    //space between bearer and token so I have to split it
    //if I have an authHeader, return authHeader token portion
    const token = authHeader && authHeader.split(' ')[1];
    //return to user an error
    if (token == null) return res.sendStatus(401);

    //verify token by passing in token and secret
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        //the value is serialized, and 403 tells the user they do not have a valid token
        if(err) return res.sendStatus(403);
        //set user on request
        req.user = user;
        next();
    })
}