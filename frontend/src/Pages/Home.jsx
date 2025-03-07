import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => (
  <div className="container mx-auto px-8 sm:px-12 lg:px-16 pt-32 flex flex-col items-center 
    justify-center min-h-[calc(100vh-6.5rem)] relative overflow-hidden">
    {/* Background Wave Effect */}
    <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 z-0">
      <svg
        className="absolute bottom-0 w-full h-48 text-gray-950"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="url(#gradientWave)"
          d="M0,192L48,170.7C96,149,192,107,288,117.3C384,128,480,192,576,192C672,192,768,128,864,106.7C960,85,1056,107,1152,149.3C1248,192,1344,256,1392,288L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
        <defs>
          <linearGradient id="gradientWave" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(14, 165, 233, 0.1)" />
            <stop offset="100%" stopColor="rgba(192, 38, 211, 0.1)" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center max-w-5xl mx-auto space-y-16 relative z-10 py-16 sm:py-24"
    >
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-clip-text text-transparent 
        bg-gradient-to-r from-cyan-500 to-purple-500 leading-tight px-4 animate-pulse-slow">
        Transform Your Learning Journey
      </h1>
      <p className="text-lg sm:text-xl text-gray-400 max-w-4xl mx-auto px-6">
        Welcome to StudySync, where AI-powered learning meets personal productivity.
        Create your perfect study environment and achieve your goals faster.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-12 sm:gap-16 px-6 py-8">
        <Link
          to="/signup"
          className="px-12 py-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full 
            hover:from-cyan-700 hover:to-blue-700 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-900/50 
            transition-all duration-300 shadow-lg shadow-cyan-900/25 text-lg sm:text-xl"
        >
          Start Free Trial
        </Link>
      </div>
    </motion.div>
  </div>
);

const FeaturesGrid = () => (
    // Center-align the FeaturesGrid
  <div className="flex justify-center">
    <div className="container mx-auto px-8 sm:px-12 lg:px-16 py-32 max-w-8xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16">
        {[
          {
            icon: "🤖",
            title: "AI Study Assistant",
            desc: "Get personalized learning recommendations and instant help with difficult topics.",
            color: "from-cyan-600 to-blue-600",
          },
          {
            icon: "🧠",
            title: "Smart Spaced Repetition",
            desc: "Our algorithm ensures you review material at the optimal time for maximum retention.",
            color: "from-purple-600 to-pink-600",
          },
          {
            icon: "🎯",
            title: "Goal Tracking",
            desc: "Set and track your study goals with detailed analytics and progress visualization.",
            color: "from-emerald-600 to-teal-600",
          },
          {
            icon: "👥",
            title: "Study Groups",
            desc: "Connect with peers, share resources, and organize virtual study sessions.",
            color: "from-amber-600 to-orange-600",
          },
          {
            icon: "📱",
            title: "Cross-Platform Sync",
            desc: "Access your study materials anywhere, anytime, across all your devices.",
            color: "from-rose-600 to-red-600",
          },
          {
            icon: "🎮",
            title: "Learning Gamification",
            desc: "Turn studying into an engaging experience with points, badges, and challenges.",
            color: "from-violet-600 to-indigo-600",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl 
              hover:shadow-cyan-900/10 transition-all duration-300 group perspective"
          >
            <div className="group-hover:rotate-x-[-10deg] group-hover:rotate-y-[10deg] transition-transform duration-500">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} 
                flex items-center justify-center mb-6`}>
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const StatsSection = () => (
      // Center-align the StatsSection
  <div className="bg-gradient-to-r from-gray-950 to-gray-900 text-white py-32 w-full mt-48">
     <div className="flex justify-center">
    <div className="container mx-auto px-8 sm:px-12 lg:px-16 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
        {[
          { number: "50K+", label: "Active Students" },
          { number: "95%", label: "Success Rate" },
          { number: "24/7", label: "Support Available" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-10 rounded-2xl bg-gray-900/50 backdrop-blur-sm hover:transform 
              hover:scale-105 transition-duration-300 text-center border-2 border-transparent 
              hover:border-cyan-600 hover:shadow-cyan-900/50"
          >
            <h4 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent 
              bg-gradient-to-r from-cyan-600 to-blue-600">
              {stat.number}
            </h4>
            <p className="text-gray-400 text-sm sm:text-base">{stat.label}</p>
          </motion.div>
        ))}
      </div>
      </div>
    </div>
  </div>
);

const CTASection = () => (
  <div className="relative bg-gradient-to-r from-gray-950 to-gray-900 py-32">
    <div className="absolute inset-0 bg-black/30"></div>
    <div className="container mx-auto px-8 sm:px-12 lg:px-16 relative z-10">
      <div className="max-w-5xl mx-auto text-center space-y-16 py-16 sm:py-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight px-4">
          Ready to Transform Your Learning?
        </h2>
        <Link
          to="/signup"
          className="inline-block px-12 py-6 bg-gradient-to-r from-cyan-600 to-blue-600 
            text-white rounded-full hover:from-cyan-700 hover:to-blue-700 
            transform hover:scale-105 transition-all duration-300 
            shadow-lg shadow-cyan-900/25 text-lg sm:text-xl mx-auto"
        >
          Get Started Now 🚀
        </Link>
      </div>
    </div>
  </div>
);

const Home = () => (
  <main className="pt-[6.5rem] min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
    <div className="w-full space-y-[20rem]">
      <HeroSection />
      <FeaturesGrid />
      {/* Separator Between Features and Stats */}
      <div className="w-full h-2 bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
      <StatsSection />
      <CTASection />
    </div>
  </main>
);

export default Home;