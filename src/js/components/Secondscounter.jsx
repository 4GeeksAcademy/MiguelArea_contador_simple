import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../styles/index.css";

const SecondsCounter = ({ seconds }) => {
  const digit6 = Math.floor(seconds / 100000) % 10;
  const digit5 = Math.floor(seconds / 10000) % 10;
  const digit4 = Math.floor(seconds / 1000) % 10;
  const digit3 = Math.floor(seconds / 100) % 10;
  const digit2 = Math.floor(seconds / 10) % 10;
  const digit1 = Math.floor(seconds % 10);

  return (
    <div className="counter-container">
      <div className="digit-box">
        <i className="far fa-clock"></i>
      </div>
      <div className="digit-box">{digit6}</div>
      <div className="digit-box">{digit5}</div>
      <div className="digit-box">{digit4}</div>
      <div className="digit-box">{digit3}</div>
      <div className="digit-box">{digit2}</div>
      <div className="digit-box">{digit1}</div>
    </div>
  );
};

export default SecondsCounter;
