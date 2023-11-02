import styles from '@/styles/openai.module.scss';

const InputForm = ({
  inputValue,
  isInputDisabled,
  isFileInputDisabled,
  handleInputChange,
  handleSubmit,
  handleFile,
  sendAudio,
}) => {
  return (
    <div className={styles.chatboxInput}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <input
            value={inputValue}
            placeholder="Enter Response Here"
            onChange={handleInputChange}
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
          disabled={isFileInputDisabled} // Disable the button
        >
          Send Audio
        </button>
      </div>
    </div>
  );
};

export default InputForm;
