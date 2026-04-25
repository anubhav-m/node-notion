import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOutSuccess } from '../redux/user/userSlice';

export default function AuthHandler() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        // 1. Startup check: Verify session on mount
        const checkAuth = async () => {
            if (!currentUser) return;
            try {
                const res = await fetch('/api/auth/check-auth');
                if (res.status === 401) {
                    dispatch(signOutSuccess());
                }
            } catch (error) {
                console.error('Initial auth check failed:', error);
            }
        };

        checkAuth();

        // 2. Global 401 handler: Intercept all fetch calls
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            try {
                const response = await originalFetch(...args);
                if (response.status === 401) {
                    // Only sign out if we're not already trying to sign in or sign up
                    const url = typeof args[0] === 'string' ? args[0] : args[0].url;
                    if (!url.includes('/api/auth/signin') && !url.includes('/api/auth/signup') && !url.includes('/api/auth/google')) {
                        dispatch(signOutSuccess());
                    }
                }
                return response;
            } catch (error) {
                throw error;
            }
        };

        return () => {
            window.fetch = originalFetch;
        };
    }, [dispatch, currentUser]);

    return null;
}
