import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar.jsx';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts.jsx';

export default function Dashboard() {
    const location = useLocation();
    const [tab, setTab] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) setTab(tabFromUrl);
    }, [location.search])

    return (
        <div className="flex-1 flex flex-col md:flex-row">
            <div className='md:w-56'>
                {/* Sidebar */}
                <DashSidebar />
            </div>

            <div className="w-full overflow-x-auto">
                {/* Profile ... */}
                {tab === 'profile' && <DashProfile />}
                {/* Posts ... */}
                {tab === 'posts' && <DashPosts />}
            </div>

        </div>
    )
}