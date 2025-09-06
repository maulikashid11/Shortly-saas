import CallToAction from '@/components/CallToAction'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import HowItWorks from '@/components/HowItWorks'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
    return (
        <>
            <Navbar />
            <main>
                <HeroSection />
                <Features />
                <HowItWorks />
                <CallToAction />
            </main>
            <Footer />
        </>
    )
}

export default page