
const express = require('express');

module.exports = (app) => {

    const router = express.Router();


    router.get('/', (req, res) => {

        res.send('Api running');
    });

    return router;
};
