import User from "../models/user.models.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";

export const SignUp = async (req, res, next) => {
    try {

        const { username, email, password } = req.body;

        if (
            !username ||
            !email ||
            !password ||
            username.trim() === "" ||
            email.trim() === "" ||
            password.trim() === ""
        ) {
            errorHandler(400, 'All fields are required');
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'User signed up successfully'
        });
    }

    catch (err) {
        next(err);
    }
}

export const SignIn = async () => {
    try {

    }

    catch (err) {

    }
}