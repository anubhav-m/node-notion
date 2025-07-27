import User from "../models/user.models.js"
import bcryptjs from 'bcryptjs'

export const SignUp = async (req, res) => {
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
            const error = new Error('All fields are required');
            error.statusCode = 400;
            throw error;
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
            message: 'User signed in successfully'
        });
    }

    catch (err) {
        res.status(err.statusCode || 400).json({
            success: false,
            message: `${err}`
        });
    }
}

export const SignIn = async () => {
    try {

    }

    catch (err) {

    }
}