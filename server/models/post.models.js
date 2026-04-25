import mongoose from "mongoose";
import { Comment } from "./comment.models.js";


const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
        index: true
    },

    content: {
        type:String,
        required: true,
    },

    title: {
        type: String,
        required: true,
        unique: true
    },

    image: {
        type: String,
        default:'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post.jpeg'
    },
    
    category:{
        type: String,
        default: 'uncategorized'
    },

    slug:{
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

postSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    await Comment.deleteMany({ postId: this._id });
    next();
});

postSchema.pre('deleteMany', async function (next) {
    const posts = await this.model.find(this.getQuery());
    const postIds = posts.map(post => post._id);
    await Comment.deleteMany({ postId: { $in: postIds } });
    next();
});

export const Post = mongoose.model('Post', postSchema);