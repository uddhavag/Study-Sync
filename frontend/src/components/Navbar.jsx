import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    toast.success('Logged out successfully!', {
      position: 'top-center',
      autoClose: 2000,
      theme: "dark", // Dark mode for toast
    });
    
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <header className="relative w-full">
      <ToastContainer theme="dark" /> {/* Ensures all toasts are in dark mode */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled ? 'h-[80px]' : 'h-[100px]'} 
          ${isScrolled ? 'bg-gray-900/90 backdrop-blur-lg' : 'bg-gray-900/95'}`}
      >
        <nav className="container mx-auto px-4 sm:px-8 lg:px-16 h-full flex items-center justify-between">
          <NavLink to="/" className="flex items-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent 
              bg-gradient-to-r from-cyan-400 to-purple-400">
              StudySync
            </h1>
          </NavLink>

          <button
            className="block sm:hidden text-gray-200 hover:text-cyan-400 transition-colors duration-300"
            onClick={toggleMenu}
          >
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

            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-base sm:text-lg md:text-xl hover:text-cyan-400 transition-colors duration-300
                    ${isActive ? 'text-cyan-400' : 'text-gray-200'}`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `text-base sm:text-lg md:text-xl hover:text-cyan-400 transition-colors duration-300
                    ${isActive ? 'text-cyan-400' : 'text-gray-200'}`
                  }
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `text-base sm:text-lg md:text-xl hover:text-cyan-400 transition-colors duration-300
                    ${isActive ? 'text-cyan-400' : 'text-gray-200'}`
                  }
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleSignOut}
                  className="text-base sm:text-lg md:text-xl text-red-400 hover:text-red-500 transition-colors duration-300"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="block sm:hidden absolute top-[80px] sm:top-[100px] left-0 w-full bg-gray-900/95 p-4 space-y-4 z-40">
          <NavLink
            to="/"
            className="block text-lg hover:text-cyan-400 transition-colors duration-300 text-gray-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/contact"
            className="block text-lg hover:text-cyan-400 transition-colors duration-300 text-gray-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </NavLink>

          {!isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                className="block text-lg hover:text-cyan-400 transition-colors duration-300 text-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="block px-6 py-3 text-lg text-white bg-gradient-to-r from-cyan-500 
                  to-blue-500 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all 
                  duration-300 shadow-lg shadow-cyan-500/25"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `block text-lg hover:text-cyan-400 transition-colors duration-300 
                  ${isActive ? 'text-cyan-400' : 'text-gray-200'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </NavLink>
              <button
                onClick={handleSignOut}
                className="block text-lg text-red-400 hover:text-red-500 transition-colors duration-300"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
