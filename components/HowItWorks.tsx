import React from 'react'

const HowItWorks = () => {
    return (
        <div id='how-it-works' className=' font-bold  p-5 pt-10'>
            <h2 className='text-center text-5xl font-semibold mb-10'>How It Works?</h2>
            <div className='flex flex-col sm:flex-row gap-10 w-[90%] py-8 mx-auto justify-center'>
                <p className='p-5 text-xl font-semibold text-center rounded-md border-1 border-purple-500 hover:scale-105 duration-250 shadow-white shadow w-full'>Sign up</p>
                <p className='p-5 text-xl font-semibold text-center rounded-md border-1 border-purple-500 hover:scale-105 duration-250 shadow-white shadow w-full'>Paste your long link in the dashboard.</p>
                <p className='p-5 text-xl font-semibold text-center rounded-md border-1 border-purple-500 hover:scale-105 duration-250 shadow-white shadow w-full'>Click “Shorten”.</p>
                <p className='p-5 text-xl font-semibold text-center rounded-md border-1 border-purple-500 hover:scale-105 duration-250 shadow-white shadow w-full'>Copy & share your new short link anywhere.</p>
            </div>
        </div>
    )
}

export default HowItWorks