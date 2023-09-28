import React from 'react';
import Navigation from "./navigation";
import styles from "@/styles/chatscreen.module.scss";

const Chat = () => {
  return (
    <div>
      <Navigation />
      <iframe
        src="https://hickman2049-gradio-chatai.hf.space"
        frameborder="0"
        className={styles.iframe}
        allow="microphone"
      ></iframe>
    </div>
  );
}

export default Chat;
