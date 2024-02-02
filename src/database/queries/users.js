const registerUserQuery =
    `INSERT INTO "user"(username, display_name, email, password)
    VALUES($1,$2,$3,$4)`;

const checkUsernameExists =
    `SELECT COUNT(*)
    FROM "user"
    WHERE username = $1`;

const getUserByLoginInfoQuery =
    `SELECT user_id, display_name, join_date
    FROM "user"
    WHERE (email = $1 AND password = $2) OR (username = $1 AND password = $2)`;

const checkEmailQuery =
    `SELECT COUNT(*)
    FROM "user"
    WHERE email = $1`;

const getUserByUsernameQuery =
    `SELECT display_name, email, join_date
    FROM "user"
    WHERE username = $1`;


module.exports = {
    registerUserQuery,
    checkEmailQuery,
    checkUsernameExists,
    getUserByLoginInfoQuery,
    getUserByUsernameQuery,
}