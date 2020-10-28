'use strict'

const jwt = require("jsonwebtoken");


module.exports = async function basicAuth(req, res, next) {

    const username = req.body.username;
    const user = { name: username }
    const accessToken = await jwt.sign( user, process.env.JWT_SECRET, { expiresIn: '30m'});
    const refreshToken = await jwt.sign( user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30m'});
    res.set({ accessToken, refreshToken});
    next();
        // const token = req.headers['token'];
        // console.log('access token', token);
        // if (!token) return res.status(401).json({ message: "Authorization Error" });
        // try {
        //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //   console.log('decoding'. decoded);
        //   req.user = decoded.user;
        //   next();
        // } catch (err) {
        //   res.status(500).send({ message: "Invalid Token" });
        // }

}

