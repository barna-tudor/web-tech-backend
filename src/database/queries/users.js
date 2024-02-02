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

const getUserByUsernameQuery =
    `SELECT display_name, email, join_date
    FROM "user"
    WHERE username = $1`;

const logInQuery =
    `SELECT * from "user"
    WHERE email = $1 or username = $2`;


const displayNameTakenQuery =
    `SELECT COUNT(*)
    FROM "user"
    WHERE display_name = $1`;


module.exports = {
    registerUserQuery,
    checkEmailExistsQuery,
    checkUsernameExistsQuery,
    getUserByUsernameQuery,
    displayNameTakenQuery,
    logInQuery,
}