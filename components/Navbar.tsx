"use client"
import { AppContext } from '@/contexts/AppContext'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Navbar = () => {
    const { data: session } = useSession();
    const { registerUser } = useContext(AppContext);
    const handleLogin = () => {
        signIn();

    }
    useEffect(() => {
        if (session?.user) {
            registerUser(session);
        }
    }, [session])


    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <div className='fixed index-50 w-full p-5 flex items-center justify-between shadow backdrop-blur-md '>
            <Link href={'/'} className='text-purple-600 font-bold text-3xl'>Shortly</Link>
            
            {
                session?.user ?
                    <div onClick={() => setIsMenuOpen(!isMenuOpen)} className='flex items-center gap-3 '>
                        <Image src={session.user.image!} alt='user image' width={40} height={40} className='rounded-full cursor-pointer' />
                        <p>{session.user.name?.split(' ')[0]}&apos; shortly</p>
                    </div>
                    : <button onClick={handleLogin} className='px-5 py-2 bg-white/80 text-black font-semibold rounded-md'>Login</button>
            }
            {
                <div className={`absolute  top-20 right-5 shadow p-4 bg-white text-black rounded-md duration-500 ${!isMenuOpen && 'opacity-0 -translate-y-3'}`}>
                    <ul>
                        <li className='text-gray-700 hover:text-black duration-500 cursor-pointer py-2'><Link href={'/dashboard'}>Dashboard</Link></li>
                        <hr />
                        <li className='text-gray-700 hover:text-black duration-500 cursor-pointer py-2'><button onClick={() => { signOut(); toast.success('User logged out successfully.') }}>Logout</button></li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default Navbar