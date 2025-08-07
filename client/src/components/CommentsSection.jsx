import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Textarea, Alert } from 'flowbite-react'
import { useState, useEffect } from 'react';
import Comment from './Comment.jsx'

export default function CommentsSection({ postId }) {
    const { currentUser } = useSelector(state => state.user);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getComments = async () => {

            try {
                const res = await fetch(`/api/comment/getPostComments/${postId}`);
                const data = await res.json();

                if (!data.success) {
                    throw new Error('Error loading user comments');
                }

                setError(null);
                setComments(data.comments);

            }

            catch (error) {
                setError('Error loading user comments');
            }
        }
        getComments();
    }, [postId]);

    const handleSubmit = async (e) => {

        e.preventDefault();
        setError(null);

        try {

            if (comment.length > 200) {
                throw new Error('Only 200 characters allowed for comment');
            }

            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: comment,
                    postId
                })
            });

            const data = await res.json();

            if (!data.success) {
                throw new Error('Unable to comment, try again later!!');
            }

            setError(null);
            setComment('');
            setComments((prev)=>[data.comment, ...prev]);
        }

        catch (error) {
            setError(error.message);
        }

    }

    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {
                currentUser ? (
                    <>
                        <div className="flex itmes-center gap-3 my-5 text-gray-500 dark:text-blue-500 text-sm">
                            <p>Signed in as: </p>
                            <img src={currentUser.profilePic} alt={currentUser.username} className='h-5 w-5 object-cover rounded-full' />
                            <Link to={'/dashboard?tab=profile'} className='text-sm text-cyan-600 hover:underline'>
                                @{currentUser.username}
                            </Link>
                        </div>

                        <form className='border border-teal-500 rounded-md p-5 mb-6' onSubmit={handleSubmit}>
                            <Textarea placeholder='Add a comment...' rows='3' maxLength='200' className='resize-none' onChange={(e) => setComment(e.target.value)} value={comment} />
                            <div className='flex justify-between items-center mt-5 text-gray-500 text-xs'>
                                <p>{200 - comment.length} characters remaining</p>
                                <button type='submit' className="cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                                        Comment
                                    </span>
                                </button>
                            </div>
                        </form>

                        {
                            error &&
                            <Alert color='failure'>
                                {error}
                            </Alert>
                        }

                        {
                            comments.length === 0 ? (
                                <p className='text-sm my-5'>No comments yet!</p>
                            ) : (
                                <>
                                    <div className="text-sm my-5 flex items-center gap-1">
                                        <p>Comments</p>
                                        <p className='border border-gray-400 py-1 px-2 rounded-sm'>{comments.length}</p>
                                    </div>

                                    {
                                        comments.map(comment=>(
                                            <Comment key={comment._id} comment={comment}/>
                                        ))
                                    }
                                </>
                            )
                        }
                    </>
                ) : (
                    <div className="">
                        You must be signed in to comment.
                        <Link to='/sign-in'>Sign in</Link>
                    </div>
                )
            }
        </div>
    )
}