const User = require("../models/user");

const createUser = async (displayName, username, password, pfp) => {
    const user = new User({
        displayName: displayName,
        username: username,
        password: password,
        pfp: pfp
    })
    await user.save();
}

const sendFriendRequest = async (username1, username2) => {
    if (username1 == username2) return false
    let user1 = await User.find({ username: username1 });
    if (!user1) return false
    let user2 = await User.find({ username: username2 });
    if (!user2) return false
    user1 = user1[0]
    user2 = user2[0]

    if (!user2.friendRequests.includes(user1._id)) {
        user2.friendRequests.push(user1._id)
        await user2.save()
    }
    return true;
}
const acceptFriendRequest = async (username1, username2) => {
    if (username1 == username2) return false
    let user1 = (await User.findOne({ username: username1 }));
    if (!user1) return false
    let user2 = (await User.findOne({ username: username2 }));
    if (!user2) return false
    user1 = user1[0]
    user2 = user2[0]

    const index = user2.friendRequests.indexOf(user1._id)

    if (index == -1) return false
    user2.friendRequests.splice(index, 1)
    user2.friends.push(user1._id)
    await user2.save()
    return true
}
const checkFriendRequest = async (username1, username2) => {
    if (username1 == username2) return false
    let user1 = (await User.findOne({ username: username1 }));
    if (!user1) return false
    let user2 = (await User.findOne({ username: username2 }));
    if (!user2) return false
    user1 = user1[0]
    user2 = user2[0]

    const index = user2.friendRequests.indexOf(user1._id)
    return index != -1
}

const getUsers = async () => {
    return await User.find({});
}
const getUser = async (username) => {
    let user = (await User.findOne({ username: username }));
    if (!user) return null
    return user[0];
}
const doesUserExist = async (username) => {
    return (await User.findOne({ username: username })) != [];
}
const checkCredentials = async (username, password) => {
    let user = (await User.findOne({ username: username }));
    if (!user) return false
    user = user[0]
    return user.password == password
}

const getFriends = async (username) => {
    let user = (await User.findOne({ username: username }));
    if (!user) return null
    const friends = []
    await user.friends.forEach(async friendId => {
        let friend = (await User.findById(friendId));
        if (friend)
            friends.push(friend)
    });
    return friends;
}

module.exports = {
    createUser, getUsers, getUser, sendFriendRequest, acceptFriendRequest,
    checkFriendRequest, doesUserExist, checkCredentials, getFriends
}