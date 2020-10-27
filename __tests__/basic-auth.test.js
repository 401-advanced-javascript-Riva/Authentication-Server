'use strict'

const supergoose = require('@code-fellows/supergoose');
const server = require('../lib/server');
const testServer = supergoose(server.app);
const Users = require('../src/auth/models/user');

/* TEST:
POST to /signup to create a new user
POST to /signin to login as a user (use basic auth)
Need tests for auth middleware and the routes
Does the middleware function (send it a basic header)
Do the routes assert the requirements (signup/signin)
This is going to require more “end to end” testing that you’ve done in the past
To test signin, your tests actually need to create a user first, then try and login, so there’s a dependency built in
*/
