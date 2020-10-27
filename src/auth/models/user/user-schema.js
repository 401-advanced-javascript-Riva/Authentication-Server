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
        bcrypt.genSalt(proces.env.SALT_WORK_FACTOR, (err, salt) => {
            if (err) return next(err);

            // hash the password along with our new salt
            bcrypt.hash(user.password, salt, (err, hash)  => {
                if (err) return next(err);

                // override the cleartext password with the hashed one
                user.password = hash;
                next();
            });
        });
    });
 module.exports = UsersSchema;
