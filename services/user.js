const { MongoClient } = require("mongodb");
const User = require("../models/user");

const createUser = async (displayName, username, pfp) => {
    const user = new User({
        displayName: displayName,
        username: username,
        pfp: pfp
    })
    return await user.save();
}
const sendFriendRequest = async (username1, username2) => {

    const user1 = (await User.find({ username: username1 }))[0];

    const user2 = (await User.find({ username: username2 }))[0];


    if (!user2.friendRequests.includes(user1.username)) {
        user2.friendRequests.push(user1.username)
        await user2.save()
    }
    return user2;
}
const acceptFriendRequest = async (username1, username2) => {
    let user1 = (await User.find({ username: username1 }));
    if (!user1) return false
    let user2 = (await User.find({ username: username2 }));
    if (!user2) return false
    user1 = user1[0]
    user2 = user2[0]

    const index = user2.friendRequests.indexOf(user1.username)

    if (index == -1) return false
    user2.friendRequests.splice(index, 1)
    user2.friends.push(user1.username)
    return await user2.save()

}
const getUsers = async () => {
    return await User.find({});
}
const getUser = async (username) => {
    return await User.find({ username: username });
}


module.exports = { createUser, getUsers, getUser, sendFriendRequest, acceptFriendRequest }