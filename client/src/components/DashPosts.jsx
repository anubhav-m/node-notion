import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { setError, clearError } from '../redux/user/userSlice.js'
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { HashLoader } from 'react-spinners'

export default function DashPosts() {
    const { currentUser } = useSelector(state => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [loadingPost, setLoadingPost] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                dispatch(setError(false));
                setLoadingPost(true);
                const res = await fetch(`api/post/getPosts?userId=${currentUser._id}`);
                const data = await res.json();

                if (!data.success) {
                    new Error('Error fetching data from server');
                }

                else {
                    setUserPosts(data.posts);

                    if (data.posts.length < 9) {
                        setShowMore(false);
                    }
                }
            }
            catch (err) {
                dispatch(setError(err.message));
            }
            finally {
                setLoadingPost(false);
            }
        }
        fetchPosts();
    }, [currentUser._id])

    const handleShowMore = async () => {
        const startIndex = userPosts.length;

        try {
            const res = await fetch(`/api/post/getPosts/?userId=${currentUser._id}&startIndex=${startIndex}`);
            const data = await res.json();

            if (!data.success) {
                throw new Error('Error fetching more posts');
            }

            else {
                setUserPosts((prev) => [...prev, ...data.posts]);
                if (data.posts.length < 9) {
                    setShowMore(false);
                }
            }
        }

        catch (err) {
            dispatch(setError(err.message));
        }
    }

    return (
        <div className="max-w-full h-full overflow-x-auto p-5
        scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            {loadingPost ?
                (
                    <div className="w-full flex justify-center items-center h-full">
                        <HashLoader className="text-center" color="aqua" size='50' loading={loadingPost} />
                    </div>
                ) : (
                    currentUser && userPosts.length > 0 ?
                        (
                            <>
                                <Table hoverable className="shadow-md">
                                    <TableHead>
                                        <TableHeadCell>Date updated</TableHeadCell>
                                        <TableHeadCell>Post image </TableHeadCell>
                                        <TableHeadCell>Post title </TableHeadCell>
                                        <TableHeadCell>Category </TableHeadCell >
                                        <TableHeadCell>Delete</TableHeadCell >
                                        <TableHeadCell><span>Edit</span></TableHeadCell>
                                    </TableHead>


                                    <TableBody className="divide-y">
                                        {
                                            userPosts.map((post) => (

                                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                    <TableCell>
                                                        {new Date(post.updatedAt).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Link to={`/post/${post.slug}`}>
                                                            <img src={post.image} alt={post.title} className="w-20 h-10 object-cover bg-gray-500" />
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell className="truncate">
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

                                            ))
                                        }
                                    </TableBody>
                                </Table>

                                {
                                    showMore && (
                                        <Button onClick={handleShowMore} className="mt-5 mx-auto cursor-pointer" color='blue' outline>
                                            Show More
                                        </Button>
                                    )
                                }

                            </>

                        ) : (
                            <p className="text-center text-xl">You have no posts yet</p>
                        )
                )
            }

        </div>
    )
}