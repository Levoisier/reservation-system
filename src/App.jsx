import React, { useState } from 'react';
import ReservationForm from './components/ReservationForm.jsx';
import WaiterDashboard from './components/WaiterDashboard.jsx';

function App() {
  const [currentView, setCurrentView] = useState('client'); // 'client' or 'waiter'

  return (
    <div className="min-h-screen">
      {/* View Toggle */}
      <div className="fixed top-4 left-4 z-50">
        <div className="bg-white rounded-xl shadow-lg p-2 flex space-x-2">
          <button
            onClick={() => setCurrentView('client')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentView === 'client'
                ? 'bg-amber-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Client View
          </button>
          <button
            onClick={() => setCurrentView('waiter')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentView === 'waiter'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Waiter Dashboard
          </button>
        </div>
      </div>

      {/* Content */}
      {currentView === 'client' ? (
        <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-200 to-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            </div>
            
            {/* Main content */}
            <div className="relative z-10">
              <ReservationForm />
            </div>
          </div>
        </div>
      ) : (
        <WaiterDashboard />
      )}
    </div>
  );
}

export default App;