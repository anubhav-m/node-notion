import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Textarea, Alert } from 'flowbite-react'
import { useState } from 'react';

export default function CommentsSection({ postId }) {
    const { currentUser } = useSelector(state => state.user);
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        console.log("i was touched ")
        e.preventDefault();
        setError(null);

        try {
            console.log("i was touched ")
            if (comment.length > 200) {
                throw new Error('Only 200 characters allowed for comment');
            }
            console.log("i was touched ")
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
            console.log("i was touched ")
            const data = await res.json();

            if (!data.success){
                throw new Error('Unable to comment, try again later!!');
            }

            setError(null);
            setComment('');
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