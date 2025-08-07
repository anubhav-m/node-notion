import { useEffect, useState } from "react";
import moment from 'moment';

export default function Comment({ comment }) {
    const [user, setUser] = useState({});

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
                </div>
     
        </div>
    )
}