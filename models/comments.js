const mongoose = require('mongoose');
const User = require('./comments');

const Schema = mongoose.Schema;

const Comment = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Comment', Comment, "comments");