import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import { HashLoader } from 'react-spinners'
import { Button } from "flowbite-react";
import CommentSection from "../components/CommentsSection.jsx"

export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();

                if (!data.success) {
                    throw new Error('Cannot fetch this post');
                }

                setPost(data.posts[0]);
                setError(null);
            }

            catch (error) {
                setError(error.message);
            }

            finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [postSlug]);

    return (
        <div className="flex-1 flex flex-col p-3">
            {
                (loading) ? (
                    <div className="m-auto">
                        <HashLoader className="text-center" color="aqua" size='50' loading={loading} />
                    </div>
                ) : (
                    post && (
                        <>
                            <h1 className="text-3xl m-6 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">{post.title}</h1>
                            <Link to={`/search?category=${post.category}`} className="self-center">
                                <Button color='gray' pill size='xs' className="cursor-pointer hover:text-blue-400">{post.category}</Button>
                            </Link>

                            <div className="self-center">
                                <img src={post.image} alt={post.title} className="mt-7 p-3 max-h-[600px] max-w-5xl object-cover items-center" />
                                <div className="flex justify-between p-3 border-b border-slate-500 text-xs max-w-5xl">
                                    <span className="">{new Date(post.createdAt).toLocaleDateString()}</span>
                                    <span className="italic">{(post.content.length / 1000).toFixed(0)} mins read</span>
                                </div>
                            </div>

                            <div dangerouslySetInnerHTML={{__html: post && post.content}} className="p-2 max-w-2xl mx-auto w-full my-7 post-content"></div>

                            <CommentSection postId={post._id} />
                        </>
                    )
                )

            }
        </div>
    )
}