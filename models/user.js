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
    pfp: {
        type: String,
        required: true
    },
    friends: [{
        type: String,
        default: []
    }],
    friendRequests: [{
        type: String,
        default: []
    }]
});
module.exports = mongoose.model('User', User, "users");