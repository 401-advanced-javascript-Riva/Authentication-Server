'use strict'

const mongoose = require('mongoose');
const UsersSchema = require('./user-schema');
const jwt = require('jsonwebtoken');

const Users = mongoose.model('UserModel', UsersSchema);

Users.authenticateBasic = async function(username, password) {
    // const encodedString = req.headers.authorization.split(' ')[1];
    // const decodedString = base64.decode(encodedString);
    //  decodedString.split(' : ');
    const user = await Users.find({ 'username': username });
    if (user === null) {
        return res.status(400).send('Unable to find user')
    }
    //comparison for password
    //pass it the intial password and then hashed password
    //This will compare and get salt and make sure hashed version equals the same thing
    if (await bcrypt.compare(password, user.password)) {
        //will return true or false
        //if it is true then user is logged in
        res.send('Success');
    } else {
        //if passwords are not the same, then this will happen
        res.send('Not Allowed');
    }
    console.log('user model throwing a 500')
    return res.status(500).send()
    //return res.status(500).json(user);

}

Users.generateToken = async function(userData) {
    console.log('get user found user Data', userData);
    const user = { name: userData.username }
    const accessToken = await jwt.sign( user, process.env.JWT_SECRET, { expiresIn: '30m'});
    return accessToken;
}
module.exports = Users;