import { useSelector, useDispatch } from 'react-redux'
import { TextInput, Button, Spinner, Alert, Modal, ModalHeader, ModalBody } from 'flowbite-react';
import { useState, useRef, useEffect } from 'react';
import { updateStart, updateSuccess, updateFailure, clearError, deleteUserStart, deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice.js';
import { HiOutlineExclamationCircle } from 'react-icons/hi'

// import { supabase } from '../supabase/supabaseClient.js'

export default function DashProfile() {
    const { currentUser, loading, error } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});
    const [updateUserSuccess, setUserUpdateSuccess] = useState(null);
    const [showModal, setShowModal] = useState(false);


    const handleChange = (e) => {
        dispatch(clearError());
        setUserUpdateSuccess(null);
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.keys(formData).length === 0) {
            return;
        }

        try {
            dispatch(updateStart());

            const res = await fetch(`/api/user/update/${currentUser._id.toString()}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                dispatch(updateFailure(data.message));
                setUserUpdateSuccess(false);
            }

            else {
                dispatch(updateSuccess(data.user));
                setUserUpdateSuccess(true);
            }
        }
        catch (err) {
            dispatch(updateFailure(err.message));
            setUserUpdateSuccess(false);
        }
    }


    const handleDeleteUser = async() => {
        setShowModal(false);

        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id.toString()}`,{
                method: 'DELETE',
                'Content-Type': 'application/json'
            })

            const data = await res.json();

            if (!res.ok){
                dispatch(deleteUserFailure(data.message));
            }

            else{
                dispatch(deleteUserSuccess());
            }
        } 
        catch (error) {
            dispatch(deleteUserFailure(error.message));  
        }
    }

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
            <form className='flex flex-col gap-5 w-full items-center' onSubmit={handleSubmit}>
                {/* <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden /> */}
                <div className='w-32 h-32 shadow-md overflow-hidden rounded-full'
                // onClick={() => filePickerRef.current.click()}
                >
                    <img src={
                        // imageFileUrl || 
                        currentUser.profilePic} referrerPolicy="no-referrer" alt="user" className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' />
                </div>

                <div className='flex flex-col gap-5 p-5 w-full md:w-100'>
                    <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange} />
                    {/* <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} /> */}
                    <TextInput type='password' id='password' placeholder='password' onChange={handleChange} />
                    <button type='submit' className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 cursor-pointer" disabled={loading}>
                        <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                            {
                                loading ? (
                                    <>
                                        <Spinner size='sm' />
                                        <span className='pl-3'>Loading...</span>
                                    </>
                                ) : 'Update'
                            }
                        </span>
                    </button>
                </div>
            </form>

            <div className='flex justify-between px-5 w-full md:w-100'>
                <Button onClick={() => setShowModal(true)} outline color='red' className='cursor-pointer'>Delete Account</Button>
                <Button outline color='yellow' className='cursor-pointer'>Sign Out</Button>
            </div>

            {
                error && (
                    <Alert color='failure' className='mt-5'>{error}</Alert>
                )
            }

            {
                updateUserSuccess && (
                    <Alert color='green' className='mt-5'>User updated successfully</Alert>
                )
            }

            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account?</h3>
                        <div className='flex justify-between px-7'>
                            <Button color='red' onClick={handleDeleteUser} className='cursor-pointer'>
                                Yes, I am sure
                            </Button>

                            <Button onClick={()=>setShowModal(false)} className='cursor-pointer'>No, cancel</Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}