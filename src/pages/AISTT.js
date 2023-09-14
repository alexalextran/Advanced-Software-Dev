import React, { useState } from 'react';

const AISTT = () => {
    

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
  
      setConvertedText(data.text);
  
    };


    return (
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
    );
}

export default AISTT;
