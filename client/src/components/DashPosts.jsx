import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { setError, clearError } from '../redux/user/userSlice.js'
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from 'flowbite-react'
import { Link } from 'react-router-dom'

export default function DashPosts() {
    const { currentUser, error, loading } = useSelector(state => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const dispatch = useDispatch();

    console.log(userPosts);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`api/post/getPosts?userId=${currentUser._id}`);
                const data = await res.json();

                if (!data.success) {
                    new Error('Error fetching data from server');
                }

                else {
                    setUserPosts(data.posts);
                }
            }
            catch (err) {

                dispatch(setError(err.message));
            }   
        }
        fetchPosts();
    }, [currentUser._id])

    return (
        <div className="overflow-x-scroll w-full p-3 
        scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            {currentUser && userPosts.length>0 ? 
            (
                <Table hoverable className="shadow-md">
                    <TableHead>
                        <TableHeadCell>Date updated</TableHeadCell>
                        <TableHeadCell>Post image </TableHeadCell>
                        <TableHeadCell>Post title </TableHeadCell>
                        <TableHeadCell>Category </TableHeadCell >
                        <TableHeadCell>Delete</TableHeadCell >
                        <TableHeadCell><span>Edit</span></TableHeadCell>
                    </TableHead>

                    {
                        userPosts.map((post)=>(
                            <TableBody className="divide-y">
                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell>
                                        {new Date(post.updatedAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/post/${post.slug}`}>
                                            <img src={post.image} alt={post.title} className="w-20 h-10 object-cover bg-gray-500" />
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link className="font-medium text-gray-900 dark:text-white" to={`/post/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {post.category}
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-medium text-red-500 hover:underline cursor-pointer"> Delete</span>
                                    </TableCell>
                                    <TableCell>
                                        <Link className="text-teal-500 hover:underline" to={`/update-post/${post._id}`}>
                                            <span>Edit</span>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ))
                    }
                </Table>
            ):(
                <p>You have no posts yet</p>
            )}
        </div>
    )
}