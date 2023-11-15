import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import UserRouter from './router/users.js';
import AuthUser from './router/auth.js';
import cookieParser from 'cookie-parser';
import VideoRouter from './router/videos.js';
import CommentRouter from './router/comments.js';

const app = express();

//dotenv config

dotenv.config();
// mongo db connection
const connect = () => {
  mongoose
    .connect(process.env.DataBase)
    .then(() => {
      console.log('mongo db is connect');
    })
    .catch((error) => {
      throw error;
    });
};

//router on this

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use('/api/users', UserRouter);
app.use('/api/auth', AuthUser);
app.use('/api/videos', VideoRouter);
app.use('/api/comment', CommentRouter);

// error handling for server

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message =
    err.message || "something wrong! their don't no servers this error ";
  return res.status(status).json({
    success: false,
    status: status,
    message: message,
  });
});

//Listen to server
const Port = process.env.Port1 || 5001;
app.listen(5001, () => {
  connect();
  console.log('port is connect at ' + Port);
});
