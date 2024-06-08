import React, { useState } from 'react';

const Dashboard = () => {
  const [showLeftSection, setShowLeftSection] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [userInput, setUserInput] = useState('');

  const toggleSection = () => {
    setShowLeftSection(!showLeftSection);
  };

  const addConversation = () => {
    const newConversation = {
      id: conversations.length,
      date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }),
      messages: [{ text: 'How do I help you?', type: 'bot' }],
    };
    setConversations([...conversations, newConversation]);
    setCurrentConversation(newConversation);
    setShowLeftSection(false); // Close the left section on small screens
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' && userInput.trim() !== '') {
      const updatedConversation = {
        ...currentConversation,
        messages: [...currentConversation.messages, { text: userInput, type: 'user' }],
      };
      setConversations(conversations.map(convo => convo.id === currentConversation.id ? updatedConversation : convo));
      setCurrentConversation(updatedConversation);
      setUserInput('');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Menu bar */}
      <div className="flex items-center justify-between p-4 border-b">
        <img src="/path/to/logo.png" alt="Logo" className="h-8" />
        <button className="bg-purple-600 text-white px-4 py-2 rounded" style={{ width: '98px', height: '36px' }}>Logout</button>
      </div>

      <div className="flex flex-grow h-full">
        {/* conversation section */}
        <div className={`flex-shrink-0 p-4 ${showLeftSection ? 'block' : 'hidden'} lg:block w-full lg:w-2/5`} style={{ minHeight: 'calc(100vh - 72px)' }}>
          <div className="flex items-center justify-between bg-blue-600 text-white p-2 mb-4">
            <span>Conversation</span>
            <span className="cursor-pointer" onClick={addConversation}>+</span>
            <button className="lg:hidden" onClick={toggleSection}>Toggle</button>
          </div>
          <div className="bg-gray-500 h-full lg:w-full w-4/5 conversation-history">
            {conversations.map(convo => (
              <div
                key={convo.id}
                className="p-2 mb-2 bg-white border rounded cursor-pointer"
                onClick={() => {
                  setCurrentConversation(convo);
                  setShowLeftSection(false);
                }}
              >
                Conversation {convo.id + 1}
              </div>
            ))}
          </div>
        </div>

        {/* chat section*/}
        <div className={`flex-grow p-4 ${showLeftSection ? 'hidden' : 'block'}`} style={{ minHeight: 'calc(100vh - 72px)' }}>
          <div className="flex items-center justify-between bg-blue-600 text-white p-2 mb-4">
            <div className="flex items-center">
              <img src="/path/to/chatbot.png" alt="Chatbot" className="h-8 w-8 rounded-full mr-2" />
              <span>Chatbot</span>
            </div>
            <button className="lg:hidden" onClick={toggleSection}>Toggle</button>
          </div>
          {currentConversation && (
            <div className="flex flex-col h-full">
              <div className="text-center text-gray-500 mb-2">{currentConversation.date}</div>
              <div className="flex-grow bg-gray-100 p-4 overflow-y-auto">
                {currentConversation.messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.type === 'bot' && (
                      <img src="/path/to/chatbot.png" alt="Chatbot" className="h-8 w-8 rounded-full mr-2" />
                    )}
                    <div className={`p-2 rounded ${msg.type === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-black'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center bg-white p-2 border-t">
                <input
                  type="text"
                  placeholder="Replying to chat"
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyPress={handleInputKeyPress}
                  className="flex-grow p-2 border rounded"
                />
                <button className="bg-purple-600 text-white p-2 ml-2 rounded-full">
                  {/* Logo */}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
