import React from 'react';
import { motion } from 'framer-motion';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-900 text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
          Analytics Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-400">Performance Overview</h2>
            <p className="text-gray-400">View detailed insights into student performance and learning patterns.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-400">Progress Reports</h2>
            <p className="text-gray-400">Generate and manage student progress reports.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-400">Learning Analytics</h2>
            <p className="text-gray-400">Track learning outcomes and identify areas for improvement.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics; 