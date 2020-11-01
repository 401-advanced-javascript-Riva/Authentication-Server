'use strict';

const superagent = require('superagent');
const users = require('../auth/models/user/user-model');

/*
  Resources
  https://developer.github.com/apps/building-oauth-apps/
*/

const tokenServerUrl = process.env.TOKEN_SERVER_URL;
const remoteAPI = process.env.REMOTE_API;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_SERVER = process.env.API_SERVER;

module.exports = async function authorize(req, res, next) {

  try {
    let code = req.query.code;
    console.log('(1) CODE:', code);

    let remoteToken = await exchangeCodeForToken(code);
    let remoteUser = await getRemoteUserInfo(remoteToken);

    let [user, token] = await getUser(remoteUser);
    req.user = user;
    req.token = token;

    next();
  } catch (e) { next(`ERROR: ${e.message}`) }
}

  async function getUser(remoteUser) {
    let userRecord = {
      username: remoteUser.login,
      password: 'oauthpassword'
    }
    let user = await users.save(userRecord);
    let token = users.generateToken(user);
  
    return [user, token];
  
  }
