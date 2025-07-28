import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react"

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setErrorMessage(null);
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password) {
            return setErrorMessage('Please fill out all fields');
        }

        try {
            setLoading(true);
            setErrorMessage(null);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json();

            if (!data.success) {
                return setErrorMessage(data.message);
            }

            if (res.ok){
                navigate('/sign-in');
            }

        }

        catch (err) {
            setErrorMessage(err.message);
            setLoading(false);
        }

        finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen mt-20">
            <div className="flex flex-col md:flex-row gap-10 p-6 max-w-3xl mx-auto md:items-center">
                {/* left */}
                <div className="flex-1">
                    <Link to='/' className='font-bold dark:text-white text-4xl'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Node</span>
                        Notion
                    </Link>

                    <p className="text-sm mt-5">
                        You can sign up with your and email and password or with Google.
                    </p>
                </div>



                {/* right */}
                <div className="flex-1">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="">
                            <Label>Your username</Label>
                            <TextInput
                                type='text'
                                placeholder='Username'
                                id='username'
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="">
                            <Label>Your email</Label>
                            <TextInput
                                type='email'
                                placeholder='name@company.com'
                                id='email'
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="">
                            <Label>Your password</Label>
                            <TextInput
                                type='password'
                                placeholder='Password'
                                id='password'
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <Button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800'
                            type='submit'
                            disabled={loading}
                        >
                            {
                                loading ? (
                                    <>
                                        <Spinner size='sm' />
                                        <span className='pl-3'>Loading...</span>
                                    </>
                                ) : 'Sign Up'
                            }
                        </Button>
                    </form>

                    <div className="flex gap-2 text-sm mt-5">
                        <span>Have an account?</span>
                        <Link to='/sign-in' className="text-blue-500">Sign In</Link>
                    </div>

                    {
                        errorMessage && (
                            <Alert className='mt-5' color='failure'>
                                {errorMessage}
                            </Alert>
                        )
                    }
                </div>
            </div>
        </div>
    )
}