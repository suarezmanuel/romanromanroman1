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
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    }
}, {versionKey: false});
module.exports = mongoose.model('Post', Post, "posts");