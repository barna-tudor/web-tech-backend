const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const dontenv = require('dotenv').config();
const PORT = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors({
    origin: process.env.FRONT_END
}))
const helmet = require('helmet');
app.use(helmet());

//routes:
const threadsRouter = require('./routes/threads');
const topicsRouter = require('./routes/topics');
const usersRouter = require('./routes/users');

app.use('/api', threadsRouter);
app.use('/api', topicsRouter);
app.use('/api', usersRouter);
//TODO: forgot_pass, send mail, 
//~~TODO: send "is_voted" on thread/comment if JWT user_id cast a vote~~
//TODO: register/login w/ google
app.listen(PORT, () => {
    console.log('Listening on port ', PORT);
})