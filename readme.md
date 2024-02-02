# README

Forum Backend API using Node.js and Express.
Uses Postgresql database.

## 1. Set-up

1. Download the source files.
2. Run the `src/database/init.sql` script on your database.
3. Create a `.env` file based on `.env.example`.
4. Install dependencies by opening a command line and running `npm install`
5. Run `npm start`

## 2. Endpoints

## **Note: All endpoints have the prefix `/api`**

### 2.1. Threads and comments

| HTTP Method | Endpoint                                    | Description                                     |
| :---------: | :------------------------------------------ | :---------------------------------------------- |
|    POST     | /newThread                                  | Submit a new thread                             |
|     GET     | /thread/`:thread_id`                        | Get thread with id `:thread_id`                 |
|    POST     | /thread/`:thread_id`/vote                   | Submit a vote to thread                         |
|    POST     | /thread/`:thread_id`/newComment             | Submit a new comment to thread                  |
|     GET     | /thread/`:thread_id`/comments               | Get all comments for thread `:thread_id`        |
|     GET     | /comment/`:comment_id`                      | Get comment with id `:comment_id`               |
|    POST     | /thread/`:thread_id`/`:comment_id`/newReply | Submit reply to a comment with id `:comment_id` |
|    POST     | /thread/`:thread_id`/`:comment_id`/vote     | Submit a vote for comment with id `:comment_id` |
|     GET     | /topic/`:topic_id`/threads                  | Get all threads under topic `:topic_id`         |

### 2.2. Users

#### TBA
