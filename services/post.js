const Post = require("../models/posts");

const createPost = async (content, image, author) => {
    const post = new Post({
        content: content,
        image: image,
        author: author
    })
    return await post.save();
}

module.exports = { createPost }
