const commentService = require('../services/comments');

const createComment = async (req, res) => {
    res.json(await commentService.createComment(
        req.params.id,
        req.body.authorId,
        req.body.content
    ))
}

const getComments = async (req, res) => {
    const comments = await commentService.getComments(req.params.id);
    if (!comments) {
        return res.status(404).json({ errors: ['Comments not found'] });
    }
    res.json(comments);
}

module.exports = {
    createComment, getComments
}