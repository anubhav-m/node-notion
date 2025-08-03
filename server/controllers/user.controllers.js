import bcrypt from "bcryptjs";
import { errorThrower } from "../utils/error.js"
import User from "../models/user.models.js";

export const updateUser = async (req, res, next) => {
    try {
        if (req.params.id !== req.user.id) {
            errorThrower(403, 'You are not allowed to update this user');
        }

        if (req.body.password) {
            if (req.body.password.length < 6 || req.body.password.length > 15) {
                errorThrower(400, 'Password must be atleast 6 and atmost 15 characters');
            }

            if (req.body.password.includes(' ')) {
                errorThrower(400, 'Password cannot contain spaces');
            }

            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

       

        if (req.body.username) {
            if (req.body.username.length < 5 || req.body.username.length > 14) {
                errorThrower(400, 'Usernmae must be atleast 5 and atmost 14 characters');
            }

            if (req.body.username.includes(' ')) {
                errorThrower(400, 'Username cannot contain spaces');
            }

            if (req.body.username !== req.body.username.toLowerCase()) {
                errorThrower(400, 'Username must be in lowercase')
            }

            if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
                errorThrower(400, 'Username can only contain letters and numbers')
            }
        }

        let updatedUser;

        if (req.body.username && req.body.password) {
            updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: {username: req.body.username, password: req.body.password}
            }, {new:true})
        }

        else if (req.body.username){
            updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: {username: req.body.username}
            }, {new:true})
        }

        else if (req.body.password){
            updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: {password: req.body.password}
            }, {new:true})
        }

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user: rest
        })
    }
    catch (err) {
        next(err);
    }
}