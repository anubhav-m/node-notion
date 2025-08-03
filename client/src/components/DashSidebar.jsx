import { Sidebar, SidebarItems, SidebarItemGroup, SidebarItem } from 'flowbite-react'
import { HiArrowSmRight, HiUser } from 'react-icons/hi'
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signOutStart, signOutSuccess, signOutFailure } from '../redux/user/userSlice';

export default function DashSidebar() {
    const dispatch = useDispatch();
    const location = useLocation();
    const [tab, setTab] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) setTab(tabFromUrl);
    }, [location.search])

    const handleSignOut = async () => {
        try {
            dispatch(signOutStart());
            const res = await fetch('/api/user/signout', {
                method: 'POST',
                'Content-Type': 'application/json'
            })

            if (!res.ok) {
                dispatch(signOutFailure());
            }

            else {
                dispatch(signOutSuccess());
            }
        }

        catch (error) {
            dispatch(signOutFailure());
        }
    }

    return (
        <Sidebar className='w-full md:w-56'>
            <SidebarItems>
                <SidebarItemGroup>
                    <Link to='/dashboard?tab=profile'>
                        <SidebarItem active={tab === 'profile'} icon={HiUser} label={"User"} labelColor='dark' as='div'>Profile</SidebarItem>
                    </Link>
                </SidebarItemGroup>

                <SidebarItemGroup>
                    <SidebarItem icon={HiArrowSmRight} onClick={handleSignOut} className='cursor-pointer'>Sign Out</SidebarItem>
                </SidebarItemGroup>
            </SidebarItems>
        </Sidebar>
    )
}