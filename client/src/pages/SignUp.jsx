import { Link } from "react-router-dom"
import { Label, TextInput, Button } from "flowbite-react"

export default function SignUp() {
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
                    <form className="flex flex-col gap-4">
                        <div className="">
                            <Label>Your username</Label>
                            <TextInput
                                type='text'
                                placeholder='Username'
                                id='username'
                            />
                        </div>

                        <div className="">
                            <Label>Your email</Label>
                            <TextInput
                                type='text'
                                placeholder='name@company.com'
                                id='email'
                            />
                        </div>

                        <div className="">
                            <Label>Your password</Label>
                            <TextInput
                                type='text'
                                placeholder='Password'
                                id='password'
                            />
                        </div>

                        <Button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800'
                            type='submit'
                        >
                            Sign Up
                        </Button>
                    </form>

                    <div className="flex gap-2 text-sm mt-5">
                        <span>Have an account?</span>
                        <Link to='/sign-in' className="text-blue-500">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}