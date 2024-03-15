const express = require('express');
var router = express.Router();
const tokensController = require('../controller/tokens');
// localhost/user/api/post

router.route('/')
    .post(tokensController.createToken)

router.route('/:id')
    .get(tokensController.isLoggedIn)

module.exports = router;