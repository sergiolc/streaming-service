
const express = require('express');

const mainRouter = require('./main.route');
const usersRouter = require('./users.route');

module.exports = (app) => {

    const router = express.Router();

    router.use('/', mainRouter(app));
    router.use('/users', usersRouter(app));

    return router;
}
