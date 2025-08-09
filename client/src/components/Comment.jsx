import { useEffect, useState } from "react";
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa'
import { useSelector } from "react-redux";

export default function Comment({ comment, onLike }) {
    const [user, setUser] = useState({});
    const { currentUser } = useSelector(state=>state.user);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();

                if (!data.success) {
                    throw new Error('User not found');
                }

                setUser(data.user);

            }
            catch (error) {
                setError('User not found');
            }
        }

        getUser();
    }, [comment])

    return (
        <div className="flex border-b dark:border-gray-600 text-sm mb-10 pb-2">
                <div className="flex-shrink-0 mr-4">
                    <img className="w-10 h-10 rounded-full object-cover bg-gray-200" src={user.profilePic} alt={user.username} />
                </div>
                <div className="flex-1">
                    <div className="flex items-center mb-3">
                        <span className="font-bold mr-3 text-xs truncate ">{user ? `@${user.username}` : 'anonymous'}</span>
                        <span className="text-gray-500 text-xs">
                            {moment(comment.createdAt).fromNow()}
                        </span>
                    </div>

                    <p className="text-gray-500 pb-2">{comment.content}</p>

                    <div className="flex gap-3 items-center text-xs mb-1 border-t dark:border-gray-700 max-w-fit pt-2" onClick={()=>onLike(comment._id)}>
                        <button type="button" className={`pb-1 cursor-pointer text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-600'}`}>
                            <FaThumbsUp className="text-sm" />
                        </button>

                        <p className="text-gray-400">
                            {   
                                comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? 'like' : 'likes')
                            }
                        </p>
                    </div>
                </div>
     
        </div>
    )
}