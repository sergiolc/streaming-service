
const express = require('express');

module.exports = (app) => {

    const router = express.Router();
    const dataStore = app.get('dataStore');

    router.route('/:userId/streams')
        .get((req, res) => {

            const count = dataStore.get(req.params.userId) || 0;
            const status = count <= 3 ? 'OK' : 'NOT_ALLOWED';

            res.send({ status: status, count: count });
        })
        .post((req, res) => {

            let count = dataStore.get(req.params.userId) || 0;
            dataStore.set(req.params.userId, ++count);
            
            res.send({ count: count });
        })
        .put((req, res) => {

            dataStore.set(req.params.userId, req.body.count);

            res.send({ count: req.body.count });
        })
        .delete((req, res) => {

            let count = dataStore.get(req.params.userId) || 0;
            if (count > 0) {
                dataStore.set(req.params.userId, --count);
            }
            
            res.send({ count: count });
        })

    return router;
};
