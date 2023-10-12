import { useState, useEffect } from "react";
import { Inter } from 'next/font/google'
import axios from 'axios';
import { useAuth } from "../../context/AuthContext";
import Navigation from "./navigation";
import styles from '@/styles/openai.module.scss'
import Image from "next/image";
import loadingimage from "../../public/images/loading.png";
const inter = Inter({ subsets: ['latin'] })
import Link from 'next/link'


export default function OpenAI() {
  const { interviewQuestion, addResponseToFirestore, addAanalyticsDB, industrySelected} = useAuth();
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInputDisabled, setInputDisabled] = useState(false);
  const [isFileInputDisabled, setFileInputDisabled] = useState(false);
   
  const handleSubmit = (event) => {
    event.preventDefault();
    setInputDisabled(true); // Disable the text field
    setFileInputDisabled(true); // Disable the file input
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

  const addAanalytics = (inputString) => {
    const percentageObject = {};
    const percentageRegex = /((Confidence|Coherence|Professionalism|Creativity)): (\d+)%/g;
  
    const matches = inputString.match(percentageRegex);
  
    if (matches) {
      matches.forEach(match => {
        const [key, value] = match.split(': ');
        percentageObject[key] = value;
      });
    }
  
    addAanalyticsDB(percentageObject);
  };
    
  const sendMessage = (message) => {
    const url = '/api/chat';
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
      { "role": "assistant", "content": `You will play the role of a job interviewer who specialises in the field of ${industrySelected} that is currently critiquing my response
      to the interview question, ${interviewQuestion}.  My response is "${message}". You are to analyse my response and provide feedback and ratings for the four criteria:
      confidence, coherence, professionalism, and creativity as a percentage out of 100, for example Confidence: 50%. So if I were to response with an invalid response unrelated to the question or is vague,
      or inputs random texts, letters or symbol, reduce the percentage for the relevant criteria. One word or short responses will be deducted or given 0. Start with "Clarichat Feedback:" `
    }]
    };

    setIsLoading(true);

    axios.post(url, data).then((response) => {
    addResponseToFirestore(message.toString(), response.data.choices[0].message.content, getCurrentDateTimeString());
    addAanalytics(response.data.choices[0].message.content)
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
    setLoading(false);
  
    const updatedInputValue = data.text; // Store the updated input value
  
    setConvertedText(updatedInputValue);
  
    // Update inputValue with the new value and then call sendMessage
    setInputValue(updatedInputValue);
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
        <div className={styles.chatbox}>
          <h3>{interviewQuestion}</h3>
          <p>Please Begin When You Are Ready!</p>
          {
            chatLog.map((message, index) => (
              <div key={index} className={styles.message}>
                {message.message}
              </div>
            ))
          }
          {
            isLoading &&
            <div key={chatLog.length}>
              <Image className={styles.loading} src={loadingimage} alt="loading" width={100} height={100} />
              Analysing Response
            </div>
          }
        </div>
        <div className={styles.chatboxInput}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <input
              value={inputValue}
              placeholder="Enter Response Here"
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isInputDisabled} // Disable the text field
            />
            <button
              disabled={!inputValue.trim() || isInputDisabled} // Disable the button
            >
              Send
            </button>
          </div>
        </form>
        <p>Alternatively</p>
        <div className={styles.fileinput}>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFile}
            disabled={isFileInputDisabled} // Disable the file input
          />
          <button
            onClick={sendAudio}
            disabled={!formData || isFileInputDisabled} // Disable the button
          >
            Send Audio
          </button>
        </div>
        </div>
      </main>
    </>
  );
}