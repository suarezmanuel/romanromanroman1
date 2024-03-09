const Comment = require("../models/comments");

const createComment = async (postId, user, author) => {
    const comment = new Comment({
        postId: postId,
        user: user,
        author: author
    })
    return await comment.save();
}

module.exports = { createComment }
