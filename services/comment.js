const Comment = require("../models/comments");

const createComment = async (postId, userId, authorId) => {
    const comment = new Comment({
        postId: postId,
        userId: userId,
        authorId: authorId
    })
    return await comment.save();
}

module.exports = { createComment }
