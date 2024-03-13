const postService = require('../services/posts');

const createPost = async (req, res) => {
    res.json(await postService.createPost(
        req.body.content,
        req.body.image,
        req.body.authorId,
    ))
}

const getPosts = async (req, res) => {
    res.json(await postService.getPosts(
        req.body._id,
    ))
}

module.exports = {
    createPost, getPosts
}