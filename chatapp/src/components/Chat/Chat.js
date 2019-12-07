// imports

import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";

// initialize socket

let socket;

// useState hooks for the functional component
// better than class components
// more versatile
// easy

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // server is hosted on heroku
  const ENDPOINT = "https://wesleyslivechat.herokuapp.com/";

  // useEffect runs only when name and room are set

  useEffect(() => {
    // location is built into react-router
    // name and room are pulled out of the url
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    // setRoom and setName are functions which change the state of room and name
    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, error => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  // useEffect hook for sockets
  // setMessages array = to all messages + current message
  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });

    // setUsers = to users
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    return () => {
      socket.emit("disconnect");
      // returned when a user disconnects
      socket.off();
    };
  }, [messages]);

  // when a message is typed into the input and sent, don't refresh the chatroom
  const sendMessage = event => {
    event.preventDefault();

    // emit the message
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        {/* set room prop = to room */}
        <InfoBar room={room} />
        {/* set messages prop = to messages and name = to name */}
        <Messages messages={messages} name={name} />
        {/* set input props */}
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      {/* user prop */}
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
