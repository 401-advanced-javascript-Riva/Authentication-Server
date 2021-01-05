'use strict'

const Users = require('../auth/models/user/user-model');
const superagent = require('superagent');
const tokenServerUrl = process.env.TOKEN_SERVER_URL;
const remoteAPI = process.env.REMOTE_API;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

/**
 * This function is the oauth middleware
 * By now, the redirect has taken place and I have the code from the oauth provider
 * Now I can get user information based on the id from the oauth provider
 * @param {Objects} req 
 * @param {Object} res 
 * @param {Callback} next 
 */
module.exports = async (req, res, next) => {
    // Redirect has taken place and I have a code from the oauth provider
    try {
        const access_token = await exchangeCodeForToken(req.query.code);
        // Getting user info from the oauth provider
        const userInfo = await getRemoteUserInfo(access_token);
        // Get my user info based on the id from the oauth provider
        const { user, token } = await getUser(userInfo);
        req.user = user;
        req.token = token;
        next();
    } catch (e){
        res.status(404).send(e.message);
    }
};

/**
 * This function takes the code from Wordpress that is associated with the user and exchanges it for access token.
 * I have the code so I am asking Wordpress for the token that gives us login abilites of user.
 * If Wordpress validates code, it will give us access token similar to the toke the user gets
 * @param {String} code 
 */ 
const exchangeCodeForToken = async code => {
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
};

/**
 * This function provides access to to the user information
 * By this stage, I have the bearer token that makes me 'logged in as user' to Wordpress
 * @param {String} token 
 */
const getRemoteUserInfo = async token => {
    let userResponse = await superagent.get(remoteAPI)
        .set('user-agent', 'express-app')
        .set('Authorization', `Bearer ${token}`)
    let user = userResponse.body;
    return user;
};

 /**
  * This function retrieves an account from my Mongo users DB matching the user's account
  * This function uses the remoteUser object to find the corresponding user in the DB
  * @param {Object} remoteUser 
  */
const getUser = async remoteUser => {
    let userRecord = {
        wordpressid: remoteUser.ID
    }
    let user = await Users.find(userRecord);
    let token = await Users.generateToken(user[0]);
    return { user, token };
};
