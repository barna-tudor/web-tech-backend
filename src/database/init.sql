DROP TABLE IF EXISTS "user"     CASCADE;
DROP TABLE IF EXISTS topic      CASCADE;
DROP TABLE IF EXISTS thread     CASCADE;
DROP TABLE IF EXISTS "comment"  CASCADE;
DROP TABLE IF EXISTS comment_vote;
DROP TABLE IF EXISTS thread_vote;

CREATE TABLE "user"(
    user_id         SERIAL  PRIMARY KEY,
    username        TEXT    UNIQUE  NOT NULL,
    display_name    TEXT    UNIQUE  NOT NULL,
    email           TEXT    UNIQUE  NOT NULL,
    password        TEXT    NOT NULL,
    join_date       DATE    DEFAULT CURRENT_DATE
);

CREATE TABLE topic(
    topic_id    SMALLSERIAL PRIMARY KEY,
    topic_title TEXT        NOT NULL
);

CREATE TABLE thread(
    thread_id           SERIAL  PRIMARY KEY,
    thread_title        TEXT    NOT NULL,
    thread_body         TEXT    NOT NULL,
    created_time        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id             INT,
    topic_id            INT,
    CONSTRAINT fk_user  FOREIGN KEY(user_id) REFERENCES "user"(user_id),
    CONSTRAINT fk_topic FOREIGN KEY(topic_id) REFERENCES topic(topic_id)
);

CREATE TABLE "comment"(
    comment_id          SERIAL      PRIMARY KEY,
    comment_body        TEXT        NOT NULL,
    created_time        TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    user_id             INT         NOT NULL,
    thread_id           INT         NOT NULL,
    is_reply            BOOLEAN     DEFAULT FALSE,
    reply_comment_id	INT         DEFAULT 0,
    CONSTRAINT fk_user  FOREIGN KEY(user_id) REFERENCES "user"(user_id),
    CONSTRAINT fk_thread FOREIGN KEY(thread_id) REFERENCES thread(thread_id),
    CONSTRAINT fk_comment FOREIGN KEY(comment_id) REFERENCES "comment"(comment_id),
    CONSTRAINT fk_reply_comment FOREIGN KEY(reply_comment_id) REFERENCES "comment"(comment_id)
);

CREATE TABLE comment_vote(
    user_id             INT         NOT NULL,
    comment_id          INT         NOT NULL,
    vote                SMALLINT    NOT NULL, -- 1 / -1; delete entry on 0;
    CONSTRAINT fk_user  FOREIGN KEY(user_id) REFERENCES "user"(user_id),
    CONSTRAINT fk_comment FOREIGN KEY(comment_id) REFERENCES "comment"(comment_id)
);

CREATE TABLE thread_vote(
    user_id             INT         NOT NULL,
    thread_id           INT         NOT NULL,
    vote                SMALLINT    NOT NULL, -- 1 / -1; delete entry on 0;
    CONSTRAINT fk_user  FOREIGN KEY(user_id) REFERENCES "user"(user_id),
    CONSTRAINT fk_thread FOREIGN KEY(thread_id) REFERENCES thread(thread_id)
);