import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Horizontal Line Before Footer */}
      <div className="border-t border-gray-800 mt-12"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-20 py-8 sm:py-12">
        {/* Social Media Icons and Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Social Media Icons */}
          <div className="flex gap-4 sm:gap-6">
            {/* Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <i className="fab fa-twitter text-lg sm:text-xl md:text-2xl"></i>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <i className="fab fa-facebook text-lg sm:text-xl md:text-2xl"></i>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <i className="fab fa-instagram text-lg sm:text-xl md:text-2xl"></i>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
            >
              <i className="fab fa-linkedin text-lg sm:text-xl md:text-2xl"></i>
            </a>
          </div>

          {/* Copyright Notice */}
          <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Study Sync. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;