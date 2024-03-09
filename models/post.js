const mongoose = require('mongoose');
const User = require('./users');

const Schema = mongoose.Schema;

const Post = new Schema({
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: User,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    }
});
module.exports = mongoose.model('Post', Post);