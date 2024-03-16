const Post = require("../models/posts");

const createPost = async (content, image, authorId, date, authorPfp, authorDisplayName) => {
    console.log("authorPfp is" + authorPfp)
    const post = new Post({
        content: content,
        image: image,
        authorId: authorId,
        date: date,
        authorPfp: authorPfp,
        authorDisplayName: authorDisplayName,
        likes: 0
    })
    await post.save();
}

const editPost = async (postId, content, image) => {
    let post = await Post.findById(postId);
    if (!post) return false
    post.content = content
    post.image = image
    await post.save();
    return true
}

const deletePost = async (postId) => {
    let post = await Post.findByIdAndDelete(postId);
    return post != []
}

const getPostById = async (userId) => {
    return await Post.find({ authorId: userId });
}

const getPosts = async () => {
    return await Post.find({});
}

module.exports = { createPost, editPost, deletePost, getPosts, getPostById }
