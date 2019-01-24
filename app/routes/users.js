const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get(
    '/info',
    passport.authenticate('bearer', { session: false }),
    (req, res) => {
        res.json({
            user_id: req.user.userId,
            name: req.user.username,
            scope: req.authInfo.scope
        });
    }
);

module.exports = router;
