import React from "react";
import { motion } from "framer-motion";

// Hero Section Component
const HeroSection = () => (
  <div className="px-0 pt-32 flex flex-col items-center justify-center min-h-[calc(100vh-6.5rem)] relative overflow-hidden">
    {/* Background Gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 z-0">
      <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="text-center max-w-7xl mx-auto space-y-16 relative z-10 py-16 sm:py-24"
    >
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 leading-tight">
        Get in Touch
      </h1>
      <p className="text-lg sm:text-xl text-gray-400 max-w-4xl mx-auto px-6">
        Have questions or feedback? We'd love to hear from you.
      </p>
    </motion.div>
  </div>
);

// Contact Form Component
const ContactForm = () => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="bg-gray-900/50 backdrop-blur-lg rounded-3xl p-16 sm:p-20 shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 mx-auto w-full max-w-md"
  >
    <h2 className="text-2xl sm:text-3xl font-bold mb-10 sm:mb-12 text-white text-center">Contact Form</h2>
    <form className="space-y-12 sm:space-y-16"> {/* Increased space-y for better spacing */}
      {/* Name Field */}
      <div className="flex flex-col w-full">
        <label className="block text-gray-300 text-base sm:text-lg mb-2 ml-8 text-left translate-x-8">Name</label>
        <div className="flex justify-center">
          <input
            type="text"
            className="w-full max-w-sm px-4 py-3 sm:px-5 sm:py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition-all duration-300 hover:bg-gray-700/50"
            placeholder="Your Name"
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="flex flex-col w-full">
        <label className="block text-gray-300 text-base sm:text-lg mb-2 ml-8 text-left translate-x-8">Email</label>
        <div className="flex justify-center">
          <input
            type="email"
            className="w-full max-w-sm px-4 py-3 sm:px-5 sm:py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition-all duration-300 hover:bg-gray-700/50"
            placeholder="Your Email"
          />
        </div>
      </div>

      {/* Message Field */}
      <div className="flex flex-col w-full">
        <label className="block text-gray-300 text-base sm:text-lg mb-2 ml-8 text-left translate-x-8">Message</label>
        <div className="flex justify-center">
          <textarea
            className="w-full max-w-sm px-4 py-3 sm:px-5 sm:py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition-all duration-300 hover:bg-gray-700/50 mb-16 sm:mb-20" // Increased bottom margin
            rows="5"
            placeholder="Your Message"
          ></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full max-w-sm mx-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-base sm:text-lg rounded-full hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/50 translate-x-8"
      >
        Send Message
      </button>
    </form>
  </motion.div>
);

// Contact Information Component
const ContactInfo = () => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="bg-gray-900/50 backdrop-blur-lg rounded-3xl p-16 sm:p-20 shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 mx-auto w-full max-w-md"
  >
    <h2 className="text-2xl sm:text-3xl font-bold mb-10 sm:mb-12 text-white text-center">Contact Information</h2>
    <div className="space-y-8 sm:space-y-10 text-center">
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-4">Email</h3>
        <p className="text-gray-300 text-base sm:text-lg">contact@studysync.com</p>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-4">Phone</h3>
        <p className="text-gray-300 text-base sm:text-lg">+91 9999-xxx-xxx</p>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-4">Address</h3>
        <p className="text-gray-300 text-base sm:text-lg">Bengaluru</p>
        <p className="text-gray-300 text-base sm:text-lg">Karnataka, India</p>
      </div>
    </div>
  </motion.div>
);

// Main Contact Page Component
const ContactPage = () => (
  <main className="pt-[6.5rem] min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 scroll-smooth">
    <div className="w-full space-y-[12rem]">
      <HeroSection />
      <div className="container mx-auto px-8 sm:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center justify-center">
          {/* Centered Content with Equal Spacing */}
          <div className="col-span-1 lg:col-span-1 flex justify-center">
            <ContactForm />
          </div>
          <div className="col-span-1 lg:col-span-1 flex justify-center">
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  </main>
);

export default ContactPage;