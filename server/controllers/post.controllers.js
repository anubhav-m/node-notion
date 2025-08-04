import { errorSetter, errorThrower } from "../utils/error.js";
import { Post } from "../models/post.models.js";

export const createPost = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            errorThrower(403, 'Unauthorized - only admins can create a post');
        }

        if (!req.body.title || !req.body.content){
            errorThrower(400, 'Please provide all required fields');
        }

        const slug = req.body.title.split(" ").join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
        const newPost = new Post({
            ...req.body,
            slug,
            userId: req.user.id
        })

        const savedPost = await newPost.save();
        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            post: savedPost
        });
    }

    catch (err) {
        if (err.code === 11000){
            next(errorSetter(409,'A post with this title already exists'));
        }

        next(err);
    }
}