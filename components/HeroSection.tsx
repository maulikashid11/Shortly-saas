"use client"
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'


const HeroSection = () => {
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
    <section className="w-full  text-center py-32 px-6">
      <h1 className="text-4xl md:text-6xl font-bold text-purple-500 mb-6 leading-tight">
        Shortly – Simple & Powerful Link Shortener
      </h1>
      <p className="text-base md:text-lg text-gray-300 mb-10">
        Turn long, messy URLs into short, professional links. Perfect for social media, emails, and everywhere you share.
      </p>
      <button onClick={handleStart} className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg transition">
        Get Started
      </button>
    </section>
  )
}

export default HeroSection