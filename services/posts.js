const Post = require("../models/posts");

const createPost = async (content, image, authorId, date, authorPfp, authorDisplayName, likes = 0) => {
    const post = new Post({
        content: content,
        image: image,
        authorId: authorId,
        date: date,
        authorPfp: authorPfp,
        authorDisplayName: authorDisplayName,
        likes
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

const updateLikeAmount = async (postId, likeAmount) => {
    let post = await Post.findById(postId);
    if (!post) return false;

    post.likes = likeAmount;

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

const getPosts = async (maxAmount = 20) => {
    return await Post
        .find({})
        .limit(maxAmount)
        .exec();
}

const getTargetPosts = async (authors, maxAmount = 20) => {
    return await Post
        .find({ authorId: { $in: authors } })
        .limit(maxAmount)
        .exec();
}

const getNonTargetPosts = async (authors, maxAmount = 20) => {
    return await Post
        .find({ authorId: { $out: authors } })
        .limit(maxAmount)
        .exec();
}

module.exports = { createPost, editPost, updateLikeAmount, deletePost, getPosts, getPostById, getTargetPosts, getNonTargetPosts }
