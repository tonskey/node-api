const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const ClientPasswordStrategy = require('passport-oauth2-client-password')
    .Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const config = require('../../config');

const { User, Client, AccessToken } = require('../models');

passport.use(
    new BasicStrategy((username, password, done) => {
        Client.findOne({ clientId: username })
            .then(client => {
                if (!client) {
                    return done(null, false);
                }

                if (client.clientSecret !== password) {
                    return done(null, false);
                }

                return done(null, client);
            })
            .catch(done);
    })
);

passport.use(
    new ClientPasswordStrategy((clientId, clientSecret, done) => {
        Client.findOne({ clientId: clientId })
            .then(client => {
                if (!client) {
                    return done(null, false);
                }

                if (client.clientSecret !== clientSecret) {
                    return done(null, false);
                }

                return done(null, client);
            })
            .catch(done);
    })
);

passport.use(
    new BearerStrategy((accessToken, done) => {
        AccessToken.findOne({ token: accessToken })
            .then(token => {
                if (!token) {
                    return done(null, false);
                }

                const tokenLife = Math.round(
                    (Date.now() - token.created) / 1000
                );

                if (tokenLife > config.maxTokenLife) {
                    AccessToken.remove({ token: accessToken }).catch(done);
                    return done(null, false, { message: 'Token expired' });
                }

                User.findById(token.userId)
                    .then(user => {
                        if (!user) {
                            return done(null, false, {
                                message: 'Unknown user'
                            });
                        }

                        done(null, user, { scope: '*' });
                    })
                    .catch(done);
            })
            .catch(done);
    })
);
