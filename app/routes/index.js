const express = require('express');
const router = express.Router();

const api = require('./api');
const articles = require('./articles');
const users = require('./users');
const oauth = require('./oauth');

router.use('/api', api);
router.use('/api/articles', articles);
router.use('/api/users', users);
router.use('/api/oauth', oauth);

module.exports = router;
