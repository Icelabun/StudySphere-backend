import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      title: "Study Dungeon",
      description: "Enter different ranks of study zones, complete tasks, and level up your knowledge!",
      icon: "🏰",
      path: "/study-dungeon"
    },
    {
      title: "AI Tutor",
      description: "Get personalized help from our AI-powered study assistant.",
      icon: "🤖",
      path: "/ai-tutor"
    },
    {
      title: "Flashcards",
      description: "Create and study with interactive flashcards.",
      icon: "📚",
      path: "/flashcards"
    },
    {
      title: "Social Learning",
      description: "Connect with other students and learn together.",
      icon: "👥",
      path: "/social"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-gradient" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Welcome to StudySphere
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transform your study experience with our gamified learning platform
            </motion.p>
            <motion.div 
              className="flex justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to="/auth"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="bg-gray-800/50 hover:bg-gray-700/50 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all transform hover:scale-105 border border-gray-700 hover:border-gray-600"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Key Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-gray-800/50 p-8 rounded-2xl hover:bg-gray-700/50 transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 hover:border-gray-600"
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-3 text-blue-400">{feature.title}</h3>
              <p className="text-gray-400 mb-6">{feature.description}</p>
              <Link
                to={feature.path}
                className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center group-hover:translate-x-2 transition-transform duration-300"
              >
                Learn more 
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-800/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center text-4xl">1️⃣</div>
              <div className="pt-12">
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">Create Your Account</h3>
                <p className="text-gray-400">
                  Sign up and create your student profile to begin your journey
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center text-4xl">2️⃣</div>
              <div className="pt-12">
                <h3 className="text-2xl font-semibold mb-4 text-purple-400">Enter the Dungeon</h3>
                <p className="text-gray-400">
                  Choose your study zone and start completing tasks to level up
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center text-4xl">3️⃣</div>
              <div className="pt-12">
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">Track Progress</h3>
                <p className="text-gray-400">
                  Monitor your achievements and unlock new study zones
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-16"
        >
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Ready to Begin Your Study Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of students who are already leveling up their knowledge
          </p>
          <Link
            to="/auth"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-12 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 inline-block"
          >
            Start Learning Now
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home; 