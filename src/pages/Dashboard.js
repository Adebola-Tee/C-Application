import React, { useState, useEffect } from 'react';
import { fetchConversations, fetchConversationMessages, createConversation, deleteConversation, sendMessage } from '../Api';
import { formatDate } from '../components/Date';
import userAvatar from '../assets/Avatar.png';
import Header from '../components/Header';
import Swal from 'sweetalert2';
import '../index.css';
import './Dashboard.css';

const Dashboard = () => {
  const [showLeftSection, setShowLeftSection] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [botTyping, setBotTyping] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoadingConversations(true);
      try {
        const response = await fetchConversations();
        setConversations(response.data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoadingConversations(false);
      }
    };

    fetchInitialData();

    const updateDateTime = () => {
      setCurrentDateTime(formatDate(new Date()));
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleToggleSection = () => {
    setShowLeftSection(prevState => !prevState);
  };

  const handleAddConversation = async () => {
    try {
      const response = await createConversation();
      const newConversation = { ...response.data, messages: [] };
      setConversations(prevConversations => [...prevConversations, newConversation]);
      setCurrentConversation(newConversation);
      setShowLeftSection(false);
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  const handleSetCurrentConversation = async (conversation) => {
    setLoadingChat(true);
    try {
      const response = await fetchConversationMessages(conversation.id);
      setCurrentConversation({ ...conversation, messages: response.data || [] });
    } catch (error) {
      console.error('Error fetching conversation messages:', error);
    } finally {
      setLoadingChat(false);
    }
    setShowLeftSection(false);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleInputKeyPress = async (e) => {
    if (e.key === 'Enter' && userInput.trim()) {
      if (currentConversation) {
        const newMessage = { text: userInput, type: 'user' };
        const updatedConversation = { ...currentConversation, messages: [...currentConversation.messages, newMessage] };
        setCurrentConversation(updatedConversation);
        setUserInput('');
        setBotTyping(true);

        try {
          const response = await sendMessage(currentConversation.id, userInput);
          const botMessages = response.data.map(msg => ({ text: msg.content, type: 'bot' }));
          setCurrentConversation(prevState => ({
            ...prevState,
            messages: [...prevState.messages, ...botMessages]
          }));
        } catch (error) {
          console.error('Error sending message:', error);
        } finally {
          setBotTyping(false);
        }
      }
    }
  };

  const handleConfirmDelete = async (id) => {
    try {
      const conversationToDelete = conversations.find(convo => convo.id === id);
      if (!conversationToDelete) return;

      const result = await Swal.fire({
        title: `Are you sure you want to delete conversation ${conversationToDelete.id + 1}?`,
        showCancelButton: true,
        confirmButtonColor: '#FF0000',
        cancelButtonColor: '#DDF3FF',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true,
        customClass: {
          title: 'custom-swal-title',
          popup: 'bg-custom-purple',
        },
      });

      if (result.isConfirmed) {
        await deleteConversation(id);
        setConversations(prevConversations => prevConversations.filter(convo => convo.id !== id));
        if (currentConversation?.id === id) {
          setCurrentConversation(null);
        }
        Swal.fire('Deleted!', 'Your conversation has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your conversation is safe :)', 'error');
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  const renderConversations = () => {
    if (loadingConversations) {
      return (
        <div className="bg-light-gray h-full flex items-center justify-center">
          <div className="spinner"></div> Loading Conversations...
        </div>
      );
    }

    return (
      <div className="bg-light-gray h-full conversation-history">
        {conversations.map(convo => (
          <div
            key={convo.id}
            className={`p-2 mb-2 border rounded flex justify-between items-center cursor-pointer ${currentConversation?.id === convo.id ? 'bg-custom-purple text-white' : 'bg-light-gray text-black'}`}
            onClick={() => handleSetCurrentConversation(convo)}
          >
            <span>Conversation {convo.id + 1}</span>
            <button className="p-1 ml-2" onClick={(e) => { e.stopPropagation(); handleConfirmDelete(convo.id); }}>
              <img src="/images/delete.png" alt="Delete" className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderMessages = () => {
    if (loadingChat) {
      return (
        <div className="flex items-center justify-center">
          <div className="spinner"></div> Loading Messages...
        </div>
      );
    }

    return (
      <>
        {currentConversation.messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.type === 'bot' && (
              <div className="flex items-center">
                <img src="/images/profile image.png" alt="Chatbot" className="h-8 w-8 rounded-full mr-2" />
                <div className="text-custom-blue bg-#F0F9FF">{msg.text}</div>
              </div>
            )}
            {msg.type === 'user' && (
              <div className="flex items-center">
                <div className="p-2 rounded bg-custom-purple text-white">{msg.text}</div>
                <img src={userAvatar} alt="User" className="h-8 w-8 rounded-full ml-2" />
              </div>
            )}
          </div>
        ))}
        {botTyping && (
          <div className="flex items-center">
            <img src="/images/profile image.png" alt="Chatbot" className="h-8 w-8 rounded-full mr-2" />
            <div className="typing-indicator">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex flex-grow h-full">
        <div className={`flex-shrink-0 p-4 ${showLeftSection ? 'block' : 'hidden'} lg:block w-full lg:w-2/5`} style={{ minHeight: 'calc(100vh - 72px)' }}>
          <div className="flex items-center justify-between bg-custom-blue text-white p-2 mb-4">
            <span className="font-manrope text-base font-normal">Conversation</span>
            <span className="cursor-pointer w-6 h-6" onClick={handleAddConversation}>+</span>
            <img src="/images/menu-toggle.png" alt="Toggle" className="lg:hidden cursor-pointer" onClick={handleToggleSection} />
          </div>
          {renderConversations()}
        </div>
        <div className={`flex-grow p-4 ${showLeftSection ? 'hidden' : 'block'}`} style={{ minHeight: 'calc(100vh -72px)' }}>
          <div className="flex items-center justify-between bg-custom-blue text-white p-2 mb-4">
            <div className="flex items-center">
              <img src="/images/profile image.png" alt="profile" className="h-8 w-8 rounded-full mr-2" />
              <span>Chatbot</span>
            </div>
            <img src="/images/menu-toggle.png" alt="Toggle" className="lg:hidden cursor-pointer" onClick={handleToggleSection} />
          </div>
          <div className="flex flex-col h-full">
            {currentConversation ? (
              <>
                <div className="text-center text-gray-500 mb-2">{currentDateTime}</div>
                <div className="flex-grow bg-gray-100 p-4 overflow-y-auto">
                  {renderMessages()}
                </div>
              </>
            ) : (
              <div className="flex-grow bg-gray-100 p-4 overflow-y-auto"></div>
            )}
            <div className="flex items-center bg-white p-2 border-t">
              <input
                type="text"
                placeholder="Reply to Chatbot"
                value={userInput}
                onChange={handleInputChange}
                onKeyPress={handleInputKeyPress}
                className="flex-grow p-2 border rounded"
              />
              <button className="bg-custom-purple rounded-full p-2 ml-2">
                <img src="/images/send.png" alt="Send" className="w-8 h-8 rounded-full" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
