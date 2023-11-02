import styles from '../styles/openai.module.scss';
import Image from "next/image";
import CircularProgressBar from './CircularPogressBar';
import loadingimage from "../../public/images/loading.png";
const ChatBox = ({ interviewQuestion, jobselected, chatLog, isLoading, value }) => {
  return (
    <div className={styles.chatbox}>
      <h3>{interviewQuestion}</h3>
      <h5>{jobselected}</h5>
      <p>Please begin when you are ready!</p>
      <div className={styles.stats_Container}>
            <CircularProgressBar label="Professionalism" value={value.Professionalism} color="rgb(0,209,178)" />
            <CircularProgressBar label="Confidence" value={value.Confidence} color="rgb(255,221,87)" />
            <CircularProgressBar label="Coherence" value={value.Coherence} color="rgb(255,56,96)" />
            <CircularProgressBar label="Creativity" value={value.Creativity} color="rgb(243,115,31)" />
      </div>
      {chatLog.map((message, index) => (
        <div key={index} className={styles.message}>
          {message.message}
        </div>
      ))}
      {isLoading && (
        <div key={chatLog.length}>
          <Image className={styles.loading} src={loadingimage} alt="loading" width={100} height={100} />
          Analyzing Response
        </div>
      )}
    </div>
  );
};

export default ChatBox;
