import React from 'react';

const Chat = () => {


    fetch("https://tomsoderlund-rest-api-with-gradio.hf.space/run/predict", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    data: [
      "hello world!!!",
	]
  })})
.then(r => r.json())
.then(
  r => {
    let data = r.data;
    console.log(data)
  }
)

    return (
        <div>
            hello world!
        </div>
    );
}

export default Chat;
