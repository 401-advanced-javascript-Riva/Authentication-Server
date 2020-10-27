'use strict'

const mongoose = require('mongoose');


//Create a schema structure
const UsersSchema = new mongoose.Schema({
    // When this is stored, each obj in array will be key value pair
        // The key will be the index and the value will be the string
        username: { type: String, unique : true },
        password: { type: String }
    });


 module.exports = UsersSchema;
