import React, { useState, useEffect } from 'react';
import Navigation from './navigation';
import { useAuth } from '../../context/AuthContext'
const ChatHistory = () => {
  const { getUserHistory, history } = useAuth()
    const [selectedChat, setSelectedChat] = useState(null);


   
  
    useEffect(() => {
      getUserHistory()
      setSelectedChat(history[0]);
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
            {history.map((chat) => (
              <li key={chat.id} onClick={() => handleChatSelect(chat)}>
                {chat.ID}
              </li>
            ))}
          </ul>
        </div>
        <div className="chat-display">
          <h2>Chat Display</h2>
          {selectedChat && (
            <div>
              <h3>{selectedChat.ID}</h3>
              <p>Interview Question</p>
              <ul>
                {selectedChat.InterviewQuestion}
              </ul>
              <p>User Response</p>
              <ul>
                {selectedChat.userResponse}
              </ul>
              <p>AI Response</p>
              <ul>
                {selectedChat.GPTResponse}
              </ul>
            </div>
          )}
        </div>
      </div>
      </>
    );
  };
  
  export default ChatHistory;
