import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for dropdown menu

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrolled(currentScrollPos > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to toggle the dropdown menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative w-full">
      {/* Navbar Container */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled ? 'h-[80px]' : 'h-[100px]'} 
          ${isScrolled ? 'bg-gray-900/90 backdrop-blur-lg' : 'bg-gray-900/95'}`}
      >
        <nav className="container mx-auto px-4 sm:px-8 lg:px-16 h-full flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent 
              bg-gradient-to-r from-cyan-400 to-purple-400">
              StudySync
            </h1>
          </NavLink>

          {/* Hamburger Menu Button for Small Devices */}
          <button
            className="block sm:hidden text-gray-200 hover:text-cyan-400 transition-colors duration-300"
            onClick={toggleMenu}
          >
            {/* Hamburger Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Navigation Links (Visible on Larger Screens) */}
          <div className="hidden sm:flex gap-4 sm:gap-8 md:gap-12 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-base sm:text-lg md:text-xl hover:text-cyan-400 transition-colors duration-300
                ${isActive ? 'text-cyan-400' : 'text-gray-200'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-base sm:text-lg md:text-xl hover:text-cyan-400 transition-colors duration-300
                ${isActive ? 'text-cyan-400' : 'text-gray-200'}`
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `text-base sm:text-lg md:text-xl hover:text-cyan-400 transition-colors duration-300
                ${isActive ? 'text-cyan-400' : 'text-gray-200'}`
              }
            >
              Login
            </NavLink>

            {/* Sign Up Button */}
            <NavLink
              to="/signup"
              className={`px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl 
                text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full 
                hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg 
                shadow-cyan-500/25 ${isScrolled ? 'hover:scale-105' : ''}`}
            >
              Sign Up
            </NavLink>
          </div>
        </nav>
      </div>

      {/* Dropdown Menu for Small Devices */}
      {isMenuOpen && (
        <div
          className="block sm:hidden absolute top-[80px] sm:top-[100px] left-0 w-full bg-gray-900/95 
            p-4 space-y-4 z-40"
        >
          <NavLink
            to="/"
            className="block text-lg hover:text-cyan-400 transition-colors duration-300 text-gray-200"
            onClick={() => setIsMenuOpen(false)} // Close menu after link click
          >
            Home
          </NavLink>
          <NavLink
            to="/contact"
            className="block text-lg hover:text-cyan-400 transition-colors duration-300 text-gray-200"
            onClick={() => setIsMenuOpen(false)} // Close menu after link click
          >
            Contact
          </NavLink>
          <NavLink
            to="/login"
            className="block text-lg hover:text-cyan-400 transition-colors duration-300 text-gray-200"
            onClick={() => setIsMenuOpen(false)} // Close menu after link click
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="block px-6 py-3 text-lg text-white bg-gradient-to-r from-cyan-500 
              to-blue-500 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all 
              duration-300 shadow-lg shadow-cyan-500/25"
            onClick={() => setIsMenuOpen(false)} // Close menu after link click
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;