const express = require('express');
var router = express.Router();
const userController = require('../controller/user');
router.route('/')
    .get(userController.getUsers)
    .post(userController.createUser)

router.route('/friendRequest/send')
    .post(userController.sendFriendRequest)

router.route('/friendRequest/accept')
    .post(userController.acceptFriendRequest)

router.route('/:username')
    .get(userController.getUser)

module.exports = router;
