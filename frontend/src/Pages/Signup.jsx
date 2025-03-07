import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    // Form validation
    const validationErrors = {};
    if (!formData.name.trim()) validationErrors.name = "Name is required";
    if (!formData.email.trim()) validationErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = "Invalid email format";
    }
    if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length > 0) {
      return setErrors(validationErrors);
    }

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Registration failed");
      }

      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-[6.5rem] min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center max-w-7xl mx-auto space-y-16 relative z-10 py-16 sm:py-24"
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 leading-tight">
          Create Your Account
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 max-w-4xl mx-auto px-6">
          Join our community and start your journey with us
        </p>
      </motion.div>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gray-900/50 backdrop-blur-lg rounded-3xl p-16 sm:p-20 shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 mx-auto w-full max-w-md mt-24"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-10 sm:mb-12 text-white text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-12 sm:space-y-16">
          {/* Name Field */}
          <div className="flex flex-col w-full">
            <label className="block text-gray-300 text-base sm:text-lg mb-2 ml-8 text-left translate-x-8">Full Name</label>
            <div className="flex justify-center">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full max-w-sm px-4 py-3 sm:px-5 sm:py-3 rounded-lg bg-gray-800/50 text-white border ${
                  errors.name ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition-all duration-300 hover:bg-gray-700/50`}
                placeholder="Your Full Name"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1 ml-8 translate-x-8">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="flex flex-col w-full">
            <label className="block text-gray-300 text-base sm:text-lg mb-2 ml-8 text-left translate-x-8">Email</label>
            <div className="flex justify-center">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full max-w-sm px-4 py-3 sm:px-5 sm:py-3 rounded-lg bg-gray-800/50 text-white border ${
                  errors.email ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition-all duration-300 hover:bg-gray-700/50`}
                placeholder="Your Email"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1 ml-8 translate-x-8">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="flex flex-col w-full">
            <label className="block text-gray-300 text-base sm:text-lg mb-2 ml-8 text-left translate-x-8">Password</label>
            <div className="flex justify-center">
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full max-w-sm px-4 py-3 sm:px-5 sm:py-3 rounded-lg bg-gray-800/50 text-white border ${
                  errors.password ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition-all duration-300 hover:bg-gray-700/50`}
                placeholder="Create Password"
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1 ml-8 translate-x-8">{errors.password}</p>}
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col w-full">
            <label className="block text-gray-300 text-base sm:text-lg mb-2 ml-8 text-left translate-x-8">Confirm Password</label>
            <div className="flex justify-center">
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={`w-full max-w-sm px-4 py-3 sm:px-5 sm:py-3 rounded-lg bg-gray-800/50 text-white border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 transition-all duration-300 hover:bg-gray-700/50`}
                placeholder="Confirm Password"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1 ml-8 translate-x-8">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center space-x-2 max-w-sm mx-auto translate-x-8">
            <input
              type="checkbox"
              className="rounded text-cyan-500 focus:ring-cyan-500"
              required
            />
            <label className="text-gray-400 text-sm sm:text-base">
              I agree to the <a href="#" className="text-cyan-400 hover:text-cyan-300">Terms of Service</a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full max-w-sm mx-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-base sm:text-lg rounded-full hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/50 translate-x-8"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Login Link */}
          <div className="text-center mt-8 sm:mt-10 translate-x-8">
            <span className="text-gray-400 text-sm sm:text-base">Already have an account?</span>
            <a href="/login" className="text-cyan-400 ml-2 hover:text-cyan-300 transition-colors">
              Sign in
            </a>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;