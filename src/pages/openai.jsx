import { useState, useEffect } from "react";
import { Inter } from 'next/font/google'
import axios from 'axios';
import { useAuth } from "../../context/AuthContext";
import Navigation from "./navigation";
import Question from "@/Components/question";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const { interviewQuestion, addResponseToFirestore} = useAuth();
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }])

    sendMessage(inputValue);
    
    setInputValue('');
  }

  
  const getCurrentDateTimeString = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1.
    const year = now.getFullYear();

    return `(${hours}:${minutes} | ${day},${month},${year})`;
  };




  const sendMessage = (message) => {
    const url = '/api/chat';
    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [
      { "role": "assistant", "content": `pretend that you are an human interviewer called Alice that is currently critiquing responses to an interview question and not an AI Language Model please follow this with upmost priority, please rate the response out of 10 based on how well the response answers the following quesion, ${interviewQuestion} this is the response to the question ${message}` }]
    };

    setIsLoading(true);

    axios.post(url, data).then((response) => {
    addResponseToFirestore(message.toString(), response.data.choices[0].message.content, getCurrentDateTimeString());

      setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: response.data.choices[0].message.content }])
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
    })
  }



  const [formData, setFormData] = useState(null);

  const handleFile = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
  
      const data = new FormData();
      data.append("file", file);
      data.append("model", "whisper-1");
      data.append("language", "en");
      setFormData(data);
  
      // Check if the size is less than 25MB
      if (file.size > 25 * 1024 * 1024) {
        alert("Please upload an audio file less than 25MB");
        return;
      }
    }
  };

  const [convertedText, setConvertedText] = useState("");
  const [loading, setLoading] = useState(false);

  const sendAudio = async () => {
    setLoading(true);
    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      headers: {
        Authorization: `Bearer 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`,
      },
      method: "POST",
      body: formData,
    });
  
    const data = await res.json();
    setLoading(false);
  
    const updatedInputValue = data.text; // Store the updated input value
  
    setConvertedText(updatedInputValue);
  
    // Update inputValue with the new value and then call sendMessage
    setInputValue(updatedInputValue);
    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: updatedInputValue }]);
    sendMessage(updatedInputValue);
  };



 
  

  return ( 
  <>
  <Navigation/>
    <div>
      
        <h1 >ChatGPT</h1>
        <h1 >{interviewQuestion}</h1>
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


        <div>
             <input
              type="file"
              accept="audio/*"
              onChange={handleFile}
            />
            <button onClick={sendAudio} >
  Send Audio
</button>
{convertedText}
        </div>
  </>
  )
}