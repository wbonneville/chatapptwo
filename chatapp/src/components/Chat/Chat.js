import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "localhost:5000";

  // useEffect runs when the component renders
  // retrieve users data

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    // pass endpoint to server
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
    // re-render useEffect only if these two values change
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    // listen for messages
    socket.on("message", message => {
      // use spread operator
      // add one message into array of messages
      // adding all messages to messages array
      setMessages([...messages, message]);
    });
    // only run useEffect when messages array changes
  }, [messages]);

  // create a function for sending messages

  const sendMessage = event => {
    // don't refresh the whole page
    event.preventDefault();
    // emit listener is in index.js
    // emit listener listens for the sendMessage event
    // sends message to server

    if (message) {
      // when you send a message
      // the message field returns to empty string
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <input
          value={message}
          onChange={event => setMessage(event.target.value)}
          onKeyPress={event =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
      </div>
    </div>
  );
};

export default Chat;
