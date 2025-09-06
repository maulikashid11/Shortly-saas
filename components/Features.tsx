import React from 'react'

const Features = () => {
    return (
        <>
            <h2 className='text-center text-5xl font-semibold mb-10'>Features</h2>
            <section id="features" className="w-full mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 py-8 px-6">
                <div className="bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-purple-500/20 transition">
                    <h3 className="text-xl font-semibold text-purple-400 mb-2">🔗 Fast & Easy</h3>
                    <p className="text-gray-400">Paste your link, get a short URL instantly.</p>
                </div>


                <div className="bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-purple-500/20 transition">
                    <h3 className="text-xl font-semibold text-purple-400 mb-2">📊 Track Performance</h3>
                    <p className="text-gray-400">Monitor clicks and engagement with analytics.</p>
                </div>


                <div className="bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-purple-500/20 transition">
                    <h3 className="text-xl font-semibold text-purple-400 mb-2">🎨 Custom Links</h3>
                    <p className="text-gray-400">Create branded short URLs for your business.</p>
                </div>


                <div className="bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-purple-500/20 transition">
                    <h3 className="text-xl font-semibold text-purple-400 mb-2">🔒 Secure & Reliable</h3>
                    <p className="text-gray-400">Your links are safe, encrypted, and always accessible.</p>
                </div>


                <div className="bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-purple-500/20 transition">
                    <h3 className="text-xl font-semibold text-purple-400 mb-2">⚡ High Performance</h3>
                    <p className="text-gray-400">Optimized for speed so your links never slow down.</p>
                </div>


                <div className="bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-purple-500/20 transition">
                    <h3 className="text-xl font-semibold text-purple-400 mb-2">🌍 Share Anywhere</h3>
                    <p className="text-gray-400">Works perfectly across social media, messaging, and websites.</p>
                </div>
            </section>
        </>

    )
}

export default Features