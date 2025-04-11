import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center bg-[#f0e5cf] space-y-10 px-4 text-center"
    >
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-5xl font-bold text-gray-800 tracking-wide drop-shadow-sm"
      >
        Welcome to Book Exchange Portal
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-lg text-gray-600 max-w-md"
      >
        Discover, share, and exchange your favorite books with the community.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="space-x-5"
      >
        <Link
          to="/signup"
          className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white px-6 py-3 rounded-lg shadow-md text-lg font-medium"
        >
          Signup
        </Link>
        <Link
          to="/login"
          className="bg-green-500 hover:bg-green-600 transition-all duration-300 text-white px-6 py-3 rounded-lg shadow-md text-lg font-medium"
        >
          Login
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Home;
