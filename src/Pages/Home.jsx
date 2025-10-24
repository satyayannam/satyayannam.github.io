import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Satya Yannam
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Software Engineer & Developer
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-lg text-gray-400 mb-12">
            Passionate about creating innovative solutions and building impactful applications.
            Specialized in web development, cloud computing, and software architecture.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/projects"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300"
            >
              View Projects
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-300"
            >
              Contact Me
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div className="p-6 bg-gray-800 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">Experience</h3>
            <p className="text-gray-400">Professional experience in building scalable applications</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">Skills</h3>
            <p className="text-gray-400">Expert in modern web technologies and frameworks</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl">
            <h3 className="text-xl font-semibold mb-3">Education</h3>
            <p className="text-gray-400">Computer Science background with continuous learning</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
