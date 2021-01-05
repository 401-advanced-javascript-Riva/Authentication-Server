'use strict';

const jwt = require("jsonwebtoken");
/**
 * This middleware function is generating a token using JWT and mongoose set() prototype
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */

const basicAuth = async (req, res, next) => {
    const username = req.body.username;
    const user = { name: username }
    const accessToken = await jwt.sign( user, process.env.JWT_SECRET, { expiresIn: '30m'});
    const refreshToken = await jwt.sign( user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30m'});
    res.set({ accessToken, refreshToken});
    next();
};
module.exports = basicAuth;



