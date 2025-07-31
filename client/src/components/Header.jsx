import { Link, useLocation } from 'react-router-dom'
import { Navbar, NavbarCollapse, NavbarLink, TextInput, Button, NavbarToggle, Dropdown, Avatar, DropdownHeader, DropdownItem, DropdownDivider } from 'flowbite-react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'

export default function Header() {
    const path = useLocation().pathname;
    const { currentUser } = useSelector(state => state.user);
    const { theme } = useSelector(state => state.theme);
    const dispatch = useDispatch();
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
                <Button className='w-14 h-10 hidden sm:inline' color="light" pill onClick={() => dispatch(toggleTheme())}>
                    {
                        theme === 'light' ? <FaSun/> : <FaMoon/>
                    }
                </Button>

                {currentUser ?
                    (
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar
                                    alt='user'
                                    img={currentUser.profilePic}
                                    rounded
                                />
                            }
                        >
                            <DropdownHeader>
                                <span className='block text-sm'>
                                    @{currentUser.username}
                                </span>

                                <span className='block text-sm font-medium truncate'>
                                    {currentUser.email}
                                </span>

                                <DropdownDivider />

                                <Link to='/dashboard?tab=profile'>
                                    <DropdownItem>
                                        Profile
                                    </DropdownItem>
                                </Link>

                                <DropdownDivider />

                                <DropdownItem>
                                    Sign Out
                                </DropdownItem>
                            </DropdownHeader>
                        </Dropdown>
                    )
                    :
                    (
                        <Link to='/sign-in'>
                            <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                                    Sign In
                                </span>
                            </button>
                        </Link>
                    )

                }
                <NavbarToggle />

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