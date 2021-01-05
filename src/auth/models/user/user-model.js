'use strict'

const mongoose = require('mongoose');
const UsersSchema = require('./user-schema');
const jwt = require('jsonwebtoken');

const Users = mongoose.model('UserModel', UsersSchema);

Users.authenticateBasic = async function(username, password) {
    const user = await Users.find({ 'username': username });
    if (user === null) {
        return res.status(400).send('Unable to find user')
    }
    // This will compare and get salt and make sure hashed version equals the same thing
    if (await bcrypt.compare(password, user.password)) {
        // Will return true or false
        // If it is true then user is logged in
        res.send('Success');
    } else {
        // If passwords are not the same
        res.send('Not Allowed');
    }
    return res.status(500).send();
};

Users.generateToken = async function(userData) {
  const user = { name: userData.username }
  const accessToken = await jwt.sign( user, process.env.JWT_SECRET, { expiresIn: '30m'});
  return accessToken;
};

module.exports = Users;