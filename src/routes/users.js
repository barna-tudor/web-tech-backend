const express = require('express');
const usersRouter = express.Router();
const {
    registerUser,
    loginUser,
    /*
    getUserById,
    
    getUserPosts,
    getUserComments,
    */
} = require('../services/users');

usersRouter.post(`/registerUser`, registerUser);
usersRouter.post(`/login`, loginUser);

/*
usersRouter.get('/user/:user_id', getUserById);
usersRouter.get(`/user/:user_id/posts`, getUserPosts);
usersRouter.get(`/user/:user_id/comments`, getUserComments);
*/


module.exports = usersRouter;