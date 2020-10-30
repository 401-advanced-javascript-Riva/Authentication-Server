'use strict';

const jwt = require('jsonwebtoken');
const Users = require('../auth/models/user/user-model');
const UsersSchema = require('../auth/models/user/user-schema');



 //this function handles different roles assigned to user
 //this is a function that returns a function
const validateUser = (role = [capabilites]) => async function(req, res, next) {
    console.log('role in validateUser', role);
    console.log('capabilites array', capabilities);
    const authorization = req.headers['authorization'];
    if(!authorization || !authorization.startsWith('Bearer')) {
        return res.status(401).end();
    }
    //if they pass the checks
    const token = authorization.split('Bearer')[1].trim();
    let dataInToken;
    try {
        dataInToken = await verifyToken(token);
    }catch (error){
        return res.status(401).end();
    }
    //not selecting password
    //lean returns json data
    //exec is good practice with mongoose, docs say to use it
    const user = await UsersSchema.findById(dataInToken.id)
      .select('-password')
      .lean()
      .exec();
    if(!user) {
        return res.status(401).end();
    }
    if(!role.includes(user.role)) {
        return res.status(401).end();
    }
    req.user = user;
    //changing passcode or email, user is on body of request
    next();
}
module.exports = validateUser;