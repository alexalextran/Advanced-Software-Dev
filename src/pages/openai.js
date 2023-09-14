import { useState, useEffect } from "react";
import { Inter } from 'next/font/google'
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }])

    sendMessage(inputValue);
    
    setInputValue('');
  }

  const sendMessage = (message) => {
    const url = '/api/chat';

    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [
        { "role": "user", "content": message },
      { "role": "assistant", "content": "you are an interviewer that is currently conducting an interview, reply in less than twenty words" }]
    };

    setIsLoading(true);

    axios.post(url, data).then((response) => {
      console.log(response);
      setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: response.data.choices[0].message.content }])
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
    })
  }

  return ( 
  <>
    <div>
      
        <h1 >ChatGPT</h1>
    
          {
        chatLog.map((message, index) => (
          <div key={index}>
            <div>
            {message.message}
            </div>
            </div>
        ))}
            
            {
              isLoading &&
              <div key={chatLog.length}>
                  <div >
                 
                  </div>
              </div>
            }
      </div>
       
        <form onSubmit={handleSubmit}>
          <div >  
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button >Send</button>
            </div>
        </form>
  </>
  )
}