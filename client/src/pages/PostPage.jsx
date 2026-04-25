import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import { HashLoader } from 'react-spinners'
import { Button } from "flowbite-react";
import CommentSection from "../components/CommentsSection.jsx"
import { marked } from 'marked';
import DOMPurify from 'dompurify';

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

    useEffect(() => {
        const codeBlocks = document.querySelectorAll('.post-content pre');
        codeBlocks.forEach((block) => {
            if (block.querySelector('.copy-button')) return;

            const button = document.createElement('button');
            button.innerText = 'Copy';
            button.className = 'copy-button';

            button.onclick = () => {
                const code = block.querySelector('code').innerText;
                navigator.clipboard.writeText(code).then(() => {
                    button.innerText = 'Copied!';
                    button.classList.add('bg-green-500', 'text-white');
                    setTimeout(() => {
                        button.innerText = 'Copy';
                        button.classList.remove('bg-green-500', 'text-white');
                    }, 2000);
                });
            };

            block.appendChild(button);
        });
    }, [post]);

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
                            <div className="flex flex-col items-center justify-center gap-4 mt-5">
                                <Link to={`/search?category=${post.category}`}>
                                    <Button color='gray' pill size='xs' className="cursor-pointer hover:text-blue-400">{post.category}</Button>
                                </Link>
                                <div className="flex items-center gap-2">
                                    <img src={post.userId?.profilePic} alt={post.userId?.username} className="h-10 w-10 rounded-full object-cover border-2 border-teal-500" />
                                    <span className="font-semibold text-sm">@{post.userId?.username}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center">
                                <img src={post.image} alt={post.title} className="mt-7 p-3 max-h-[600px] w-full max-w-5xl object-cover" />
                                <div className="flex justify-between p-3 border-b border-slate-500 text-xs w-full max-w-5xl mx-auto">
                                    <span className="">{new Date(post.createdAt).toLocaleDateString()}</span>
                                    <span className="italic">{(post.content.length / 1000).toFixed(0)} mins read</span>
                                </div>
                            </div>

                            <div
                                dangerouslySetInnerHTML={{
                                    __html: post && DOMPurify.sanitize(marked.parse(post.content))
                                }}
                                className="p-2 max-w-2xl mx-auto w-full my-7 post-content"
                            ></div>

                            <CommentSection postId={post._id} />
                        </>
                    )
                )

            }
        </div>
    )
}