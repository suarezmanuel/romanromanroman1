const mongoose = require('mongoose');
const User = require('./users');

const Schema = mongoose.Schema;

const Comment = new Schema({
    postId: {
        type: Number,
        required: true
    },
    user: {
        type: User,
        required: true
    },
    author: {
        type: Array < String > []
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
module.exports = mongoose.model('Comment', Comment);