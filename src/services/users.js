const expressAsyncHandler = require('express-async-handler');
const util = require('util');
const { pool } = require('../database/dbConfig');
const poolQuery = util.promisify(pool.query).bind(pool);

const {
    registerUserQuery,
    checkEmailQuery,
    checkUsernameExists,
    getUserByLoginInfoQuery,
    getUserByUsernameQuery,
} = require('../database/queries/users');

const registerUser = expressAsyncHandler(async (req, res) => {
    const {
        email,
        username,
        password,
        displayName,
    } = req.body;
    let isValid = value => value != null && value != undefined
    if ([email, username, password, displayName].filter(isValid).length > 0) {
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
        const userEmailExists = (await poolQuery(checkEmailQuery, email)).rows[0];
        console.log(userEmailExists);
        return res.status(200).json({
            status: 200,
            success: true,
            result: { ...userEmailExists }
        });
    } catch (e) {
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
    registerUser,
    /*
    getUserById,
    loginUser,
    getUserPosts,
    getUserComments,
    */
}