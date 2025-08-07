import { Comment } from "../models/comment.models.js";
import { errorThrower } from "../utils/error.js";

export const createComment = async (req, res, next) => {
    try {
        const { content, postId } = req.body;
        const userId = req.user._id;

        const newComment = new Comment({
            content,
            postId,
            userId
        });

        await newComment.save();

        res.status(200).json({
            success: true,
            message: 'Comment created successfully',
            comment: newComment
        })
    }

    catch (err) {
        next(err);
    }
}

export const getPostComments = async (req, res, next) => {
    try {
        const postId = req.params.postId;

        if (!postId) {
            errorThrower(400, 'Please provide postId');
        }

        const comments = await Comment.find({ postId: req.params.postId }).sort({
            createdAt: -1
        });

        res.status(200).json({
            success: true,
            message: 'Sucessfully retreived all comments',
            comments
        })
    }

    catch (err) {
        next(err);
    }
}