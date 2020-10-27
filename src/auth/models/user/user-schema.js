'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


//Create a schema structure
const UsersSchema = new mongoose.Schema({
    // When this is stored, each obj in array will be key value pair
        // The key will be the index and the value will be the string
        username: { type: String, unique : true },
        password: { type: String }
    });
//built in mongo method of pre
UsersSchema.pre('save', async function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    const salt = await bcrypt.genSalt(SALT);
    // hash the password along with our new salt
    const hash = bcrypt.hash(user.password, salt)
    // override the cleartext password with the hashed one
    user.password = hash;
    next();
});

 module.exports = UsersSchema;
