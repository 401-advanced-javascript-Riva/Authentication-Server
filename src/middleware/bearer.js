'use strict';

const UsersSchema = require('../auth/models/user/user-schema');
const UserModel = require('../auth/models/user/user-model');

const bearerAuth = async (req, res, next) => {
  // Get token that is sent, verify it is the correct user and then return user in function in post
  const authHeader = req.headers['authorization'];
  // Space between bearer and token so I have to split it
  // If I have an authHeader, return authHeader token portion
  if(authHeader) {
    const jwtToken = authHeader && authHeader.split(' ')[1];
      try {
          const token = await UsersSchema.statics.validateToken(jwtToken);
          const result = await UserModel.find({ username: token.username })
          res.user = result[0];
          res.role = token.role;
          next();
      } catch (error) {
          // The value is serialized, and 403 tells the user they do not have a valid token
          return res.sendStatus(403);
      };
    } else {
      res.sendStatus(401);
    }
};

module.exports = { bearerAuth };