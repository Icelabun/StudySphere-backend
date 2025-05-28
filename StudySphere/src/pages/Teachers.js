import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Teachers = () => {
  const features = [
    {
      title: "Class Management",
      description: "Easily organize and manage your classes, track student progress, and assign tasks.",
      icon: "📊",
      path: "/teacher/classes",
      subFeatures: ["Attendance tracking", "Grade book", "Class schedule"]
    },
    {
      title: "Content Creation",
      description: "Create engaging study materials, quizzes, and interactive lessons.",
      icon: "✏️",
      path: "/teacher/content",
      subFeatures: ["Lesson templates", "Multimedia support", "Resource library"]
    },
    {
      title: "Analytics Dashboard",
      description: "Get detailed insights into student performance and learning patterns.",
      icon: "📈",
      path: "/teacher/analytics",
      subFeatures: ["Performance trends", "Learning analytics", "Progress reports"]
    },
    {
      title: "Student Engagement",
      description: "Monitor and encourage student participation through gamified learning.",
      icon: "🎮",
      path: "/teacher/engagement",
      subFeatures: ["Reward system", "Achievement badges", "Leaderboards"]
    },
    {
      title: "Lesson Planning",
      description: "Create and organize comprehensive lesson plans with curriculum alignment.",
      icon: "📝",
      path: "/teacher/lesson-planning",
      subFeatures: ["Curriculum mapping", "Resource integration", "Timeline planning"]
    },
    {
      title: "Assessment Tools",
      description: "Create and manage various types of assessments and evaluations.",
      icon: "✅",
      path: "/teacher/assessments",
      subFeatures: ["Quiz builder", "Rubric creator", "Auto-grading"]
    },
    {
      title: "Parent Communication",
      description: "Keep parents informed and engaged with their child's progress.",
      icon: "👨‍👩‍👧‍👦",
      path: "/teacher/parent-portal",
      subFeatures: ["Progress reports", "Direct messaging", "Meeting scheduler"]
    },
    {
      title: "Resource Library",
      description: "Access and share teaching resources with other educators.",
      icon: "📚",
      path: "/teacher/resources",
      subFeatures: ["Resource sharing", "Collaboration tools", "Best practices"]
    }
  ];

  const benefits = [
    {
      title: "Streamlined Workflow",
      description: "Save time with automated grading and progress tracking",
      icon: "⚡"
    },
    {
      title: "Enhanced Learning",
      description: "Create personalized learning paths for each student",
      icon: "🎯"
    },
    {
      title: "Better Insights",
      description: "Make data-driven decisions with comprehensive analytics",
      icon: "📊"
    },
    {
      title: "Parent Engagement",
      description: "Build stronger relationships with parents through transparent communication",
      icon: "🤝"
    },
    {
      title: "Resource Sharing",
      description: "Collaborate with other teachers and share best practices",
      icon: "🔄"
    },
    {
      title: "Time Management",
      description: "Optimize your teaching schedule and reduce administrative tasks",
      icon: "⏰"
    }
  ];

  const tools = [
    {
      title: "Lesson Plan Generator",
      description: "AI-powered tool to create engaging lesson plans",
      icon: "🤖"
    },
    {
      title: "Assessment Builder",
      description: "Create various types of assessments with ease",
      icon: "📋"
    },
    {
      title: "Progress Tracker",
      description: "Monitor individual and class-wide progress",
      icon: "📈"
    },
    {
      title: "Parent Portal",
      description: "Keep parents informed and engaged",
      icon: "👨‍👩‍👧‍👦"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 animate-gradient" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Empower Your Teaching
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transform your classroom with our innovative teaching platform
            </motion.p>
            <motion.div 
              className="flex justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to="/teacher/auth"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                Get Started
              </Link>
              <Link
                to="/teacher/demo"
                className="bg-gray-800/50 hover:bg-gray-700/50 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all transform hover:scale-105 border border-gray-700 hover:border-gray-600"
              >
                Request Demo
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Quick Tools Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Quick Tools
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-700/50 transition-all duration-300 transform hover:-translate-y-1 border border-gray-700 hover:border-gray-600"
            >
              <div className="text-4xl mb-4">{tool.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-400">{tool.title}</h3>
              <p className="text-gray-400 text-sm">{tool.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Teaching Tools
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
              <h3 className="text-2xl font-semibold mb-3 text-indigo-400">{feature.title}</h3>
              <p className="text-gray-400 mb-6">{feature.description}</p>
              <div className="mb-6">
                <ul className="space-y-2">
                  {feature.subFeatures.map((subFeature, idx) => (
                    <li key={idx} className="text-gray-300 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {subFeature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to={feature.path}
                className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center group-hover:translate-x-2 transition-transform duration-300"
              >
                Explore 
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-800/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Why Choose StudySphere?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center relative"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-indigo-600/20 rounded-full flex items-center justify-center text-4xl">{benefit.icon}</div>
                <div className="pt-12">
                  <h3 className="text-2xl font-semibold mb-4 text-indigo-400">{benefit.title}</h3>
                  <p className="text-gray-400">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          What Teachers Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700"
          >
            <p className="text-gray-300 mb-6">"StudySphere has transformed how I manage my classroom. The analytics help me understand each student's needs better."</p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-indigo-600/20 rounded-full flex items-center justify-center text-xl">👨‍🏫</div>
              <div className="ml-4">
                <h4 className="font-semibold text-indigo-400">John Smith</h4>
                <p className="text-gray-400">High School Teacher</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700"
          >
            <p className="text-gray-300 mb-6">"The gamification features have increased student engagement significantly. My students love the interactive learning experience."</p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center text-xl">👩‍🏫</div>
              <div className="ml-4">
                <h4 className="font-semibold text-purple-400">Sarah Johnson</h4>
                <p className="text-gray-400">Middle School Teacher</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-3xl p-16"
        >
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of educators who are already revolutionizing their classrooms
          </p>
          <div className="flex justify-center gap-6">
            <Link
              to="/teacher/auth"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 px-12 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 inline-block"
            >
              Start Teaching
            </Link>
            <Link
              to="/teacher/contact"
              className="bg-gray-800/50 hover:bg-gray-700/50 text-white font-bold py-4 px-12 rounded-xl text-lg transition-all transform hover:scale-105 border border-gray-700 hover:border-gray-600 inline-block"
            >
              Contact Sales
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Teachers; 