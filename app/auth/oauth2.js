const oauth2orize = require('oauth2orize');
const passport = require('passport');
const crypto = require('crypto');

const config = require('../../config');
const log = require('../log')(module);

const { User, AccessToken, RefreshToken } = require('../models');

const aserver = oauth2orize.createServer();

const errFn = function(cb, err) {
    if (err) {
        return cb(err);
    }
};

const generateTokens = (data, done) => {
    const errorHandler = errFn.bind(undefined, done);

    RefreshToken.remove(data, errorHandler);
    AccessToken.remove(data, errorHandler);

    const tokenValue = crypto.randomBytes(32).toString('hex');
    const refreshTokenValue = crypto.randomBytes(32).toString('hex');

    data.token = tokenValue;
    const token = new AccessToken(data);

    data.token = refreshTokenValue;
    const refreshToken = new RefreshToken(data);

    refreshToken.save(errorHandler);

    token
        .save()
        .then(() => {
            done(null, tokenValue, refreshTokenValue, {
                expires_in: config.maxTokenLife
            });
        })
        .catch(e => {
            log.error(e);
            return done(e);
        });
};

aserver.exchange(
    oauth2orize.exchange.password((client, username, password, scope, done) => {
        User.findOne({ username })
            .then(user => {
                if (!user || !user.checkPassword(password)) {
                    return done(null, false);
                }

                const model = {
                    userId: user.userId,
                    clientId: client.clientId
                };

                generateTokens(model, done);
            })
            .catch(done);
    })
);

aserver.exchange(
    oauth2orize.exchange.refreshToken((client, refreshToken, scope, done) => {
        RefreshToken.findOne({ token: refreshToken, clientId: client.clientId })
            .then(token => {
                if (!token) {
                    return done(null, false);
                }

                User.findById(token.userId)
                    .then(user => {
                        if (!user) {
                            return done(null, false);
                        }

                        var model = {
                            userId: user.userId,
                            clientId: client.clientId
                        };

                        generateTokens(model, done);
                    })
                    .catch(done);
            })
            .catch(done);
    })
);

exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], {
        session: false
    }),
    aserver.token(),
    aserver.errorHandler()
];
