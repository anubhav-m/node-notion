import { Link, useLocation } from 'react-router-dom'
import { Navbar, NavbarCollapse, NavbarLink, TextInput, Button, NavbarToggle, Dropdown, Avatar, DropdownHeader, DropdownItem, DropdownDivider } from 'flowbite-react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'
import { useSelector } from 'react-redux'

export default function Header() {
    const path = useLocation().pathname;
    const { currentUser } = useSelector(state => state.user);
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
                            <button className='btn-outline-wrapper group'>
                                <span className='btn-outline group-hover:bg-transparent'>
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