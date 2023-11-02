import { useState } from "react";
import { Inter } from 'next/font/google'
import axios from 'axios';
import { useAuth } from "../../context/AuthContext";
import Navigation from "./navigation";
import styles from '@/styles/openai.module.scss'
const inter = Inter({ subsets: ['latin'] })
import ChatBox from "@/Components/ChatBox";
import InputForm from "@/Components/InputForm";
import 'react-circular-progressbar/dist/styles.css';

export default function OpenAI() {
  // Extracting variables and functions using destructuring
  const { interviewQuestion, addResponseToFirestore, industrySelected, jobselected } = useAuth();

  // State variables
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInputDisabled, setInputDisabled] = useState(false);
  const [isFileInputDisabled, setFileInputDisabled] = useState(false);
  const [value, setvalue] = useState(0);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setInputDisabled(true); // Disable the text field
    setFileInputDisabled(true); // Disable the file input
    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }]);
    sendMessage(inputValue);
    setInputValue('');
  }
  
  // Function to get the current date and time as a string
  const getCurrentDateTimeString = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1.
    const year = now.getFullYear();
    return `(${hours}:${minutes} | ${day},${month},${year})`;
  };

  // Function to extract percentages from the response message
  const addAanalytics = (inputString) => {
    const percentageObject = {};
    const percentageRegex = /((Confidence|Coherence|Professionalism|Creativity)): (\d+)%/g; // Regex to find and retrieve stats within the response
    const matches = inputString.match(percentageRegex);
    if (matches) {
      matches.forEach(match => {
        const [key, value] = match.split(': ');
        percentageObject[key] = value;
      });
    }
    return percentageObject;
  };
    
  // Function to send a message to the GPT API
  const sendMessage = (message) => {
    const url = '/api/chat';
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "assistant",
          "content": `Say Hi `
        }
      ]
    };

    setIsLoading(true);
    axios.post(url, data).then((response) => {
      setvalue(addAanalytics(response.data.choices[0].message.content));
      addResponseToFirestore(message.toString(), response.data.choices[0].message.content, getCurrentDateTimeString(),  addAanalytics(response.data.choices[0].message.content)); // Adds data to history DB
      setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: response.data.choices[0].message.content }]);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
    });
  }

  // State variable and function for handling file input
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

  // Function to send audio data
  const sendAudio = async () => {
    setInputDisabled(true); // Disable the text field
    setFileInputDisabled(true); // Disable the file input
    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      headers: {
        Authorization: `Bearer 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`,
      },
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    const updatedInputValue = data.text; // Store the updated input value
    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: updatedInputValue }]);
    sendMessage(updatedInputValue);
  };

  // Function to handle the back button click
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <Navigation />
      <main className={styles.main}>
        {/* Back Button */}
        <button onClick={handleGoBack}>Go Back</button>
        <ChatBox
          interviewQuestion={interviewQuestion}
          jobselected={jobselected}
          chatLog={chatLog}
          isLoading={isLoading}
          value={value}
        />
        <InputForm
          inputValue={inputValue}
          isInputDisabled={isInputDisabled}
          isFileInputDisabled={isFileInputDisabled}
          handleInputChange={(e) => setInputValue(e.target.value)}
          handleSubmit={handleSubmit}
          handleFile={handleFile}
          sendAudio={sendAudio}
        />
      </main>
    </>
  );
}
