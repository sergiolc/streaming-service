const express = require('express');

const routes = require('./routes/index.route');

const app = express();


app.use('/', routes(app));


app.get('/', (req, res, next) => {

    res.sendStatus(404);
});


app.listen(3000, () => {
    console.log('Service listening on port 3000!')
});
