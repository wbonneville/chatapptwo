import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Join.css";

const Join = () => {
  // set state using useState hooks
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          {/* set the name of the user = to users typed value */}
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            // set the state of name = to user input
            onChange={event => setName(event.target.value)}
          />
        </div>
        <div>
          {/* set the name of the room = to users typed value */}
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            // set the state of room = to user input
            onChange={event => setRoom(event.target.value)}
          />
        </div>
        {/* don't let user go anywhere if the inputs aren't filled */}
        <Link
          onClick={e => (!name || !room ? e.preventDefault() : null)}
          // take the user to this url
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className={"button mt-20"} type="submit">
            Sign Into the Chatroom
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
