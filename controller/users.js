const userService = require('../services/users');

const createUser = async (req, res) => {
    res.json(await userService.createUser(
        req.body.displayName,
        req.body.username,
        req.body.password,
        req.body.pfp
    ))
}
const getUsers = async (_, res) => {
    res.json(await userService.getUsers())
}
const getUser = async (req, res) => {
    const user = await userService.getUser(req.params._id)
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] })
    }
    res.json(user)
}

const getFriends = async (req, res) => {
    res.json(await userService.getFriends(req.body._id))
}
const sendFriendRequest = async (req, res) => {
    res.json(await userService.sendFriendRequest(req.body._id1, req.body._id2))
}
const acceptFriendRequest = async (req, res) => {
    res.json(await userService.acceptFriendRequest(req.body._id1, req.body._id2))
}
const checkFriendRequest = async (req, res) => {
    res.json(await userService.checkFriendRequest(req.body._id1, req.body._id2))
}
const doesUserExist = async (req, res) => {
    res.json(await userService.doesUserExist(req.body._id))
}
const checkCredentials = async (req, res) => {
    res.json(await userService.checkCredentials(req.body.username, req.body.password))
}

module.exports = {
    createUser, getUsers, getUser, sendFriendRequest,
    acceptFriendRequest, checkFriendRequest, doesUserExist, checkCredentials
}