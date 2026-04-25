import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import PostCardSkeleton from '../components/PostCardSkeleton';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const res = await fetch('/api/post/getposts');
                const data = await res.json();

                if (!data.success) {
                    throw new Error(data.message || 'Failed to fetch posts');
                }

                setPosts(data.posts);
            }

            catch (err) {
                console.error("Error fetching posts:", err);
            }

            finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    return (
        <div className="flex-1">
            <div className="flex flex-col gap-6 p-4 lg:p-24 max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold lg:text-6xl">Welcome to NodeNotion</h1>
                <p className="text-gray-500 text-xs sm:text-sm">Here you'll find a variety of articles and tutorials on topics such as web development, programming languages, software engineering, and more.</p>
            </div>

            <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
                <div className="flex flex-col gap-6">
                    <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
                    <div className="flex flex-wrap gap-y-6 gap-x-2 justify-center">
                        {loading ? (
                            Array.from({ length: 6 }).map((_, index) => (
                                <PostCardSkeleton key={index} />
                            ))
                        ) : (
                            posts && posts.length > 0 ? (
                                posts.map((post) => (
                                    <PostCard key={post._id} post={post} />
                                ))
                            ) : (
                                <p className='text-center text-gray-500'>No posts found.</p>
                            )
                        )}
                    </div>

                    <Link to='/search' className='mt-5 text-xs sm:text-sm text-teal-500 font-bold hover:underline text-center'>
                        View all posts
                    </Link>
                </div>
            </div>

        </div>
    )
}