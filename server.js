const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const customEnv = require('custom-env');

customEnv.env(process.env.NODE_ENV, './config');

const users = require('./routes/user')

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var server = express();

server.use(express.static('public'))
server.use(cors())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(express.json())
server.use('/user', users)
server.listen(process.env.SERVER_PORT)