
const express = require('express');

module.exports = (app) => {

    const router = express.Router();
    let count = 0;

    router.route('/:id/streams')
        .get((req, res) => {
            res.send({ count: count });
        })
        .post((req, res) => {
            count++;
            res.send({ count: count });
        });

    return router;
};
