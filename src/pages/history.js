import React, { useState, useEffect } from 'react';
import Navigation from './navigation';
import { useAuth } from '../../context/AuthContext'
const ChatHistory = () => {
  const { getUserHistory, history } = useAuth()
    const [selectedChat, setSelectedChat] = useState(null);

    console.log(history)
    // Sample mock data for chat history
    const chatHistory = [
      {
        id: 1,
        user: 'User 1',
        messages: ['Hello!', 'How are you?'],
      },
      {
        id: 2,
        user: 'User 2',
        messages: ['Hi there!', 'I am good, thanks.'],
      },
      // Add more chat objects here
    ];
  
    useEffect(() => {
      getUserHistory()
      setSelectedChat(chatHistory[0]);
    }, []);
  
    const handleChatSelect = (chat) => {
      setSelectedChat(chat);
    };
  
    return (
        <>
        <Navigation/>
      <div className="chat-history">
        <div className="chat-list">
          <h2>Chat History</h2>
          <ul>
            {chatHistory.map((chat) => (
              <li key={chat.id} onClick={() => handleChatSelect(chat)}>
                {chat.user}
              </li>
            ))}
          </ul>
        </div>
        <div className="chat-display">
          <h2>Chat Display</h2>
          {selectedChat && (
            <div>
              <h3>{selectedChat.user}</h3>
              <ul>
                {selectedChat.messages.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      </>
    );
  };
  
  export default ChatHistory;
