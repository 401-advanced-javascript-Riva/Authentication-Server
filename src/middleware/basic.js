'use strict'

const jwt = require("jsonwebtoken");


module.exports = async function basicAuth(err, req, res, next) {
        const token = req.headers['token'];
        if (!token) return res.status(401).json({ message: "Authorization Error" });
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = decoded.user;
          next();
        } catch (err) {
          res.status(500).send({ message: "Invalid Token" });
        }

}

