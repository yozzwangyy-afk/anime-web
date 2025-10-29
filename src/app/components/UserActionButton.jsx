'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const UserActionButton = () => {
    const { data: session, status } = useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
    };

    if (status === 'loading') {
        return (
            <div className="flex gap-3 mt-4">
                <div className="bg-pink-900/20 text-white px-6 py-3 rounded-full text-center font-semibold animate-pulse">
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col sm:flex-row gap-3 mt-4'>
            {user ? (
                <Link 
                    href="/users/dashboard" 
                    className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white px-6 py-3 rounded-full text-center font-semibold transition-all duration-300 hover-lift pink-glow"
                >
                    🎮 Dashboard
                </Link>
            ) : null}
            
            {user ? (
                <button 
                    onClick={handleSignOut}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-full text-center font-semibold transition-all duration-300 hover-lift pink-glow"
                >
                    🚪 Logout
                </button>
            ) : (
                <Link 
                    href="/signin" 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-full text-center font-semibold transition-all duration-300 hover-lift pink-glow"
                >
                    🔐 Login
                </Link>
            )}
        </div>
    );
}

export default UserActionButton;
