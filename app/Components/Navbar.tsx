import React from 'react'

const Navbar = () => {
    return (
        <nav className="bg-black py-4 px-6 flex justify-between items-center shadow-lg">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                <span className="text-xl font-bold text-white">iTaskManager</span>
            </div>

            <div className="flex space-x-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Sign Up
                </button>
                <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                    Log In
                </button>
            </div>
        </nav>
    )
}

export default Navbar
