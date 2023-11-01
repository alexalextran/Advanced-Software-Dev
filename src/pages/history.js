import React, { useState, useEffect } from 'react';
import Navigation from './navigation';
import { useAuth } from '../../context/AuthContext'
import Link from 'next/link';

const ChatHistory = () => {
  const { getUserHistory, history, setAnalytics } = useAuth();
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    getUserHistory()
    setSelectedChat(history[0]);
  }, []);

  // Use a useEffect to log analytics when selectedChat changes
  useEffect(() => {
    if (selectedChat) {
      setAnalytics(selectedChat.Analytics);
      console.log(selectedChat.Analytics);
    }
  }, [selectedChat]);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const analyticsButton =  {
    display: 'inline-block',
    backgroundColor: 'black', 
    color: 'white',
    padding: '10px 25px',
    border: '1px solid grey',
    borderRadius: '5px',
    textDecoration: 'none',
  }

  return (
    <>
      <Navigation />
      <div className="chat-history">
        <div className="chat-list">
          <h2>Chat History</h2>
          <ul>
            {history.map((chat) => (
              <li
                key={chat.id}
                onClick={() => handleChatSelect(chat)}
              >
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
              <p> <b>Interview Question</b></p>
              <ul>
                {selectedChat.InterviewQuestion}
              </ul>
              <p> <b>User Response</b></p>
              <ul>
                {selectedChat.userResponse}
              </ul>
              <p> <b>AI Response</b></p>
              <ul>
                {selectedChat.GPTResponse}
              </ul>
              <div style = {{textAlign: 'center', marginTop: '80px', marginBottom: '70px'}}>
                <Link  href={"/analytics"} style={analyticsButton}>Check Analytics</Link>
              </div>            
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatHistory;
