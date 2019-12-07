import React from "react";

import "./InfoBar.css";
import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";

// info bar

// recieves room prop
const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      {/* display online icon */}
      <img src={onlineIcon} className="onlineIcon" alt="online" />
      {/* display name of the room */}
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">
        {/* close icon */}
        <img src={closeIcon} alt="close" />
      </a>
    </div>
  </div>
);

export default InfoBar;
