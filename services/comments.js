const Comment = require("../models/comments");

const createComment = async (postId, authorId, content) => {
    const comment = new Comment({
        postId: postId,
        authorId: authorId,
        content: content
    })
    return await comment.save();
}

const getComments = async (postId) => {
    return await Post.find({ _id: postId });
}

module.exports = { createComment, getComments }
