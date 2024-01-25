const insertNewThread =
    `INSERT INTO thread(thread_title, thread_body, user_id, topic_id)
    VALUES($1,$2,$3,1)`;

const insertNewComment =
    `INSERT INTO "comment"(comment_body,user_id,thread_id)
    VALUES($1,$2,$3)`;

const insertNewReply =
    `INSERT INTO comment(comment_body,user_id,thread_id,is_reply,reply_comment_id)
    VALUES($1,$2,$3,TRUE,$4)`;



const insertCommentVote =
    `INSERT INTO comment_vote(user_id,comment_id,vote)
    VALUES($1,$2,$3)`;

const deletePreviousCommentVote =
    `DELETE FROM comment_vote
    WHERE user_id = $1 AND comment_id = $2`;

const insertThreadVote =
    `INSERT INTO thread_vote(user_id,thread_id,vote)
    VALUES($1,$2,$3)`;

const deletePreviousThreadVote =
    `DELETE
    FROM thread_vote
    WHERE user_id = $1 AND thread_id = $2`;


const getThreadByID =
    `SELECT t.*, SUM(tv.vote) as vote_total
    FROM thread t
    LEFT JOIN thread_vote tv ON t.thread_id = tv.thread_id
    GROUP BY t.thread_id
    WHERE thread_id = $1`;

const getTopLevelCommentsByThreadID =
    `SELECT c.*, SUM(cv.vote) as vote_total
    FROM "comment" c
    LEFT JOIN comment_vote cv ON c.comment_id = cv.comment_id
    GROUP BY c.comment_id
    WHERE thread_id = $1 AND is_reply = FALSE`


const getRepliesInThread =
    `SELECT c.*, SUM(cv.vote) as vote_total
    FROM "comment" c
    LEFT JOIN comment_vote cv ON c.comment_id = cv.comment_id
    GROUP BY c.comment_id
    WHERE thread_id = $1 AND is_reply = TRUE`;