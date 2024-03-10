const userService = require('../services/user');

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
    const user = await userService.getUser(req.params.username)
    if (!user) {
        return res.status(404).json({ errors: ['User not found'] })
    }
    res.json(user)
}
const sendFriendRequest = async (req, res) => {
    res.json(await userService.sendFriendRequest(req.body.username1, req.body.username2))
}
const acceptFriendRequest = async (req, res) => {
    res.json(await userService.acceptFriendRequest(req.body.username1, req.body.username2))
}
const checkFriendRequest = async (req, res) => {
    res.json(await userService.checkFriendRequest(req.body.username1, req.body.username2))
}
const doesUserExist = async (req, res) => {
    res.json(await userService.doesUserExist(req.body.username))
}
const checkCredentials = async (req, res) => {
    res.json(await userService.checkCredentials(req.body.username, req.body.password))
}


module.exports = {
    createUser, getUsers, getUser, sendFriendRequest,
    acceptFriendRequest, checkFriendRequest, doesUserExist, checkCredentials
}