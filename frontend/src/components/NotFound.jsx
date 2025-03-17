import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-10"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="text-[120px] sm:text-[180px] md:text-[220px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse"
        >
          404
        </motion.h1>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Page Not Found</h2>

        <p className="text-lg sm:text-xl text-gray-400">
          Redirecting to{" "}
          <span className="text-cyan-400 font-semibold">Home</span> in {countdown} seconds...
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg sm:text-xl rounded-full hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/50"
        >
          Go to Home
        </button>
      </motion.div>
    </main>
  );
};

export default NotFound;
