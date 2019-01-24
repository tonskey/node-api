const express = require('express');
const passport = require('passport');
const router = express.Router();

const { ArticleController } = require('../controllers');

router.get(
    '/',
    passport.authenticate('bearer', { session: false }),
    (req, res) => {
        ArticleController.getAll(req, res);
    }
);

router.post(
    '/',
    passport.authenticate('bearer', { session: false }),
    (req, res) => {
        ArticleController.create(req, res);
    }
);

router.get(
    '/:id',
    passport.authenticate('bearer', { session: false }),
    (req, res) => {
        ArticleController.getOne(req, res);
    }
);

router.put(
    '/:id',
    passport.authenticate('bearer', { session: false }),
    (req, res) => {
        ArticleController.update(req, res);
    }
);

module.exports = router;
