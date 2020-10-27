'use strict'

const mongoose = require('mongoose');
const UsersSchema = require('./user-schema');


const Users = mongoose.model('UserModel', UsersSchema);

module.exports = UserModel;