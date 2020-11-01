'use strict'

const oauthUtils = require('../lib/oauth-startercode');
const superagent = require('superagent');
const tokenServerUrl = process.env.TOKEN_SERVER_URL;
const remoteAPI = process.env.REMOTE_API;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;


module.exports = async (req, res, next) => {
   console.log('oauth middleware', req.query.code);
   try {
    const access_token = await exchangeCodeForToken(req.query.code);
    console.log('access token', access_token);
    const userInfo = await getRemoteUserInfo(access_token);
    next();
    }catch (e){
    res.status(404).send(e.message);
  }
};

async function exchangeCodeForToken(code) {
const tokenRequest = {
    code: code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code',
  }
    console.log('Token request from exhangecodefortoken' ,tokenRequest)
  
    console.log('what is token server url in token response', tokenServerUrl);
    const tokenResponse = await superagent.post(tokenServerUrl).type('form').send(tokenRequest)
    let access_token = tokenResponse.body.access_token;
  
    return access_token;
 
  }

  async function getRemoteUserInfo(token) {
  
    let userResponse =
      await superagent.get(remoteAPI)
        .set('user-agent', 'express-app')
        .set('Authorization', `Bearer ${token}`)
  
    let user = userResponse.body;
    console.log('user in getremoteuserinfo', user)
    return user;
  
  }