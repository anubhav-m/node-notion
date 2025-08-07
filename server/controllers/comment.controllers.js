import { Comment } from "../models/comment.models.js";

export const createComment = async(req, res, next) => {
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