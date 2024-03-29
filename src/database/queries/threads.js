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
    `SELECT t.*, CAST(COALESCE(SUM(tv.vote),0) as INTEGER) as vote_total, (SELECT tv.vote FROM thread_vote tv WHERE tv.user_id=$2) as user_vote 
    FROM thread t
    LEFT JOIN thread_vote tv ON t.thread_id = tv.thread_id
    WHERE t.thread_id = $1
    GROUP BY t.thread_id`;

// No pagination for now
const getCommentsByThreadIDQuery =
    `SELECT c.*, CAST(COALESCE(SUM(cv.vote),0) as INTEGER) as vote_total, (SELECT cv.vote FROM comment_vote cv WHERE cv.user_id=$2) as user_vote
    FROM "comment" c
    LEFT JOIN comment_vote cv ON c.comment_id = cv.comment_id
    WHERE c.thread_id = $1
    GROUP BY c.comment_id
    ORDER BY c.comment_id`

// unused
const getRepliesInThreadQuery =
    `SELECT c.*, CAST(COALESCE(SUM(cv.vote),0) as INTEGER) as vote_total, (SELECT cv.vote FROM comment_vote cv WHERE cv.user_id=$2) as user_vote
    FROM "comment" c
    LEFT JOIN comment_vote cv ON c.comment_id = cv.comment_id
    WHERE thread_id = $1 AND is_reply = TRUE
    GROUP BY c.comment_id
    ORDER BY c.comment_id`;

const getThreadsByTopicQuery =
    `SELECT thread_id, thread_title, thread_body, created_time, CAST(COALESCE(SUM(tv.vote),0) as INTEGER) as vote_total, (SELECT tv.vote FROM thread_vote tv WHERE tv.user_id=$2) as user_vote
    FROM thread t
    LEFT JOIN thread_vote tv ON t.thread_id = tv.thread_id
    WHERE topic_id = $1
    GROUP BY t.thread_id`;

const getCommentByIdQuery =
    `SELECT c.*, CAST(COALESCE(SUM(cv.vote),0) as INTEGER) as vote_total, (SELECT cv.vote FROM comment_vote cv WHERE cv.user_id=$2) as user_vote
    FROM "comment" c
    LEFT JOIN comment_vote cv ON c.comment_id = cv.comment_id
    WHERE c.comment_id = $1
    GROUP BY c.comment_id`;

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