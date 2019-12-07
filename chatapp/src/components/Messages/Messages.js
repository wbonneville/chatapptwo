import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "../Message/Message";

import "./Messages.css";

// display all the messages and continually scroll down
// map through each message and display them all with their username

const Messages = ({ messages, name }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
