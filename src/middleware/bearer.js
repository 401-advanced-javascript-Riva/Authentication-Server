'use strict';

const Users = require('../auth/models/user/user-model');

module.exports = async function bearerAuth(req, res, next) {
    console.log('bearerAuth');
    /*
     - get token that is sent, verify it is the correct user and then return user in function in post
     - token comes from the header
     - format is bearer, followed by token
     */
    const authHeader = req.headers['authorization'];
    console.log('authHeader', authHeader);
    //space between bearer and token so I have to split it
    //if I have an authHeader, return authHeader token portion
    if (authHeader) {
        const jwtToken = authHeader && authHeader.split(' ')[1];
        console.log('jwttoken', jwtToken);
        try {
            const token = await Users.validateToken(jwtToken);
            console.log('is this the token', token);
            //username is imbedded in token, so I can see username in token
            //I need to use this token to fetch user data
            const result = await Users.find({ username: token.name })
            res.user = result;
            next();
        } catch {
            //the value is serialized, and 403 tells the user they do not have a valid token
            return res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
}