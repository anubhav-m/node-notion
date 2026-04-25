import express from 'express'
import { SignUp, SignIn, Google, checkAuth } from '../controllers/auth.controllers.js'
import { authorize } from '../middlewares/auth.middlewares.js'


export const authRouter = express.Router();

authRouter.post('/signup', SignUp);

authRouter.post('/signin', SignIn);

authRouter.post('/google', Google);

authRouter.get('/check-auth', authorize, checkAuth);