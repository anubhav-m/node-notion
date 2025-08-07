import express from 'express'
import { createComment } from '../controllers/comment.controllers.js';
import { authorize } from '../middlewares/auth.middlewares.js'

export const commentRouter = express.Router();

commentRouter.post('/create', authorize, createComment);