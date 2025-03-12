import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // Import axios for making API calls


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
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact/",  // Corrected API endpoint
        formData
      );

      if (response.status === 200) {  //  Check for 200 OK status
        toast.success("Message sent successfully!"); // Success toast
        setFormData({ name: "", email: "", message: "" }); // Clear form
      } else {
          toast.error("Failed to send message. Please try again later."); //Generic error message
      }

    } catch (error) {
      console.error("Error submitting form:", error);

        if (error.response) {
          if (error.response.status === 400 && error.response.data.errors) {
            const validationErrors = error.response.data.errors;
            if (validationErrors.name) {
              toast.error(validationErrors.name);
            }
            if (validationErrors.email) {
              toast.error(validationErrors.email);
            }
            if (validationErrors.message) {
              toast.error(validationErrors.message);
            }
          } else {
            toast.error(`Error: ${error.response.data.message || error.response.statusText}`);
          } 
            
        } else if (error.request) {
            toast.error("No response from server. Please check your connection.");
        } else {
            toast.error("An unexpected error occurred. Please try again.");
        }

    } finally {
      setLoading(false); // Stop loading, regardless of success or failure
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gray-900/50 backdrop-blur-lg rounded-3xl p-16 sm:p-20 shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 mx-auto w-full max-w-md"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-10 sm:mb-12 text-white text-center">
        Contact Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-12 sm:space-y-16">
        {/* Name Field */}
        <div className="flex flex-col w-full">
          <label className="block text-gray-300 text-base sm:text-lg mb-2 ml-8 text-left translate-x-8">
            Name
          </label>
          <div className="flex justify-center">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full max-w-sm px-4 py-3 sm:px-5 sm:py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition-all duration-300 hover:bg-gray-700/50"
              placeholder="Your Name"
              required // Make the field required
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="flex flex-col w-full">
          <label className="block text-gray-300 text-base sm:text-lg mb-2 ml-8 text-left translate-x-8">
            Email
          </label>
          <div className="flex justify-center">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full max-w-sm px-4 py-3 sm:px-5 sm:py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition-all duration-300 hover:bg-gray-700/50"
              placeholder="Your Email"
              required // Make the field required
            />
          </div>
        </div>

        {/* Message Field */}
        <div className="flex flex-col w-full">
          <label className="block text-gray-300 text-base sm:text-lg mb-2 ml-8 text-left translate-x-8">
            Message
          </label>
          <div className="flex justify-center">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full max-w-sm px-4 py-3 sm:px-5 sm:py-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition-all duration-300 hover:bg-gray-700/50 mb-16 sm:mb-20"
              rows="5"
              placeholder="Your Message"
              required // Make the field required
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading} // Disable button during loading
          className="w-full max-w-sm mx-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-base sm:text-lg rounded-full hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/50 translate-x-8 disabled:opacity-50 disabled:cursor-not-allowed"
          // Added disabled styles
        >
          {loading ? "Sending..." : "Send Message"} {/* Show "Sending..." during loading */}
        </button>
      </form>
    </motion.div>
  );
};

// Contact Information Component
const ContactInfo = () => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="bg-gray-900/50 backdrop-blur-lg rounded-3xl p-16 sm:p-20 shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 mx-auto w-full max-w-md"
  >
    <h2 className="text-2xl sm:text-3xl font-bold mb-10 sm:mb-12 text-white text-center">
      Contact Information
    </h2>
    <div className="space-y-8 sm:space-y-10 text-center">
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-4">
          Email
        </h3>
        <p className="text-gray-300 text-base sm:text-lg">
          contact@studysync.com
        </p>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-4">
          Phone
        </h3>
        <p className="text-gray-300 text-base sm:text-lg">+91 9999-xxx-xxx</p>
      </div>
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-4">
          Address
        </h3>
        <p className="text-gray-300 text-base sm:text-lg">Bengaluru</p>
        <p className="text-gray-300 text-base sm:text-lg">
          Karnataka, India
        </p>
      </div>
    </div>
  </motion.div>
);

// Main Contact Page Component
const ContactPage = () => (
  <main className="pt-[6.5rem] min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 scroll-smooth">
    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
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