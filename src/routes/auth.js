const jwt = require('jsonwebtoken');
const util = require('util');
const { pool } = require('../database/dbConfig');
const poolQuery = util.promisify(pool.query).bind(pool);

// expects { user_id: someUserIdHere }

async function checkJWT(req, res, next) {
    const authHeader = req.headers['authorization'];
    const JWT = authHeader.split(' ')[1];
    if (JWT == null) return res.sendStatus(401);

    jwt.verify(JWT, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                const user_id = jwt.decode(JWT).user_id;
                const checkExists = (await poolQuery('SELECT user_id FROM "user" WHERE user_id = $1', [user_id])).rows[0];
                if (checkExists.length === 0) return res.sendStatus(403);
                const newJWT = jwt.sign({ user_id: user_id }, process.env.JWT_SECRET, { expiresIn: '10m' });
                res.setHeader('Authorization', 'Bearer ' + newJWT);
                req.user = user;
                next();
            } else {
                return res.sendStatus(403);
            }
        } else {
            req.user = user;
            next();
        }
    })
}


module.exports = checkJWT;