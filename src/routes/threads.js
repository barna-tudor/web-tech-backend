const express = require('express');
const threadsRouter = express.Router();
const { createNewThread,
    createNewComment,
    getThreadById,
    getThreadComments,
    createNewReply,
    addVoteToThread,
    addVoteToComment,
    getAllThreadsByTopic,
}
    = require('../services/threads');

threadsRouter.post('/newThread', createNewThread);
threadsRouter.post('/thread/:thread_id/newComment', createNewComment);
threadsRouter.get('/thread/:thread_id', getThreadById);
threadsRouter.get('/thread/:thread_id/comments', getThreadComments);
threadsRouter.post('/thread/:thread_id/:comment_id/newReply', createNewReply);
threadsRouter.post('/thread/:thread_id/vote', addVoteToThread);
threadsRouter.post('/thread/:thread_id/:comment_id/vote', addVoteToComment)
threadsRouter.get('/topic/:topic_id/threads', getAllThreadsByTopic)


module.exports = threadsRouter;