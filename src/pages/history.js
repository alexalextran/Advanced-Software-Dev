import React, { useState, useEffect } from 'react';
import Navigation from './navigation';
import { useAuth } from '../../context/AuthContext'
import Link from 'next/link';
const ChatHistory = () => {
  const { getUserHistory, history, setAnalytics } = useAuth()
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
              <li key={chat.id} onClick={() => {
              handleChatSelect(chat)
              setAnalytics(selectedChat?.Analytics)  
            }}>
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
              <p> <Link  href={"/analytics"}>Analytics</Link></p>
             
            </div>
          )}
        </div>
      </div>
      </>
    );
  };
  
  export default ChatHistory;
