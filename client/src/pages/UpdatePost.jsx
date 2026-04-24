import { TextInput, Select, FileInput, Alert, Spinner, Textarea } from 'flowbite-react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError, clearError } from '../redux/user/userSlice.js';
import { supabase } from '../supabase/supabaseClient.js'
import { useNavigate, useParams } from 'react-router-dom'
import { marked } from 'marked';
import DOMPurify from 'dompurify';


export default function UpdatePost() {

    const { error } = useSelector(state => state.user);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'uncategorized'
    });
    const dispatch = useDispatch();
    const [imageFile, setImageFile] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const navigate = useNavigate();
    const { postId } = useParams();

    console.log(`form data`, formData);

    useEffect(() => {
        try {
            const fetchPost = async () => {
                const res = await fetch(`/api/post/getposts?postId=${postId}`);
                const data = await res.json();

                if (!res.ok){
                    throw new Error('Not able to fetch the post');
                }

                dispatch(setError(null));
                setFormData(data.posts[0]);
                setImageFileUrl(data.posts[0].image);
            }
            fetchPost();
        }
        catch (error) {
            dispatch(setError(error.message));
        }
    }, [postId])

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    }

    const handleUpload = async () => {
        dispatch(clearError());
        setUploadingImage(true);

        try {
            if (!imageFile) {
                throw new Error('Please select an image');
            }

            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { data, error } = await supabase.storage
                .from('post-image')
                .upload(filePath, imageFile);

            if (error) {
                throw new Error(error.message);
            }

            const { data: publicUrlData } = supabase
                .storage
                .from('post-image')
                .getPublicUrl(filePath);

            if (!publicUrlData || !publicUrlData.publicUrl) {
                throw new Error('Public URL not available');
            }

            setImageFileUrl(publicUrlData.publicUrl);
            setFormData({ ...formData, image: publicUrlData.publicUrl });
        }
        catch (err) {
            dispatch(setError(err.message || 'Something went wrong during upload'));
        }
        finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e) => {
        dispatch(clearError());
        e.preventDefault();
        try {
            console.log(formData);
            //Validation
            if (!formData.title?.trim() || !formData.content?.trim()) {
                throw new Error('Please fill all the required fields');
            }
            //

            const res = await fetch(`/api/post/updatepost/${formData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!data.success) {
                throw new Error(data.message);
            }

            if (data.success) {
                navigate(`/post/${data.post.slug}`)
            }
        }

        catch (err) {
            dispatch(setError(err.message || 'Something went wrong while publishing'));
        }
    }

    return (
        <div className="flex-1 w-full md:max-w-6xl self-center px-6">
            <h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-4 justify-between mb-5">
                    <TextInput type='text' placeholder='Title' id='title' className='flex-3' required onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} value={formData.title}/>
                    <Select className='flex-1' onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))} value={formData.category}>
                        <option value="uncategorized">Select a category</option>
                        <option value="javascript">JavaScript</option>
                        <option value="reactjs">React.js</option>
                        <option value="expressjs">Express.js</option>
                    </Select>
                </div>

                <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 mb-5">
                    <FileInput type='file' accept='image/*' onChange={handleImageChange}></FileInput>
                    <button className="cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" type='button'>
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent"
                            onClick={handleUpload}
                        >
                            {
                                uploadingImage ?
                                    (
                                        <>
                                            <Spinner size='sm' />
                                            <span className='pl-3'>Loading...</span>
                                        </>
                                    )
                                    :
                                    (
                                        'Upload image'
                                    )
                            }
                        </span>
                    </button>

                </div>

                {imageFileUrl &&
                    (
                        <img src={imageFileUrl} className='h-90 w-auto object-contain' />
                    )
                }

                {error &&
                    (
                        <Alert color='red'>{error}</Alert>
                    )
                }

                <div className="flex flex-col md:flex-row gap-4 mb-15">
                    <div className="flex-1">
                        <h2 className="text-sm font-semibold mb-2 text-gray-500 italic">Markdown Editor</h2>
                        <Textarea
                            placeholder='Write something...'
                            className='h-72'
                            required
                            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                            value={formData.content}
                            onKeyDown={(e) => {
                                if (e.key === 'Tab') {
                                    e.preventDefault();
                                    const { selectionStart, selectionEnd, value } = e.target;
                                    const newValue = value.substring(0, selectionStart) + '    ' + value.substring(selectionEnd);
                                    setFormData(prev => ({ ...prev, content: newValue }));
                                    setTimeout(() => {
                                        e.target.selectionStart = e.target.selectionEnd = selectionStart + 4;
                                    }, 0);
                                }
                            }}
                        />
                    </div>
                    
                    <div className="flex-1">
                        <h2 className="text-sm font-semibold mb-2 text-gray-500 italic">Live Preview</h2>
                        <div 
                            className='h-72 p-4 border border-gray-300 dark:border-gray-600 rounded-lg overflow-y-auto post-content bg-gray-50 dark:bg-gray-800'
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(marked.parse(formData.content || ''))
                            }}
                        />
                    </div>
                </div>

                <button className="cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-15 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800" type='submit'>
                    <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        Update
                    </span>
                </button>
            </form>
        </div>
    )
}