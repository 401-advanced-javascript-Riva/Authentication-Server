'use strict';

const Users = require('../auth/models/user/user-model');
const UsersSchema = require('../auth/models/user/user-schema');

 /**
  * This function handles different roles assigned to user. If the user has the requested capability
  * the user will be attached to request object. If not, a 401 is returned
  * @param {String} capability The user capability that I am checking against the user
  */
const validateUser = capability => async (req, res, next) => {
    const capabilities = UsersSchema.statics.capabilities[res.role];
    const authorization = req.headers['authorization'];
    if(!authorization || !authorization.startsWith('Bearer')) {
        return res.status(401).end();
    }
    // Not selecting password
    // Lean returns json data
    // Exec is good practice with mongoose, docs say to use it
    const user = await Users.findById(res.user._id)
      .select('-password')
      .lean()
      .exec();
    if(!user) {
        return res.status(401).send('User not found');
    }
    if(!capabilities.includes(capability)) {
        return res.status(401).send('User ' + res.user.username + ' does not have permission to ' + capability);
    }
    req.user = user;
    // Changing passcode or email, user is on body of request
    next();
};

module.exports = validateUser;