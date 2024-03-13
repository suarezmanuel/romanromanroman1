const postService = require('../services/posts');

const createPost = async (req, res) => {
    res.json(await postService.createPost(
        req.body.content,
        req.body.image,
        req.params.id,
        req.body.date,
    ))
}

const getUserPosts = async (req, res) => {
    const posts = await postService.getPostById(req.params.id);
    if (!posts) {
    return res.status(404).json({ errors: ['Posts not found'] });
    }
    res.json(posts);
}

const getAllPosts = async (req, res) => {
    const posts = await postService.getPosts();
    if (!posts) {
    return res.status(404).json({ errors: ['Posts not found'] });
    }
    res.json(posts);
}

module.exports = {
    createPost, getUserPosts, getAllPosts
}