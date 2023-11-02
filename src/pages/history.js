import React, { useState, useEffect } from 'react';
import Navigation from './navigation';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

const ChatHistory = () => {
  // Get necessary data and functions from the context
  const { getUserHistory, history, setAnalytics, setwordCountStat } = useAuth();

  // State to keep track of the selected chat
  const [selectedChat, setSelectedChat] = useState(null);

  // Fetch user history and select the first chat on initial load
  useEffect(() => {
    getUserHistory();
    setSelectedChat(history[0]);
  }, []);

  // Use a useEffect to update analytics and word count when selectedChat changes
  useEffect(() => {
    if (selectedChat) {
      setAnalytics(selectedChat.Analytics);
      setwordCountStat(selectedChat.wordCount);
    }
  }, [selectedChat]);

  // Function to handle chat selection
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  // Style for the "Check Analytics" button
  const analyticsButtonStyle = {
    display: 'inline-block',
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 25px',
    border: '1px solid grey',
    borderRadius: '5px',
    textDecoration: 'none',
  };

  return (
    <>
      <Navigation />
      <div className="chat-history">
        <div className="chat-list">
          <h2>Chat History</h2>
          {history.length > 0 ? (
            <ul>
              {history.map((chat) => (
                <li key={chat.id} onClick={() => handleChatSelect(chat)}>
                  {chat.ID}
                </li>
              ))}
            </ul>
          ) : (
            <p>
              Nothing here to see! Go to <Link href="/dashboard">Dashboard</Link> to get started on some practice chats!
            </p>
          )}
        </div>
        <div className="chat-display">
          <h2>Chat Display</h2>
          {selectedChat && (
            <div>
              <h3>{selectedChat.ID}</h3>
              <p>
                <b>Interview Question</b>
              </p>
              <ul>{selectedChat.InterviewQuestion}</ul>
              <p>
                <b>User Response</b>
              </p>
              <ul>{selectedChat.userResponse}</ul>
              <p>
                <b>AI Response</b>
              </p>
              <ul>{selectedChat.GPTResponse}</ul>
              <div style={{ textAlign: 'center', marginTop: '80px', marginBottom: '70px' }}>
                <Link href="/analytics" style={analyticsButtonStyle}>
                  Check Analytics
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatHistory;
