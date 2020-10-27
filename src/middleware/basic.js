'use strict'

const jwt = require("jsonwebtoken");
const base64 = require('base-64');

module.exports = async function basicAuthentication(err, req, res, next) {
        const token = req.header("token");
        if (!token) return res.status(401).json({ message: "Authorization Error" });
        try {
          const decoded = jwt.verify(token, "string");
          req.user = decoded.user;
          next();
        } catch (err) {
          res.status(500).send({ message: "Invalid Token" });
        }

}

