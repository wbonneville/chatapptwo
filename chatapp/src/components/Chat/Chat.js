import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
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
    // re-render useEffet only if these two values change
  }, [ENDPOINT, location.search]);

  return <h1>Chat</h1>;
};

export default Chat;
