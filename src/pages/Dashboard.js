import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchConversations, fetchConversationMessages, createConversation, deleteConversation, sendMessage } from '../Apii';
import { formatDate } from '../components/Date';

const Dashboard = () => {
  const [showLeftSection, setShowLeftSection] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversationState] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await fetchConversations();
        setConversations(response.data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    getConversations();

    const updateDateTime = () => {
      const date = new Date();
      setCurrentDateTime(formatDate(date));
    };

    // Set the initial date and time
    updateDateTime();

    // Update the date and time every minute
    const intervalId = setInterval(updateDateTime, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const toggleSection = () => {
    setShowLeftSection(!showLeftSection);
  };

  const addConversation = async () => {
    try {
      const response = await createConversation();
      const newConversation = response.data;
      setConversations([...conversations, newConversation]);
      setCurrentConversationState(newConversation);
      setShowLeftSection(false); // Close the left section on small screens
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const setCurrentConversation = async (conversation) => {
    setLoading(true);
    try {
      const response = await fetchConversationMessages(conversation.id);
      setCurrentConversationState({ ...conversation, messages: response.data });
    } catch (error) {
      console.error('Error fetching conversation messages:', error);
    } finally {
      setLoading(false);
    }
    setShowLeftSection(false); // Close the left section when a conversation is selected
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleInputKeyPress = async (e) => {
    if (e.key === 'Enter' && userInput.trim() !== '') {
      if (currentConversation) {
        const updatedConversation = {
          ...currentConversation,
          messages: [...currentConversation.messages, { text: userInput, type: 'user' }],
        };
        setCurrentConversationState(updatedConversation);
        setUserInput('');

        try {
          const response = await sendMessage(currentConversation.id, userInput);
          const botResponse = response.data;
          setCurrentConversationState({
            ...updatedConversation,
            messages: [...updatedConversation.messages, ...botResponse.map(msg => ({ text: msg.content, type: 'bot' }))]
          });
        } catch (error) {
          console.error('Error sending message:', error);
        }
      }
    }
  };

  const deleteConversation = async (id) => {
    try {
      await deleteConversation(id);
      setConversations(conversations.filter(convo => convo.id !== id));
      if (currentConversation && currentConversation.id === id) {
        setCurrentConversationState(null);
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <img src="/images/logo.png" alt="Logo" className="h-8" />
        <button
  onClick={handleLogout}
  className="bg-custom-purple text-white px-4 py-2 rounded font-manrope"
  style={{ width: '98px', height: '36px' }}
>
  Logout
</button>

      </div>
      <div className="flex flex-grow h-full">
        <div className={`flex-shrink-0 p-4 ${showLeftSection ? 'block' : 'hidden'} lg:block w-full lg:w-2/5`} style={{ minHeight: 'calc(100vh - 72px)' }}>
          <div className="flex items-center justify-between bg-custom-blue text-white p-2 mb-4">
            <span className='font-manrope text-base font-normal leading-5 text-left'>Conversation</span>
            <span className="cursor-pointer w-6 h-6" onClick={addConversation}>+</span>
            <img
  src="/images/menu-toggle.png"
  alt="Toggle Image"
  className="lg:hidden cursor-pointer"
  onClick={toggleSection}
/>

          </div>
          {loading ? (
            <div className="bg-light-gray h-full lg:w-full w-4/5 conversation-history">Loading...</div>
          ) : (
            <div className="bg-light-gray h-full lg:w-full w-4/5 conversation-history">
              {conversations.map(convo => (
                <div
                  key={convo.id}
                  className="p-2 mb-2 bg-white border rounded flex justify-between items-center cursor-pointer"
                  onClick={() => setCurrentConversation(convo)}
                >
                  <span>Conversation {convo.id + 1}</span>
                  <button
  className=" p-1 ml-2"
  onClick={(e) => {
    e.stopPropagation();
    deleteConversation(convo.id);
  }}
>
  <img
    src="/images/delete.png"
    alt="Delete Conversation"
    className="w-4 h-4"
  />
</button>

                </div>
              ))}
            </div>
          )}
        </div>
        <div className={`flex-grow p-4 ${showLeftSection ? 'hidden' : 'block'}`} style={{ minHeight: 'calc(100vh - 72px)' }}>
          <div className="flex items-center justify-between bg-blue-600 text-white p-2 mb-4">
            <div className="flex items-center">
              <img src="/images/profile image.png" alt="profile image" className="h-8 w-8 rounded-full mr-2" />
              <span>Chatbot</span>
            </div>
            <img
            src="/images/menu-toggle.png"
            alt="Toggle Image"
            className="lg:hidden cursor-pointer"
            onClick={toggleSection}
          />
          </div>
          <div className="flex flex-col h-full">
            {currentConversation ? (
              <>
                <div className="text-center text-gray-500 mb-2">{currentDateTime}</div>
                <div className="flex-grow bg-gray-100 p-4 overflow-y-auto">
                  {currentConversation.messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.type === 'bot' && (
                        <img src="/images/profile image.png" alt="Chatbot" className="h-8 w-8 rounded-full mr-2" />
                      )}
                      <div className={`p-2 rounded ${msg.type === 'user' ? 'bg-custom-purple text-white' : 'bg-gray-200 text-black'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex-grow bg-gray-100 p-4 overflow-y-auto"></div>
            )}
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
