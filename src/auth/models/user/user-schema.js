'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Create a schema structure
const UsersSchema = new mongoose.Schema({
    // When this is stored, each obj in array will be key value pair
    // The key will be the index and the value will be the string
    // Unique true just means DB can't have multiple entries with same value
    wordpressid: { type: Number, unique: true },
    username: { type: String, unique : true },
    password: { type: String },
    role: { type: String , required: true, enum: [ 'user', 'admin', 'editor', 'user']}
});

// Map of roles to capabilities assigned to token that we give client
UsersSchema.statics.capabilities = {
    admin: [ 'read', 'create', 'update', 'delete'],
    writer: ['read', 'create'],
    editor: ['read', 'update'],
    user: ['read']
}

// Built in mongo method of pre
// Pre-save hook from mongoose is middleware that is executed when a document is saved
UsersSchema.pre('save', async function () {
    var user = this;

    // Only hash the password if it has been modified (or is new)
    //If password is modified, wrap all in if statement
    if (user.isModified('password')) {
        // Generate a salt
        const salt = await bcrypt.genSalt(10)
        // Hash the password along with our new salt
        const hash = bcrypt.hash(user.password, salt)
        // Override the cleartext password with the hashed one
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

