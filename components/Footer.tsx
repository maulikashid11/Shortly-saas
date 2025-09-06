import React from 'react'

const Footer = () => {
    return (
        <footer className="w-full bg-gray-900 text-gray-400 py-10 mt-10 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-sm">© {new Date().getFullYear()} Shortly. All rights reserved.</p>
                <div className="flex gap-6 text-sm">
                    <a href="#" className="hover:text-purple-400 transition">Privacy Policy</a>
                    <a href="#" className="hover:text-purple-400 transition">Terms of Service</a>
                    <a href="#" className="hover:text-purple-400 transition">Contact</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer