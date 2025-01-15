//import React, { useContext, useEffect, useState } from 'react';
//import { Link, useLocation } from 'react-router-dom';
//import Authcontext from '../context/Authcontext';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import logo from '../../../public/logo.png'
const Navbar = () => {
    // const { user, signOutUser } = useContext(Authcontext);
    // const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);


    // Function to check if the current route is active
    const isActive = (path) => location.pathname === path;

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Close dropdown when clicking outside (optional, for improved UX)
    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    return (
        <nav className="bg-violet-900 text-white shadow-md  sticky top-0 z-10 pr-5 pl-5">
            <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:justify-between items-center ">
                {/* Logo Section */}
                <div className="mb-4 md:mb-0">
                    <Link
                        to="/"
                        className="flex items-center text-lg font-bold bg-lime-50 text-black rounded-md hover:bg-yellow-400 transition"
                    >
                        <img
                            src={logo}
                            alt="TeamTrack Logo"
                            className="h-8 w-auto"
                        />
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6 items-center text-slate-950">
                    <Link
                        to="/"
                        className={`hover:text-yellow-300 transition ${isActive('/') ? 'font-bold text-yellow-500' : ''}`}
                    >
                        Home
                    </Link>


                    {/* <Link
                    to="/allFoods"
                    className={`hover:text-yellow-300 transition ${isActive('/allSportsEquipment') ? 'font-bold text-yellow-500' : ''}`}
                >
                    All Foods
                </Link> */}
                    {/* <Link
                    to="/gallery"
                    className={`hover:text-yellow-300 transition ${isActive('/allSportsEquipment') ? 'font-bold text-yellow-500' : ''}`}
                >
                    Gallary
                </Link> */}


                </div>
                {/* User Section */}
                <div className="mt-4 md:mt-0 flex items-center space-x-4 relative">
                    {/* {user && user.email ? ( */}
                    <div className="relative">
                        <img
                            // src={user?.photoURL}
                            alt="User"
                            className="h-8 w-8 rounded-full object-cover cursor-pointer"
                            // title={user?.displayName || 'User'} // Tooltip with user's name
                            onClick={toggleDropdown} // Toggle dropdown on click
                        />
                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div
                                className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10"
                                onMouseLeave={closeDropdown} // Optional: Close dropdown when mouse leaves
                            >
                                <Link
                                    to="/myFood"
                                    className="block px-4 py-2 hover:bg-gray-200 transition"
                                    onClick={closeDropdown} // Close dropdown on link click
                                >
                                    My Foods
                                </Link>
                                <Link
                                    to="/addFood"
                                    className="block px-4 py-2 hover:bg-gray-200 transition"
                                    onClick={closeDropdown} // Close dropdown on link click
                                >
                                    Add Food
                                </Link>
                                <Link
                                    to="/myOrders"
                                    className="block px-4 py-2 hover:bg-gray-200 transition"
                                    onClick={closeDropdown} // Close dropdown on link click
                                >
                                    My Orders
                                </Link>
                                <button
                                    onClick={() => {
                                        signOutUser();
                                        closeDropdown();
                                    }}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                    {/* ) : ( */}
                    <div className="flex space-x-4">
                        <Link
                            to="/login"
                            className={`text-black hover:text-slate-50 transition ${isActive('/signin') ? 'font-bold text-yellow-500' : ''}`}
                        >
                            Log In
                        </Link>
                        <Link
                            to="/register"
                            className={`text-black hover:text-slate-50 transition ${isActive('/register') ? 'font-bold text-yellow-500' : ''}`}
                        >
                            Register
                        </Link>
                    </div>
                    {/* )} */}

                </div>
            </div>
        </nav>

    );
};

export default Navbar;