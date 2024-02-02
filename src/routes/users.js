const express = require('express');
const usersRouter = express.Router();
const {
    registerUser,
    loginUser,
    getUserByDisplayName,
    /*
    getUserPosts,
    getUserComments,
    */
} = require('../services/users');


usersRouter.post(`/registerUser`, registerUser);
usersRouter.post(`/login`, loginUser);
usersRouter.get('/user/:displayName', getUserByDisplayName);
/*
usersRouter.get(`/user/:username/posts`, getUserPosts);
usersRouter.get(`/user/:username/comments`, getUserComments);
*/


module.exports = usersRouter;