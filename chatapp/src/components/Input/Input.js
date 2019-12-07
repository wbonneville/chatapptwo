import React from "react";

import "./Input.css";

// get props passed down from Chat component
const Input = ({ message, setMessage, sendMessage }) => (
  <form action="" className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      // value = to message prop
      value={message}
      // set the current message = to whatever user types
      onChange={event => setMessage(event.target.value)}
      // if enter is pressed, send the message. otherwise, do nothing.
      onKeyPress={event => (event.key === "Enter" ? sendMessage(event) : null)}
    ></input>
    {/* send button does the same thing as pressing enter */}
    <button className="sendButton" onClick={event => sendMessage(event)}>
      Send
    </button>
  </form>
);

export default Input;
