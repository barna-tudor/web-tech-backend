const expressAsyncHandler = require('express-async-handler');
const util = require('util');
const bcrypt = require('bcrypt');
const { pool } = require('../database/dbConfig');
const poolQuery = util.promisify(pool.query).bind(pool);
const jwt = require('jsonwebtoken');
const CustomError = require('../customError');

const {
    registerUserQuery,
    checkEmailExistsQuery,
    checkUsernameExistsQuery,
    getUserByDisplayNameQuery,
    displayNameTakenQuery,
    logInQuery,
    getThreadsByDisplayNameQuery,
    getCommentsByDisplayNameQuery,
} = require('../database/queries/users');


const registerUser = expressAsyncHandler(async (req, res) => {
    const {
        email,
        username,
        password,
        displayName,
    } = req.body;
    let isNotValid = value => value == null || value == undefined;

    if ([email, username, password, displayName].filter(isNotValid).length > 0) {
        return res.status(400).json({
            status: 400,
            succes: false,
            error: {
                name: "Invalid Data Provided",
                message: `Check for null or undefined values in fields "email", "username", "password", or "displayName"`,
            }
        })
    }

    try {
        let promiseArr = []
        const emailExists = poolQuery(checkEmailExistsQuery, [email])
        const userNameExists = poolQuery(checkUsernameExistsQuery, [username])
        const displayNameTaken = poolQuery(displayNameTakenQuery, [displayName])
        promiseArr.push(emailExists, userNameExists, displayNameTaken);
        const [emailExistsResult, userNameExistsResult, displayNameTakenResult] = await Promise.all(promiseArr)
        if (emailExistsResult.rows[0].count != 0) {
            throw new CustomError("Email is already in use", "EMAIL TAKEN", 400);
        }
        if (userNameExistsResult.rows[0].count != 0) {
            throw new CustomError("Username is already in use", "USERNAME TAKEN", 400);
        }
        if (displayNameTakenResult.rows[0].count != 0) {
            throw new CustomError("Display Name is already in use", "DISPLAY_NAME TAKEN", 400);
        }
        const hash = await bcrypt.hash(password, 10);
        const user_id = (await poolQuery(registerUserQuery, [username, displayName, email, hash])).rows[0].user_id;
        const token = jwt.sign({ user_id: user_id }, process.env.JWT_SECRET, { expiresIn: "30m" })
        return res.status(200).json({
            status: 200,
            success: true,
            result: {
                token: token
            }
        });
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.code).json({
                status: error.code,
                succes: false,
                error: {
                    name: error.name,
                    message: error.message,
                }
            });
        } else {
            console.error(error);
            return res.status(500).json({
                status: 500,
                succes: false,
                error: {
                    name: error.name,
                    message: error.message,
                }


            });
        }
    }
})

const loginUser = expressAsyncHandler(async (req, res) => {
    const {
        email,
        username,
        password,
    } = req.body;
    try {

        const checkDatabase = (await poolQuery(logInQuery, [email, username])).rows;

        if (checkDatabase.length === 0) throw new CustomError("User not found!", "USER NOT FOUND", 400);

        const match = await bcrypt.compare(password, checkDatabase[0].password);
        if (!match) {
            throw new CustomError("Password is incorrect!", "PASSWORD MISMATCH", 400);
        } else {
            const token = jwt.sign({ user_id: checkDatabase[0].user_id }, process.env.JWT_SECRET, { expiresIn: "30m" });
            return res.status(200).json({
                status: 200,
                success: true,
                result: {
                    token: token,
                }
            });
        }
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.code).json({
                status: error.code,
                succes: false,
                error: {
                    name: error.name,
                    message: error.message,
                }
            });
        } else {
            console.error(error);
            return res.status(500).json({
                status: 500,
                succes: false,
                error: {
                    name: error.name,
                    message: error.message,
                }


            });
        }
    }
});

const getUserByDisplayName = expressAsyncHandler(async (req, res) => {
    const { displayName } = req.params;
    try {
        let promiseArr = [];
        const user = poolQuery(getUserByDisplayNameQuery, [displayName])
        const posts = poolQuery(getThreadsByDisplayNameQuery, [displayName])
        const comments = poolQuery(getCommentsByDisplayNameQuery, [displayName])
        promiseArr.push(user, posts, comments);
        const [userResult, postsResult, commentsResult] = await Promise.all(promiseArr);
        return res.status(200).json({
            status: 200,
            success: true,
            result: {
                user_data: { ...userResult.rows[0] },
                posts: { ...postsResult.rows },
                comments: { ...commentsResult.rows },
            }
        });
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.code).json({
                status: error.code,
                succes: false,
                error: {
                    name: error.name,
                    message: error.message,
                }
            });
        } else {
            console.error(error);
            return res.status(500).json({
                status: 500,
                succes: false,
                error: {
                    name: error.name,
                    message: error.message,
                }
            });
        }
    }
});

module.exports = {
    registerUser,
    loginUser,
    getUserByDisplayName,
    /*
    getUserPosts,
    getUserComments,
    */
}