import express from 'express';
import { authorize } from '../middlewares/auth.middlewares.js'
import { createPost, getPosts } from '../controllers/post.controllers.js';

export const postRouter = express.Router();

postRouter.post('/create', authorize, createPost);
postRouter.get('/getposts', getPosts);