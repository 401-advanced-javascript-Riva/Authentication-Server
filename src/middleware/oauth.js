'use strict'
const Users = require('../auth/models/user/user-model');
const oauthUtils = require('../lib/oauth-startercode');
const superagent = require('superagent');
const tokenServerUrl = process.env.TOKEN_SERVER_URL;
const remoteAPI = process.env.REMOTE_API;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;


module.exports = async (req, res, next) => {
    //redirect has taken place and I have a code from the oauth provider
   console.log('oauth middleware', req.query.code);
   try {
    const access_token = await exchangeCodeForToken(req.query.code);
    console.log('access token', access_token);
    //getting user info from the oauth provider
    const userInfo = await getRemoteUserInfo(access_token);
    console.log('user in getremoteuserinfo', userInfo)
    //get my user info based on the id from the oauth provider
    const { user, token } = await getUser(userInfo);
    console.log('setting request user', user);
    req.user = user;
    req.token = token;
    next();
    }catch (e){
    res.status(404).send(e.message);
  }
};
/*
-taking code from Wordpress that is associated with the user and exchanging it for access token
-I have the code so I am asking Wordpress for the token that gives us login abilites of user
-If Wordpress validates code, it will give us access token similar to the toke the user gets
*/
async function exchangeCodeForToken(code) {
const tokenRequest = {
    code: code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code',
  }
    const tokenResponse = await superagent.post(tokenServerUrl).type('form').send(tokenRequest)
    let access_token = tokenResponse.body.access_token;
  
    return access_token;
  }
/* 
- Now I am 'logged in' to Wordpress as the user
- I can now access the user info, but tell them I want access to "my" account using Bearer token
- I have the bearer token that makes me 'logged in' as user
*/
  async function getRemoteUserInfo(token) {
    let userResponse =
      await superagent.get(remoteAPI)
        .set('user-agent', 'express-app')
        .set('Authorization', `Bearer ${token}`)
  
    let user = userResponse.body;
    return user;
  }
/*
- Here I am retrieving an account from our Mongo users database matching the user’s account 
  using the users model
- remoteUser is the Wordpress user object
- I am using this to find cooresponding user in my db
  */

  async function getUser(remoteUser) {
    let userRecord = {
        wordpressid: remoteUser.ID
    }
    let user = await Users.find(userRecord);
    console.log('get user found users', user);
    let token = await Users.generateToken(user[0]);
    console.log('got token', token);
    return { user, token };
  }
