import { TextInput, Select, FileInput, Alert, Spinner } from 'flowbite-react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError, clearError } from '../redux/user/userSlice.js';
import { supabase } from '../supabase/supabaseClient.js'


export default function CreatePost() {
   
    const { error } = useSelector(state => state.user);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const [imageFile, setImageFile] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imageFileUrl, setImageFileUrl] = useState(null);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    }

    const handleUpload = async () => {
        dispatch(clearError());
        setUploadingImage(true);

        if (!imageFile) {
            setUploadingImage(false);
            dispatch(setError('Please select an image'));
            return;
        }

        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await supabase.storage
            .from('post-image')
            .upload(filePath, imageFile);

        if (error) {
            dispatch(setError(error.message));
            setUploadingImage(false);
            return;
        }

        const { data: publicUrlData } = supabase
            .storage
            .from('post-image')
            .getPublicUrl(filePath);

        if (!publicUrlData) {
            dispatch(setError('Public URL not available'));
            setUploadingImage(false);
            return;
        }

        setImageFileUrl(publicUrlData.publicUrl);
        setUploadingImage(false);


        setFormData({ ...formData, image: publicUrlData.publicUrl });
    }

    console.log(formData);

    return (
        <div className="flex-1 w-full md:max-w-5xl self-center px-6">
            <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>

            <form className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4 justify-between mb-5">
                    <TextInput type='text' placeholder='Title' id='title' className='flex-1' />
                    <Select>
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
                        <img src={imageFileUrl} />
                    )
                }

                {error &&
                    (
                        <Alert color='red'>{error}</Alert>
                    )
                }

                <ReactQuill theme='snow' className='h-72 mb-15' required />

                <button className="cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                    <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                        Publish
                    </span>
                </button>
            </form>
        </div>
    )
}