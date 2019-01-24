const mongoose = require('mongoose');

const log = require('../log')(module);

const { DB_URI } = process.env;

const connection = mongoose.connect(DB_URI);

connection
    .then(db => {
        log.info('Connected to DB!');
        return db;
    })
    .catch(err => {
        log.error('Connection error:', err.message);
    });

module.exports = { connection, mongoose };
