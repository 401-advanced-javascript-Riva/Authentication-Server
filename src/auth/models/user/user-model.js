'use strict'

const mongoose = require('mongoose');
const UsersSchema = require('./user-schema');


const users = mongoose.model('users', UsersSchema);