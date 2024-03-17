const User = require("../models/users");
const { use } = require("../routes/posts");

const createUser = async (displayName, username, password, pfp, friendRequests = []) => {
    const user = new User({
        displayName,
        username,
        password,
        pfp,
        friendRequests
    })
    return await user.save();
}

const getUsers = async (maxAmount = 20) => {
    return await User
        .find({})
        .limit(maxAmount)
        .exec();
}

const getUser = async (id) => {
    let user = (await User.findById(id));
    if (!user) return null
    return user;
}

const editUser = async (id, displayName, username, password, pfp) => {
    let user = await User.findById(id);
    if (!user) return false
    user.displayName = displayName
    user.username = username
    user.password = password
    user.pfp = pfp
    await user.save();
    return true
}

const deleteUser = async (id) => {
    let user = await User.findByIdAndDelete(id);
    return user != []
}

const doesUserExist = async (username) => {
    return (await User.findById(username)) != [];
}

const checkCredentials = async (username, password) => {
    let user = (await User.findOne({ username: username }));
    if (!user) return false
    user = user[0]
    return user.password == password
}

const getFriendById = async (id) => {
    let friend = (await User.findById(id));
    if (!friend) return null;
    // console.log(friend);
    return friend;
}

// "_id":"65f1905080ed600954bf32c4" "_id":"65f1905f80ed600954bf32c9"
const getFriends = async (id) => {
    let user = await User.findOne({ _id: id });
    if (!user) return null;

    const friends = await Promise.all(user.friends.map(async friendId => {
        return await getFriendById(friendId);
    }));
    console.log(friends);
    return friends;
}

const sendFriendRequest = async (id1, id2) => {
    try{
        if (id1 == id2) return false;
        let user1 = await User.findById(id1);
        if (!user1) return false
        let user2 = await User.findById(id2);
        if (!user2) return false

        if (!user2.friendRequests.includes(user1._id)) {
            user2.friendRequests.push(user1._id)
            await user2.save()
        }
        return true;
    } catch (error) {
        return false;
    }
}

const acceptFriendRequest = async (id1, id2) => {
    try {
        if (id1 == id2) return false;
        let user1 = await User.findById(id1);
        // console.log(user1)
        if (!user1) return false;
        let user2 = await User.findById(id2);
        if (!user2) return false;

        const index = user2.friendRequests.indexOf(user1._id)
        if (index == -1) return false
        user2.friendRequests.splice(index, 1)
        user2.friends.push(user1._id)
        await user2.save()
        return true
    } catch (error) {
        return false;
    }
}

const deleteFriendRequest = async (id1, id2) => {
    try {
        if (id1 == id2) return false;
        let user1 = await User.findById(id1);
        if (!user1) return false;
        let user2 = await User.findById(id2);
        if (!user2) return false;

        const index = user2.friendRequests.indexOf(user1._id)
        if (index == -1) return false
        user2.friendRequests.splice(index, 1)
        await user2.save()
        return true
    } catch (error) {
        return false;
    }
}

const checkFriendRequest = async (id1, id2) => {
    if (id1 == id2) return false
    let user1 = await User.findById(id1);
    if (!user1) return false
    let user2 = await User.findById(id2);
    if (!user2) return false
    user1 = user1[0]
    user2 = user2[0]

    const index = user2.friendRequests.indexOf(user1._id)
    return index != -1
}

module.exports = {
    createUser, getUsers, getUser, editUser, deleteUser,
    getFriends, sendFriendRequest, acceptFriendRequest, deleteFriendRequest,
    // checkFriendRequest, doesUserExist, checkCredentials
}