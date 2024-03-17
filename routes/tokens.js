const express = require('express');
var router = express.Router();
const tokensController = require('../controller/tokens');
const { errorWrapper } = require('./helper');

router.route('/')
    .post(errorWrapper(tokensController.createToken))

router.route('/:id')
    .get(errorWrapper(tokensController.isLoggedIn))

module.exports = router;