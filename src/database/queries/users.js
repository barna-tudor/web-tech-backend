const registerUserQuery =
    `INSERT INTO "user"(username, display_name, email, password)
    VALUES($1,$2,$3,$4)
    RETURNING (user_id)`;

const checkUsernameExistsQuery =
    `SELECT COUNT(*)
    FROM "user"
    WHERE username = $1`;

const checkEmailExistsQuery =
    `SELECT COUNT(*)
    FROM "user"
    WHERE email = $1`;

const getUserByDisplayNameQuery =
    `SELECT user_id, display_name, join_date
    FROM "user"
    WHERE display_name = $1`;

const logInQuery =
    `SELECT * from "user"
    WHERE email = $1 or username = $2`;


const displayNameTakenQuery =
    `SELECT COUNT(*)
    FROM "user"
    WHERE display_name = $1`;

const getThreadsByDisplayNameQuery =
    `SELECT t.*, CAST(COALESCE(SUM(tv.vote),0) as INTEGER) as vote_total
    FROM thread t
    LEFT JOIN thread_vote tv ON t.thread_id = tv.thread_id
    LEFT JOIN "user" u ON t.user_id = u.user_id
    WHERE u.display_name = $1
    GROUP BY t.thread_id
    ORDER BY t.created_time DESC`;


const getCommentsByDisplayNameQuery =
    `SELECT c.*, CAST(COALESCE(SUM(cv.vote),0) as INTEGER) as vote_total
    FROM comment c
    LEFT JOIN comment_vote cv ON c.comment_id = cv.comment_id
    LEFT JOIN "user" u ON c.user_id = u.user_id
    WHERE u.display_name = $1
    GROUP BY c.comment_id
    ORDER BY c.created_time DESC`;


module.exports = {
    registerUserQuery,
    checkEmailExistsQuery,
    checkUsernameExistsQuery,
    getUserByDisplayNameQuery,
    displayNameTakenQuery,
    logInQuery,
    getThreadsByDisplayNameQuery,
    getCommentsByDisplayNameQuery,
}