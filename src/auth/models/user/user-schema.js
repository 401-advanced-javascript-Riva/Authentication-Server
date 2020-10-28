'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Create a schema structure
const UsersSchema = new mongoose.Schema({
    // When this is stored, each obj in array will be key value pair
        // The key will be the index and the value will be the string
        username: { type: String, unique : true },
        password: { type: String }
    });
//built in mongo method of pre
//pre-save hook from mongoose is middleware that is executed when a document is saved
UsersSchema.pre('save', async function () {
    var user = this;

    // only hash the password if it has been modified (or is new)
    //if password is modified, wrap all in if statement
    if (user.isModified('password')) {
         // generate a salt
    const salt = await bcrypt.genSalt(process.env.SALT)
    // hash the password along with our new salt
    const hash = bcrypt.hash(user.password, salt)
    // override the cleartext password with the hashed one
    user.password = hash;
    }
});

UsersSchema.statics.authenticateBasic = async function(username, password) {
    const user = Users.find({ 'username': username });
    console.log('authenticate user creditials', user);
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
    return res.status(500).send()
    //return res.status(500).json(user);

}
UsersSchema.statics.validateToken = async function(jwtToken) {

        const token = await jwt.verify(jwtToken, process.env.JWT_SECRET);
        console.log('validating token' , token)
        return token;

}
  module.exports = UsersSchema;
