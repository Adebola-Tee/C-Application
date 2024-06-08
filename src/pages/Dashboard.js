import React, { useState } from 'react';

const Dashboard = () => {
  const [showLeftSection, setShowLeftSection] = useState(false);
  const toggleSection = () => {
    setShowLeftSection(!showLeftSection);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Menu bar */}
      <div className="flex items-center justify-between p-4 border-b">
        <img src="/path/to/logo.png" alt="Logo" className="h-8" />
        <button className="bg-purple-600 text-white px-4 py-2 rounded" style={{ width: '98px', height: '36px' }}>Logout</button>
      </div>

      <div className="flex flex-grow h-full">
        {/* Left Section */}
        <div className={`flex-shrink-0 p-4 ${showLeftSection ? 'block' : 'hidden'} lg:block w-full lg:w-2/5`} style={{ minHeight: 'calc(100vh - 72px)' }}>
          <div className="flex items-center justify-between bg-blue-600 text-white p-2 mb-4">
            <span>Conversation</span>
            <span>+</span>
            <button className="lg:hidden" onClick={toggleSection}>Toggle</button>
          </div>
          <div className="bg-gray-500 h-full lg:w-full w-4/5">
            {/* Placeholder for conversations */}
          </div>
        </div>

        {/* Right Section */}
        <div className={`flex-grow p-4 ${showLeftSection ? 'hidden' : 'block'}`} style={{ minHeight: 'calc(100vh - 72px)' }}>
          <div className="flex items-center justify-between bg-blue-600 text-white p-2 mb-4">
            <div className="flex items-center">
              <img src="/path/to/chatbot.png" alt="Chatbot" className="h-8 w-8 rounded-full mr-2" />
              <span>Chatbot</span>
            </div>
            <button className="lg:hidden" onClick={toggleSection}>Toggle</button>
          </div>
          <div className="flex flex-col h-full">
            <div className="flex-grow bg-gray-100 p-4">
              {/* Placeholder for chat area */}
            </div>
            <div className="flex items-center bg-white p-2 border-t">
              <input
                type="text"
                placeholder="Replying to chat"
                className="flex-grow p-2 border rounded"
              />
              <button className="bg-purple-600 text-white p-2 ml-2 rounded-full">
                {/* Logo */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
