const express = require('express');
const app = express();
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

// UNUSED
const checkJWT = require('./routes/auth');
// example:
// app.use(./api', checkJWT, router);

app.use('/api', threadsRouter);
app.use('/api', topicsRouter);
app.use('/api', usersRouter);

app.listen(PORT, () => {
    console.log('Listening on port ', PORT);
})