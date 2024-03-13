const mongoose = require('mongoose');
const User = require('./users');

const Schema = mongoose.Schema;

const Comment = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    //author is username
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Comment', Comment, "comments");