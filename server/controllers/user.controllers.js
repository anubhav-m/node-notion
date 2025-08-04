import bcrypt from "bcryptjs";
import { errorThrower, errorSetter } from "../utils/error.js"
import User from "../models/user.models.js";

export const updateUser = async (req, res, next) => {

    try {
        if (req.params.id !== req.user.id) {
            errorThrower(403, 'You are not allowed to update this user');
        }

        if (!(req.body.username || req.body.password || req.body.profilePic)){
            errorThrower(400, 'Nothing to update')
        }

        if (req.body.password) {
            if (req.body.password.length < 5 || req.body.password.length > 14) {
                errorThrower(400, 'Password must be atleast 5 and atmost 14 characters');
            }

            if (req.body.password.includes(' ')) {
                errorThrower(400, 'Password cannot contain spaces');
            }

            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }



        if (req.body.username) {
            if (req.body.username.length < 5 || req.body.username.length > 30) {
                errorThrower(400, 'Username must be atleast 5 and atmost 30 characters');
            }

            if (req.body.username.includes(' ')) {
                errorThrower(400, 'Username cannot contain spaces');
            }

            if (req.body.username !== req.body.username.toLowerCase()) {
                errorThrower(400, 'Username must be in lowercase')
            }

            if (!req.body.username.match(/^[a-z0-9]+$/)) {
                errorThrower(400, 'Username can only contain letters and numbers')
            }
        }

        let updatedUser;

        if (req.body.profilePic) {
            updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: { profilePic: req.body.profilePic }
            }, { new: true })
        }

        if (req.body.username) {
            updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: { username: req.body.username }
            }, { new: true })
        }

        if (req.body.password) {
            updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: { password: req.body.password }
            }, { new: true })
        }

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user: rest
        })
    }
    catch (err) {
        if (err.code === 11000) {
            const duplicateField = Object.keys(err.keyPattern)[0];

            if (duplicateField === 'username') {
                const usernameError = errorSetter(400, `Username not available`);
                next(usernameError);
            }

        }
        next(err);

    }
}

export const deleteUser = async (req, res, next) => {
    try {
        if (req.params.id !== req.user.id) {
            errorThrower(403, 'You are not allowed to delete this user');
        }

        await User.findByIdAndDelete(req.params.id);
        
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    }
    catch (err) {
        next(err);
    }
}

export const signOut = async (req, res, next) => {
    try{
        res.clearCookie('access_token').status(200).json({
            success:true,
            message:"User signed out successfully"
        })
    }

    catch(err){
        next(err);
    }
}