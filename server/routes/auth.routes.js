import express from 'express'
import { SignUp, SignIn } from '../controlers/auth.controllers.js'

export const authRouter = express.Router();

authRouter.post('/signup', SignUp);

authRouter.post('/signin', SignIn);