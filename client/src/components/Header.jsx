import { Link, useLocation } from 'react-router-dom'
import { Navbar, NavbarCollapse, NavbarLink, TextInput, Button, NavbarToggle } from 'flowbite-react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'


export default function Header() {
    const path = useLocation().pathname;
    return (
        <Navbar>
            <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Node</span>
                Notion
            </Link>

            <form>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                />
            </form>

            <Button className='w-14 h-10 lg:hidden' color="light" pill>
                <AiOutlineSearch />
            </Button>

            <div className='flex gap-2 md:order-1'>
                <Button className='w-14 h-10 hidden sm:inline' color="light" pill>
                    <FaMoon />
                </Button>

                <Link to='/sign-in'>
                    <Button className='bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-blue-300 dark:focus:ring-blue-800'>
                        Sign In
                    </Button>
                </Link>

                <NavbarToggle/>

            </div>

            

            <NavbarCollapse>
                <NavbarLink active={path === "/"} as={Link} to='/'>
                    Home
                </NavbarLink>
                <NavbarLink active={path === "/about"} as={Link} to='/about'>
                    About
                </NavbarLink>
                <NavbarLink active={path === "/projects"} as={Link} to='/projects'>
                    Projects
                </NavbarLink>
            </NavbarCollapse>


        </Navbar>
    )
}