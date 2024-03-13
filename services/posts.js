const Post = require("../models/posts");

const createPost = async (content, image, authorId) => {
    const post = new Post({
        content: content,
        image: image,
        authorId: authorId
    })
    await post.save();
}

const editPost = async (postId, content, image) => {
    let post = await Post.findById(postId);
    if (!post) return false
    post.content = content
    post.image = image
    post.date = Date.now
    await post.save();
    return true
}

const removePost = async (postId) => {
    let post = await Post.findByIdAndDelete(postId);
    console.log(post)
    return post != []
}

const getPosts = async (userId) => {
    return await Post.find({ authorId: userId })
}

module.exports = { createPost, editPost, removePost, getPosts }
