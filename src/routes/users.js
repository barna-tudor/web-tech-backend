const express = require('express');
const usersRouter = express.Router();
const {
    registerUser,
    loginUser,
    getUserByDisplayName,
    getUserPosts,
    getUserComments,

} = require('../services/users');
const checkJWT = require('./auth');

usersRouter.post(`/registerUser`, registerUser);
usersRouter.post(`/login`, loginUser);
usersRouter.get('/user/:displayName', checkJWT, getUserByDisplayName);
usersRouter.get(`/user/:displayName/threads`, checkJWT, getUserPosts);
usersRouter.get(`/user/:displayName/comments`, checkJWT, getUserComments);



module.exports = usersRouter;