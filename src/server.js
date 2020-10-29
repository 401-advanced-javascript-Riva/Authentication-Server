'use strict'

const express = require('express');
const app = express()
const router = express.Router();
const port = process.env.PORT || 3001;
require('dotenv').config();
app.use(express.static('./public'));
app.use(express.json());
app.use(router);
const cors = require('cors');
app.use(cors());



const notFoundError = require('../src/middleware/404');
const serverError = require('../src/middleware/500');

//Routes
const authRouter = require('./auth/routes/router');
router.use(authRouter);
const secretRouter = require('./auth/routes/extra-routes');
app.use(secretRouter);

//Middleware
router.use(serverError);
router.use(notFoundError);


module.exports = {

    app: app,
    start: function () {

        //connect to server;
        /*give it a port number and optionally pass a function to call when app
        starts listening on given port*/
        app.listen(port, () => console.log(`Listening on port ${port}...`));

    }
}