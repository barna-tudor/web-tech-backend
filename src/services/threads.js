const expressAsyncHandler = require('express-async-handler');
const util = require('util');
const { pool } = require('../database/dbConfig');
const poolQuery = util.promisify(pool.query).bind(pool);
const {
    insertNewThreadQuery,
    insertNewCommentQuery,
    insertCommentVoteQuery,
    insertNewReplyQuery,
    deletePreviousCommentVoteQuery,
    insertThreadVoteQuery,
    deletePreviousThreadVoteQuery,
    getCommentsByThreadIDQuery,
    getThreadByIDQuery,
    getThreadsByTopicQuery,
    getCommentByIdQuery,
} = require('../database/queries/threads');

/**
 * For all the following
 * if auth implemented
 * const user_id = req.user.user_id;
 * else
 * const {user_id} = req.body;
 */
const createNewThread = expressAsyncHandler(async (req, res) => {
    const user_id = req.user.user_id;
    const {
        thread_title,
        thread_body,
    } = req.body;
    try {
        const result = await poolQuery(insertNewThreadQuery, [thread_title, thread_body, user_id]);
        return res.status(201).json({
            status: 201,
            success: true,
            result: { thread_id: result.rows[0].thread_id, },
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            succes: false,
            error: {
                name: error.name,
                message: error.message,
            }
        })
    }
})

const createNewComment = expressAsyncHandler(async (req, res) => {
    const user_id = req.user.user_id;
    const { thread_id } = req.params;
    const { comment_body } = req.body;
    try {
        const result = await poolQuery(insertNewCommentQuery, [comment_body, user_id, thread_id]);
        return res.status(201).json({
            status: 201,
            success: true,
            result: { comment_id: result.rows[0].comment_id, },
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            succes: false,
            error: {
                name: error.name,
                message: error.message,
            }
        })
    }
})

const createNewReply = expressAsyncHandler(async (req, res) => {
    const user_id = req.user.user_id;
    const { thread_id, comment_id } = req.params;
    const { comment_body } = req.body;
    try {
        const reply = (await poolQuery(insertNewReplyQuery, [comment_body, user_id, thread_id, comment_id]));
        return res.status(201).json({
            status: 201,
            success: true,
            result: { comment_id: reply.rows[0].comment_id, }
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            succes: false,
            error: {
                name: error.name,
                message: error.message,
            }
        })
    }
})

const getThreadById = expressAsyncHandler(async (req, res) => {
    const user_id = req.user.user_id;
    const { thread_id } = req.params;
    try {
        const thread = (await poolQuery(getThreadByIDQuery, [thread_id, user_id])).rows[0];
        return res.status(200).json({
            status: 200,
            success: true,
            result: { ...thread, }
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            succes: false,
            error: {
                name: error.name,
                message: error.message,
            }
        })
    }
})

const getThreadComments = expressAsyncHandler(async (req, res) => {
    const user_id = req.user.user_id;
    const { thread_id } = req.params;
    try {
        const threadComments = (await poolQuery(getCommentsByThreadIDQuery, [thread_id, user_id])).rows;
        return res.status(200).json({
            status: 200,
            success: true,
            result: {
                ...threadComments,
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            succes: false,
            error: {
                name: error.name,
                message: error.message,
            }
        })
    }
})

const getAllThreadsByTopic = expressAsyncHandler(async (req, res) => {
    const { topic_id } = req.params;
    try {
        const threads = (await poolQuery(getThreadsByTopicQuery, [topic_id])).rows;
        return res.status(200).json({
            status: 200,
            success: true,
            result: { ...threads, }
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            succes: false,
            error: {
                name: error.name,
                message: error.message,
            }
        })
    }
})

const addVoteToThread = expressAsyncHandler(async (req, res) => {
    const user_id = req.user.user_id;
    const { thread_id } = req.params;
    const { vote } = req.body;
    try {
        // sequential is fine for now
        await poolQuery(deletePreviousThreadVoteQuery, [user_id, thread_id]);
        const result = await poolQuery(insertThreadVoteQuery, [user_id, thread_id, vote]);
        return res.status(201).json({
            status: 200,
            success: true,
            result: {}
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            succes: false,
            error: {
                name: error.name,
                message: error.message,
            }
        })
    }
})

const addVoteToComment = expressAsyncHandler(async (req, res) => {
    const user_id = req.user.user_id;
    const { comment_id } = req.params;
    const { vote } = req.body;
    try {
        // sequential is fine for now
        await poolQuery(deletePreviousCommentVoteQuery, [user_id, comment_id]);
        const result = await poolQuery(insertCommentVoteQuery, [user_id, comment_id, vote]);
        return res.status(201).json({
            status: 200,
            success: true,
            result: {}
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            succes: false,
            error: {
                name: error.name,
                message: error.message,
            }
        })
    }
})

const getCommentById = expressAsyncHandler(async (req, res) => {
    const user_id = req.user.user_id;
    const { comment_id } = req.params;
    try {
        const comment = (await poolQuery(getCommentByIdQuery, [comment_id, user_id])).rows[0]
        return res.status(200).json({
            status: 200,
            success: true,
            result: { ...comment, },
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            succes: false,
            error: {
                name: error.name,
                message: error.message,
            }
        })
    }
})

module.exports = {
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