const express = require('express');
var router = express.Router();
const userController = require('../controller/users');
const postController = require('../controller/posts');
const commentController = require('../controller/comments');
const tokensController = require('../controller/tokens');


router.route('/')
    .get(userController.getUsers)
    .post(userController.createUser)

// router.route('/:username')
//     .get(userController.getUserByUsername)

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.editUser)
    .delete(userController.deleteUser)

router.route('/:id/posts')
    .get(tokensController.isLoggedIn, postController.getUserPosts)
    .post(tokensController.isLoggedIn, postController.createPost)
    
router.route('/:id/posts/:pid')
    .patch(tokensController.isLoggedIn, postController.editPost)
    .delete(tokensController.isLoggedIn, postController.deletePost)

router.route('/:id/comments/:cid')
    .patch(tokensController.isLoggedIn, commentController.editComment)
    .delete(tokensController.isLoggedIn, commentController.deleteComment)

router.route('/:id/friends')
    .get(tokensController.isLoggedIn, userController.getFriends)
    .post(tokensController.isLoggedIn, userController.sendFriendRequest)

router.route('/:id/friends/:fid')
    .patch(tokensController.isLoggedIn, userController.acceptFriendRequest)
    .delete(tokensController.isLoggedIn, userController.deleteFriendRequest)

module.exports = router;


// what needs to be added:
/*
-  everything holds ids and not objects

-  /api/tokens                 - POST adds JWT for login user

-  /api/users                  - POST adds a user
-  /api/users/:id              - GET returns user with id ":id" 
-  /api/users/:id              - PATCH edits user with id ":id" 
-  /api/users/:id              - DELETE returns user with id ":id" 

-  /api/users/:id/posts        - GET returns users post if friend with ":id"
-  /api/users/:id/posts        - POST creates new post to user with id ":id" 
-  /api/users/:id/posts/:pid   - PATCH edits post with id ":pid"
-  /api/users/:id/posts/:pid   - DELETE deletes post with id ":pid"

-  /api/posts                  - GET returns list of 20 posts

// DONE
-  /api/users/:id/friends      - GET returns array of friends (only if called by user itself or friend)
-  /api/users/:id/friends      - POST sends friend request to :id from :fid
-  /api/users/:id/friends/:fid - PATCH accepts :fid from :id
-  /api/users/:id/friends/:fid - DELETE denies :fid from :id


*/