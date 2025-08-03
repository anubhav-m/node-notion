import express from 'express'
import { updateUser } from '../controllers/user.controllers.js';
import { authorize } from '../middlewares/auth.middlewares.js'

export const userRouter = express.Router();

userRouter.put('/update/:id', authorize, updateUser);

