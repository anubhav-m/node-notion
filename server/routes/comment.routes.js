import express from 'express'
import { createComment, getPostComments, likeComment} from '../controllers/comment.controllers.js';
import { authorize } from '../middlewares/auth.middlewares.js'

export const commentRouter = express.Router();

commentRouter.post('/create', authorize, createComment);
commentRouter.get('/getPostComments/:postId', getPostComments);
commentRouter.put('/likeComment/:commentId' , authorize, likeComment);