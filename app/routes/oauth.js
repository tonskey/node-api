const express = require('express');
const oauth2 = require('../auth/oauth2');

const router = express.Router();

router.post('/token', oauth2.token);

module.exports = router;
