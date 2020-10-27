'use strict'

const express = require('express');
const app = express()
let router = express.Router()
const port = process.env.PORT || 3001;
app.use(express.json());
require('dotenv').config();
app.use(router);
const cors = require('cors');


const notFoundError = require('../src/middleware/404');
const serverError = require('../src/middleware/500');

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