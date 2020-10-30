'use strict';

const UsersSchema = require('../auth/models/user/user-schema');
const UserModel = require('../auth/models/user/user-model');

module.exports = async function bearerAuth(req, res, next) {
    /*
     - get token that is sent, verify it is the correct user and then return user in function in post
     - token comes from the header
     - format is bearer, followed by token
     */
    const authHeader = req.headers['authorization'];
    //space between bearer and token so I have to split it
    //if I have an authHeader, return authHeader token portion
    if (authHeader) {
        const jwtToken = authHeader && authHeader.split(' ')[1];
        try {
            console.log('calling users.validateToken')
            const token = await UsersSchema.statics.validateToken(jwtToken);
            //username is imbedded in token, so I can see username in token
            //I need to use this token to fetch user data
            const result = await UserModel.find({ username: token.username })
            res.user = result[0];
            res.role = token.role;
            console.log('bearer calling next', next);
            next();
        } catch (error) {
            //the value is serialized, and 403 tells the user they do not have a valid token
            return res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
}