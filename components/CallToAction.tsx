"use client"    
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

const CallToAction = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const handleStart = () => {
        if (session?.user?.name) {
            router.push('/dashboard')
        } else {
            signIn();
        }
    }
    return (
        <section className="w-full text-center py-20 px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-500 mb-4">
                Start Shortening Your Links Today
            </h2>
            <p className="text-gray-300 mb-6 text-base md:text-lg">Make sharing simple, fast, and trackable.</p>
            <button onClick={handleStart} className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg transition">
                Get Started for Free
            </button>
        </section>
    )
}

export default CallToAction