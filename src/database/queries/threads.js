const insertNewThreadQuery =
    `INSERT INTO thread(thread_title, thread_body, user_id, topic_id)
    VALUES($1,$2,$3,1)
    RETURNING thread_id`;

const insertNewCommentQuery =
    `INSERT INTO "comment"(comment_body,user_id,thread_id)
    VALUES($1,$2,$3)
    RETURNING comment_id`;

const insertNewReplyQuery =
    `INSERT INTO comment(comment_body,user_id,thread_id,is_reply,reply_comment_id)
    VALUES($1,$2,$3,TRUE,$4)
    RETURNING comment_id`;

const insertCommentVoteQuery =
    `INSERT INTO comment_vote(user_id,comment_id,vote)
    VALUES($1,$2,$3)`;

const deletePreviousCommentVoteQuery =
    `DELETE FROM comment_vote
    WHERE user_id = $1 AND comment_id = $2`;

const insertThreadVoteQuery =
    `INSERT INTO thread_vote(user_id,thread_id,vote)
    VALUES($1,$2,$3)`;

const deletePreviousThreadVoteQuery =
    `DELETE FROM thread_vote
    WHERE user_id = $1 AND thread_id = $2`;


const getThreadByIDQuery =
    `SELECT t.*, SUM(tv.vote) as vote_total
    FROM thread t
    LEFT JOIN thread_vote tv ON t.thread_id = tv.thread_id
    GROUP BY t.thread_id
    WHERE thread_id = $1`;

// No pagination for now
const getCommentsByThreadIDQuery =
    `SELECT c.*, SUM(cv.vote) as vote_total
    FROM "comment" c
    LEFT JOIN comment_vote cv ON c.comment_id = cv.comment_id
    GROUP BY c.comment_id
    WHERE thread_id = $1
    ORDER BY comment_id`

// unused
const getRepliesInThreadQuery =
    `SELECT c.*, SUM(cv.vote) as vote_total
    FROM "comment" c
    LEFT JOIN comment_vote cv ON c.comment_id = cv.comment_id
    GROUP BY c.comment_id
    WHERE thread_id = $1 AND is_reply = TRUE
    ORDER BY comment_id`;

const getThreadsByTopicQuery =
    `SELECT thread_id, thread_title, thread_body, created_time, SUM(tv.vote) as vote_total
    FROM threads t
    LEFT JOIN thread_vote tv ON t.thread_id = tv.thread_id
    GROUP BY t.thread_id
    WHERE topic_id = $1`;

const getCommentByIdQuery =
    `SELECT c.*, SUM(cv.vote) as vote_total
    FROM "comment" c
    LEFT JOIN comment_vote cv ON c.comment_id = cv.comment_id
    GROUP BY c.comment_id
    WHERE comment_id = $1`;

module.exports = {
    insertNewThreadQuery,
    insertNewCommentQuery,
    insertCommentVoteQuery,
    deletePreviousCommentVoteQuery,
    insertThreadVoteQuery,
    deletePreviousThreadVoteQuery,
    getCommentsByThreadIDQuery,
    getRepliesInThreadQuery,
    getThreadByIDQuery,
    insertNewReplyQuery,
    getThreadsByTopicQuery,
    getCommentByIdQuery
}