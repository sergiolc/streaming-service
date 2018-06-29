const express = require('express');
const bodyParser = require('body-parser')

const dataStore = require('./data-store');

const routes = require('./routes/index.route');

const app = express();

app.use(bodyParser.json());

app.set('dataStore', dataStore());


app.use('/', routes(app));


app.get('/', (req, res, next) => {

    res.sendStatus(404);
});


app.listen(process.env.PORT || 8080, () => {
    console.log('Service listening on port 8080!')
});


module.exports = app;