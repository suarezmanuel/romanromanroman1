const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    displayName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pfp: {
        type: String,
        required: true
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    friendRequests: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
}, {versionKey: false});

module.exports = mongoose.model('User', User, "users");