import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Hero Section Component
const HeroSection = () => (
  <div className="px-0 pt-32 flex flex-col items-center justify-center min-h-[calc(100vh-6.5rem)] relative overflow-hidden">
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
        Plan Your Studies,<br/> Ace Your Goals
      </h1>
      <p className="text-lg sm:text-xl text-gray-400 max-w-4xl mx-auto px-6">
        AI-powered study planning with smart scheduling and progress tracking
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
      >
        Get Started
      </motion.button>
    </motion.div>
  </div>
);

// Features Section Component
const FeaturesSection = () => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="py-24 bg-gray-950/50"
  >
    <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">
      <h2 className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-16">
        Key Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16 justify-items-center">
        {[
          {
            title: "AI-Powered Scheduling",
            icon: "📅",
            description: "Smart algorithms create optimized study timetables"
          },
          {
            title: "Progress Tracking",
            icon: "📊",
            description: "Visualize your learning journey with detailed analytics"
          },
          {
            title: "Cross-Platform Sync",
            icon: "📱",
            description: "Access your plans anywhere, anytime, on any device"
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="w-full max-w-xs p-8 bg-gray-900/50 rounded-3xl hover:bg-gray-800/50 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-4xl mb-6 text-cyan-400 flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-bold text-white mb-4 text-center">{feature.title}</h3>
            <p className="text-gray-400 text-center">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

// HowItWorks Section Component
const HowItWorks = () => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="py-24 bg-gray-950/50"
  >
    <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">
      <h2 className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-16">
        How It Works
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
        {/* Step 1 */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="p-8 bg-gray-900/50 rounded-3xl hover:bg-gray-800/50 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6">
            <span className="text-3xl text-cyan-400">1</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Set Your Goals</h3>
          <p className="text-gray-400">
            Define your academic objectives, subjects, and deadlines
          </p>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 bg-gray-900/50 rounded-3xl hover:bg-gray-800/50 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
            <span className="text-3xl text-purple-400">2</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Generate Schedule</h3>
          <p className="text-gray-400">
            Let AI create your optimized study timetable
          </p>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-8 bg-gray-900/50 rounded-3xl hover:bg-gray-800/50 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6">
            <span className="text-3xl text-cyan-400">3</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Track Progress</h3>
          <p className="text-gray-400">
            Monitor your performance and adjust your plan
          </p>
        </motion.div>
      </div>
    </div>
  </motion.section>
);

// CTA Section Component
const CTASection = () => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
  >
    <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 text-center">
      <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
        Ready to Transform Your Study Habits?
      </h2>
      <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-12">
        Join thousands of students who have leveled up their learning with Study Sync
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
      >
        Start Your Free Trial
      </motion.button>
    </div>
  </motion.section>
);

// Main HomePage Component
const HomePage = () => (
  <main className="pt-[6.5rem] min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 scroll-smooth">
    <HeroSection />
    <FeaturesSection />
    <HowItWorks />
    <CTASection />
  </main>
);

export default HomePage;