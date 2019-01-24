require('dotenv').config();

const log = require('./app/log')(module);
const db = require('./app/db/mongoose');
const config = require('./config');

const { User, Client, AccessToken, RefreshToken } = require('./app/models');

User.remove({}, () => {
    const user = new User({
        username: config.default.user.username,
        password: config.default.user.password
    });

    user.save((err, user) => {
        if (!err) {
            log.info('New user - %s:%s', user.username, user.password);
        } else {
            return log.error(err);
        }
    });
});

Client.remove({}, () => {
    const client = new Client({
        name: config.default.client.name,
        clientId: config.default.client.clientId,
        clientSecret: config.default.client.clientSecret
    });

    client.save(function(err, client) {
        if (!err) {
            log.info(
                'New client - %s:%s',
                client.clientId,
                client.clientSecret
            );
        } else {
            return log.error(err);
        }
    });
});

AccessToken.remove({}, function(err) {
    if (err) {
        return log.error(err);
    }
});

RefreshToken.remove({}, function(err) {
    if (err) {
        return log.error(err);
    }
});

setTimeout(function() {
    db.disconnect();
}, 3000);
