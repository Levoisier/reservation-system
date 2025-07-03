import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Calendar, Users, Search, ChefHat, Clock, MessageSquare, X, CheckCircle, Sparkles } from 'lucide-react';

const ReservationForm = () => {
  const [step, setStep] = useState(1); // 1: form, 2: table selection
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Table data - repositioned to avoid overlapping with kitchen and bar
  const tables = [
    { id: 1, x: 120, y: 140, available: true },
    { id: 2, x: 280, y: 140, available: false },
    { id: 3, x: 440, y: 140, available: true },
    { id: 4, x: 600, y: 140, available: true },
    { id: 5, x: 120, y: 240, available: true },
    { id: 6, x: 280, y: 240, available: true },
    { id: 7, x: 440, y: 240, available: false },
    { id: 8, x: 600, y: 240, available: true },
  ];

  const timeSlots = [
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', 
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
  ];

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!date) {
      alert('Please select a date');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setStep(2); // Move to table selection step
  };

  const handleTableSelect = (tableId) => {
    const table = tables.find(t => t.id === tableId);
    if (table && table.available) {
      setSelectedTable(tableId);
    }
  };

  const handleFinalReservation = async () => {
    if (!selectedTime) {
      alert('Please select a time');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowConfirmation(true);
  };

  const resetForm = () => {
    setStep(1);
    setDate('');
    setGuests(2);
    setSelectedTable(null);
    setSelectedTime('');
    setNotes('');
    setShowConfirmation(false);
  };

  // Enhanced animation variants - optimized to prevent re-triggering
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
        staggerChildren: 0.15
      }
    }
  };

  const slideUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const slideInLeftVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const slideInRightVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      y: -2,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      y: 0,
      transition: {
        duration: 0.1
      }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3
      }
    }
  };

  const successIconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.2,
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const sparkleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: [0, 1.2, 1],
      opacity: [0, 1, 0.8],
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Step 1 Component - Memoized to prevent unnecessary re-renders
  const Step1Component = React.memo(() => (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={slideUpVariants}
        className="text-center mb-6 sm:mb-8"
      >
        <motion.div
          initial={{ rotate: -10, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-4 shadow-lg relative"
        >
          <ChefHat className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute -top-1 -right-1"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </motion.div>
        </motion.div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Reserve a Table</h1>
        <p className="text-sm sm:text-base text-gray-600">Book your perfect dining experience</p>
      </motion.div>

      {/* Form */}
      <motion.form
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        onSubmit={handleInitialSubmit}
        className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 backdrop-blur-sm border border-gray-100"
      >
        <div className="space-y-4 sm:space-y-6">
          {/* Date Input */}
          <motion.div variants={slideInLeftVariants}>
            <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
              Select Date
            </label>
            <motion.div 
              className="relative"
              whileFocus="focus"
              variants={inputVariants}
            >
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-sm sm:text-base"
              />
            </motion.div>
          </motion.div>

          {/* Guests Input */}
          <motion.div variants={slideInRightVariants}>
            <label htmlFor="guests" className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Guests
            </label>
            <motion.div 
              className="relative"
              whileFocus="focus"
              variants={inputVariants}
            >
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                id="guests"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white appearance-none cursor-pointer text-sm sm:text-base"
              >
                {[...Array(5)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i + 1 === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
                <option value={6}>6+ Guests</option>
              </select>
            </motion.div>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={scaleInVariants}>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Search Available Tables</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          variants={slideUpVariants}
          className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100"
        >
          <p className="text-xs sm:text-sm text-amber-700 text-center">
            <span className="font-semibold">Pro Tip:</span> Book early for weekend reservations!
          </p>
        </motion.div>
      </motion.form>

      {/* Footer */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={slideUpVariants}
        className="text-center mt-4 sm:mt-6"
      >
        <p className="text-xs sm:text-sm text-gray-500">
          Need help? <a href="#" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">Contact us</a>
        </p>
      </motion.div>
    </motion.div>
  ));

  // Step 2 Component - Optimized to prevent re-renders on notes change
  const Step2Component = React.memo(() => (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={slideUpVariants}
        className="text-center mb-6 sm:mb-8"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Select Your Table</h2>
        <p className="text-sm sm:text-base text-gray-600 px-4">
          Choose from our available tables for {date ? new Date(date).toLocaleDateString() : 'your selected date'} • {guests} {guests === 1 ? 'Guest' : 'Guests'}
        </p>
      </motion.div>

      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm border border-gray-100">
        {/* Floor Plan - Static after initial animation */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={slideInLeftVariants}
          className="mb-6 sm:mb-8"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Restaurant Floor Plan</h3>
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
              
              {/* Tables - Only animate on mount, not on state changes */}
              {tables.map((table, index) => (
                <motion.g 
                  key={table.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <motion.circle
                    cx={table.x}
                    cy={table.y}
                    r="35"
                    fill={
                      !table.available 
                        ? "#9ca3af" 
                        : selectedTable === table.id 
                          ? "#f59e0b" 
                          : "#ffffff"
                    }
                    stroke={
                      !table.available 
                        ? "#6b7280" 
                        : selectedTable === table.id 
                          ? "#d97706" 
                          : "#e5e7eb"
                    }
                    strokeWidth="3"
                    className={table.available ? "cursor-pointer" : "cursor-not-allowed"}
                    whileHover={table.available ? { 
                      scale: 1.1, 
                      fill: "#fef3c7",
                      transition: { duration: 0.2 }
                    } : {}}
                    whileTap={table.available ? { scale: 0.95 } : {}}
                    onClick={() => handleTableSelect(table.id)}
                  />
                  <text
                    x={table.x}
                    y={table.y + 5}
                    textAnchor="middle"
                    className={`text-sm font-bold ${
                      !table.available 
                        ? "fill-gray-500" 
                        : selectedTable === table.id 
                          ? "fill-white" 
                          : "fill-gray-700"
                    } pointer-events-none`}
                  >
                    {table.id}
                  </text>
                </motion.g>
              ))}
              
              {/* Legend */}
              <g transform="translate(30, 280)">
                <circle cx="12" cy="12" r="10" fill="#ffffff" stroke="#e5e7eb" strokeWidth="2" />
                <text x="30" y="17" className="text-xs fill-gray-600">Available</text>
                
                <circle cx="110" cy="12" r="10" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
                <text x="128" y="17" className="text-xs fill-gray-600">Selected</text>
                
                <circle cx="200" cy="12" r="10" fill="#9ca3af" stroke="#6b7280" strokeWidth="2" />
                <text x="218" y="17" className="text-xs fill-gray-600">Unavailable</text>
              </g>
            </svg>
          </div>
        </motion.div>

        {/* Time and Notes Selection - Only animate when selectedTable changes */}
        <AnimatePresence>
          {selectedTable && (
            <motion.div
              key={`table-${selectedTable}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Static container for form fields - no animation on text input */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Time Selection */}
                <div>
                  <label htmlFor="time" className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      id="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white appearance-none cursor-pointer text-sm sm:text-base"
                    >
                      <option value="">Choose a time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Notes - No motion wrapper to prevent re-renders */}
                <div>
                  <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any dietary restrictions, special occasions, or other requests..."
                      rows="3"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <motion.button
                  type="button"
                  onClick={() => setStep(1)}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200 text-sm sm:text-base"
                >
                  Back
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleFinalReservation}
                  disabled={!selectedTime || isSubmitting}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <span>Reserve Table {selectedTable}</span>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  ));

  return (
    <>
      {/* Main Content */}
      <AnimatePresence mode="wait">
        {step === 1 && <Step1Component />}
        {step === 2 && <Step2Component />}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full mx-4 relative overflow-hidden"
            >
              {/* Success Animation Background */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 2, opacity: 0.1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="absolute inset-0 bg-green-500 rounded-full"
              />

              {/* Success Icon */}
              <div className="text-center mb-6 relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 relative"
                >
                  <motion.div variants={successIconVariants} initial="hidden" animate="visible">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </motion.div>
                  
                  {/* Sparkle effects */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      variants={sparkleVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="absolute"
                      style={{
                        top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 30}px`,
                        left: `${20 + Math.cos(i * 60 * Math.PI / 180) * 30}px`,
                      }}
                    >
                      <Sparkles className="w-3 h-3 text-yellow-400" />
                    </motion.div>
                  ))}
                </motion.div>
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl sm:text-2xl font-bold text-gray-900 mb-2"
                >
                  Reservation Confirmed!
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm sm:text-base text-gray-600"
                >
                  Your table has been successfully reserved
                </motion.p>
              </div>

              {/* Reservation Details */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 space-y-3 relative z-10"
              >
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="font-medium text-gray-700">Date:</span>
                  <span className="text-gray-900">{date ? new Date(date).toLocaleDateString() : 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="font-medium text-gray-700">Time:</span>
                  <span className="text-gray-900">{selectedTime}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="font-medium text-gray-700">Table:</span>
                  <span className="text-gray-900">Table {selectedTable}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="font-medium text-gray-700">Guests:</span>
                  <span className="text-gray-900">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                </div>
                {notes && (
                  <div className="pt-2 border-t border-gray-200">
                    <span className="font-medium text-gray-700 block mb-1 text-sm sm:text-base">Special Requests:</span>
                    <span className="text-gray-900 text-xs sm:text-sm">{notes}</span>
                  </div>
                )}
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 relative z-10"
              >
                <motion.button
                  onClick={resetForm}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-200 transition-all duration-200 text-sm sm:text-base"
                >
                  New Reservation
                </motion.button>
                <motion.button
                  onClick={() => setShowConfirmation(false)}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all duration-300 text-sm sm:text-base"
                >
                  Close
                </motion.button>
              </motion.div>

              {/* Close Button */}
              <motion.button
                onClick={() => setShowConfirmation(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReservationForm;