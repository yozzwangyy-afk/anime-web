import Link from 'next/link'
import { AuthUserSession } from '../libs/auth-libs'

const UserActionButton = async () => {
    const user = await AuthUserSession()
    const actionLabel = user ? "Logout" : "Login"
    const actionHref = user ? "/api/auth/signout" : "/api/auth/signin"

    return (
        <div className='grid grid-cols-2 items-center gap-3'>
            {user ? (
                <Link href="/users/dashboard" className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white px-6 py-3 rounded-full text-center font-semibold transition-all duration-300 hover-lift pink-glow">
                    🎮 Dashboard
                </Link>
            ) : null}
            <Link href={actionHref} className={`${
                user 
                ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600" 
                : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            } text-white px-6 py-3 rounded-full text-center font-semibold transition-all duration-300 hover-lift pink-glow`}>
                {user ? "🚪 Logout" : "🔐 Login"}
            </Link>
        </div>
    )
}

export default UserActionButton
