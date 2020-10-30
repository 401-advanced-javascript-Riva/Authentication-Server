'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//Create a schema structure
const UsersSchema = new mongoose.Schema({
    // When this is stored, each obj in array will be key value pair
        // The key will be the index and the value will be the string
        username: { type: String, unique : true },
        password: { type: String },
        role: { type: String , required: true, enum: [ 'user', 'admin', 'editor', 'user']}
    });
//map of roles to capabilities assigned to token that we give client
UsersSchema.statics.capabilities = {
    admin: [ 'read', 'create', 'update', 'delete'],
    writer: ['read', 'create'],
    editor: ['read', 'update'],
    user: ['read']
}

//built in mongo method of pre
//pre-save hook from mongoose is middleware that is executed when a document is saved
UsersSchema.pre('save', async function () {
    var user = this;

    // only hash the password if it has been modified (or is new)
    //if password is modified, wrap all in if statement
    if (user.isModified('password')) {
         // generate a salt
    const salt = await bcrypt.genSalt(10)
    // hash the password along with our new salt
    const hash = bcrypt.hash(user.password, salt)
    // override the cleartext password with the hashed one
    user.password = hash;
    }
});

UsersSchema.statics.validateToken = async function(jwtToken) {
        try {
            const token = await jwt.verify(jwtToken, process.env.JWT_SECRET);
            return token;
        }catch (error) {
            res.send(error)
        }
       

}
  module.exports =  UsersSchema; 

