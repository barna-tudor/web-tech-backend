const express = require('express');
const threadsRouter = express.Router();
const {
    createNewThread,
    createNewComment,
    getThreadById,
    getThreadComments,
    createNewReply,
    addVoteToThread,
    addVoteToComment,
    getAllThreadsByTopic,
    getCommentById,
}
    = require('../services/threads');
const checkJWT = require('./auth');

threadsRouter.post('/newThread', checkJWT, createNewThread);
threadsRouter.post('/thread/:thread_id/newComment', checkJWT, createNewComment);
threadsRouter.get('/thread/:thread_id', getThreadById);
threadsRouter.get('/thread/:thread_id/comments', getThreadComments);
threadsRouter.post('/thread/:thread_id/:comment_id/newReply', checkJWT, createNewReply);
threadsRouter.post('/thread/:thread_id/vote', checkJWT, addVoteToThread);
threadsRouter.post('/thread/:thread_id/:comment_id/vote', checkJWT, addVoteToComment);
threadsRouter.get('/topic/:topic_id/threads', getAllThreadsByTopic);
threadsRouter.get('/comment/:comment_id', getCommentById);

module.exports = threadsRouter;