import { useSelector } from 'react-redux'
import { TextInput, Button } from 'flowbite-react';
import { useState, useRef, useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient.js'

export default function DashProfile() {
    const { currentUser } = useSelector(state => state.user);
    // const [imageFile, setImageFile] = useState(null);
    // const [imageFileUrl, setImageFileUrl] = useState(null);
    // const filePickerRef = useRef(null);


    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setImageFile(e.target.files[0]);
    //         setImageFileUrl(URL.createObjectURL(file));
    //     }
    // }


    // useEffect(() => {
    //     if (imageFile) {
    //         uploadImage();
    //     }
    // }, [imageFile]);

    // const uploadImage = async () => {
    //     console.log('Uploading image...')
    // }

    return (
        <div className='flex flex-col items-center'>
            <h1 className='my-7 font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-5 w-full items-center'>
                {/* <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden /> */}
                <div className='w-32 h-32 shadow-md overflow-hidden rounded-full' 
                // onClick={() => filePickerRef.current.click()}
                >
                    <img src={
                        // imageFileUrl || 
                        currentUser.profilePic} referrerPolicy="no-referrer" alt="user" className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' />
                </div>

                <div className='flex flex-col gap-5 p-5 w-full md:w-100'>
                    <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
                    <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} />
                    <TextInput type='password' id='password' placeholder='password' />
                    <button type='submit' className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 cursor-pointer">
                        <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                            Update
                        </span>
                    </button>
                </div>
            </form>

            <div className='flex justify-between px-5 w-full md:w-100'>
                <Button outline color='red' className='cursor-pointer'>Delete Account</Button>
                <Button outline color='yellow' className='cursor-pointer'>Sign Out</Button>
            </div>
        </div>
    )
}