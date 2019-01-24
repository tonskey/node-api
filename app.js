const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./app/auth/auth');

const log = require('./app/log')(module);

const routes = require('./app/routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/', routes);

app.use((req, res) => {
    res.status(404);
    log.debug('%s %d %s', req.method, res.statusCode, req.url);
    res.json({
        error: 'Not found'
    });
    return;
});

app.use((err, req, res) => {
    res.status(err.status || 500);
    log.error('%s %d %s', req.method, res.statusCode, err.message);
    res.json({
        error: err.message
    });
    return;
});

module.exports = app;
