import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    const userEmail = localStorage.getItem('userEmail');

    const location = useLocation();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } 

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const getButtonAction = () => {
        switch (location.pathname) {
            case '/':
                return {
                    text: 'Go to All Events',
                    link: '/events'
                };
            case '/events':
                return {
                    text: token ? 'Go to Dashboard' : 'Go to Home',
                    link: token ? `/${userType}/${userEmail}` : "/"
                };
             case '/organization/createEvent':
                return {
                    text: 'Go to Dashboard',
                    link: `/${userType}/${userEmail}` 
                };
            case `/organization/${location.pathname.split('/')[2]}`:
                return {
                    text: 'Create Event',
                    link: '/organization/createEvent'
                };
           
            case `/volunteer/${location.pathname.split('/')[2]}`:
                return {
                    text: 'Go to All Events',
                    link: '/events'
                };
            case `/event/${location.pathname.split('/')[2]}`:
                return {
                    text: token ? 'Go to Dashboard' : 'Go to Home',
                    link: token ? `/organization/${userEmail}` : "/"
                };
            default:
                return {
                    text: 'Go to Home',
                    link: '/'
                };
        }
    };

    const { text, link } = getButtonAction();

    const handleButtonClick = () => {
        navigate(link);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userType');
        toast.success('Successfully logged out');
        navigate('/');
    };

    const handleAvatarClick = () => {
        if (!isDropdownOpen) {
            setIsDropdownOpen(true); // Close the dropdown if it's already open
        } 
    };


    return (
        <nav className="flex justify-between items-center py-3 px-5 bg-[#EEE7CE] fixed top-0 left-0 w-full z-50">
            <Link className="text-black font-extrabold merriweather-regular text-xl md:text-2xl" to="/">Task-Force</Link>
            <div className="flex items-center">
                <button
                    className="bg-black text-white hover:bg-green-700 font-bold uppercase text-sm px-5 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150"
                    onClick={handleButtonClick}
                >
                    {text}
                </button>
                <div className="relative">
                    <img
                        src="https://via.placeholder.com/40" // i will Replace it with actual avatar URL afe
                        alt="Avatar"
                        className="w-10 h-10 rounded-full cursor-pointer"
                        onClick={handleAvatarClick}
                    />
                    {isDropdownOpen && (
                        <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border rounded z-50 shadow-md">
                            {token ? (
                                <>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            navigate(`/${userType}/${userEmail}`);
                                        }}
                                    >
                                        Go to Dashboard
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            handleLogout();
                                        }}
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                                        to="/registerLogin/volunteer"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Login as Volunteer
                                    </Link>
                                    <Link
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                                        to="/registerLogin/organization"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Login as Organization
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
