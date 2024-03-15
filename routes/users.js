const express = require('express');
var router = express.Router();
const userController = require('../controller/users');
const postController = require('../controller/posts');
// localhost/user/api/users

router.route('/')
    .get(userController.getUsers)
    .post(userController.createUser)

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.editUser)
    .delete(userController.deleteUser)

// router.route('/:id/friends')
//     .get(userController.getFriends)

router.route('/:id/posts')
    .get(postController.getUserPosts)
    .post(postController.createPost)

router.route('/:id/posts/:pid')
    .patch(postController.editPost)
    .delete(postController.deletePost)

router.route('/:id/friends')
    .get(userController.getFriends)
    .post(userController.sendFriendRequest)

router.route('/:id/friends/:fid')
    .patch(userController.acceptFriendRequest)
    .delete(userController.deleteFriendRequest)

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