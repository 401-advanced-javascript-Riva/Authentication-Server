'use strict'

const supergoose = require('@code-fellows/supergoose');
const server = require('../src/server');
const testServer = supergoose(server.app);
const Users = require('../src/auth/models/user');

/* TEST:

Does the middleware function (send it a basic header)
*/
