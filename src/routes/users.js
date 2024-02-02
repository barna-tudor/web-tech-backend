const express = require('express');
const usersRouter = express.Router();
const {
    registerUser,
    loginUser,
    getUserByDisplayName,
    getUserPosts,
    getUserComments,

} = require('../services/users');


usersRouter.post(`/registerUser`, registerUser);
usersRouter.post(`/login`, loginUser);
usersRouter.get('/user/:displayName', getUserByDisplayName);
usersRouter.get(`/user/:displayName/threads`, getUserPosts);
usersRouter.get(`/user/:displayName/comments`, getUserComments);



module.exports = usersRouter;