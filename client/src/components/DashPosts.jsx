import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { setError, clearError } from '../redux/user/userSlice.js'
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Button, Modal, ModalHeader, ModalBody } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { HashLoader } from 'react-spinners'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

export default function DashPosts() {
    const { currentUser } = useSelector(state => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [loadingPost, setLoadingPost] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                dispatch(setError(false));
                setLoadingPost(true);

                let res;
                if (currentUser.isAdmin) {
                    res = await fetch(`api/post/getPosts`);
                }

                else {
                    res = await fetch(`/api/post/getPosts/?userId=${currentUser._id}`);
                }

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

    const handleDeletePost = async () => {
        setShowModal(false);
        dispatch(clearError());
        try {
            const res = await fetch(`/api/post/deletepost/${postIdToDelete}`, {
                method: 'DELETE',
            })

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            else {
                setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete))
            }
        }
        catch (error) {
            dispatch(setError(error.message));
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
                                        {currentUser.isAdmin && <TableHeadCell>User image</TableHeadCell>}
                                        {currentUser.isAdmin && <TableHeadCell>Username</TableHeadCell>}
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
                                                    {currentUser.isAdmin &&
                                                        <>
                                                            <TableCell className="truncate">
                                                                <img src={post.userId.profilePic} alt={post.userId.username} className="w-10 h-10 object-cover rounded-full bg-gray-500" referrerPolicy="no-referrer" />
                                                            </TableCell>
                                                            <TableCell>
                                                                {post.userId.username}
                                                            </TableCell>

                                                        </>
                                                    }

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
                                                        <span onClick={() => {
                                                            setShowModal(true);
                                                            setPostIdToDelete(post._id);
                                                        }} className="font-medium text-red-500 hover:underline cursor-pointer"> Delete</span>
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

            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this post?</h3>
                        <div className='flex justify-between px-7'>
                            <Button color='red' onClick={handleDeletePost} className='cursor-pointer'>
                                Yes, I am sure
                            </Button>

                            <Button onClick={() => setShowModal(false)} className='cursor-pointer'>No, cancel</Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>

        </div>
    )
}