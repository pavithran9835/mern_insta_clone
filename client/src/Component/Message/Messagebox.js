import React from "react";
import styled from "styled-components";
import "./message.css";
import moment from "moment";

const Messagebox = ({ own, message }) => {
  return (
    <div className={own ? "Messagelistend" : "Messagelist"}>
      <div className={own ? "Messageinfo" : "Messageinfoend"}>
        <img
          src="https://images3.alphacoders.com/819/819214.jpg"
          alt="Profile"
        />
        <div>
          <p>{message.text}</p>
          <p className="timePara">{moment(message.createdAt).fromNow()}</p>
        </div>
      </div>
    </div>
  );
};

export default Messagebox;

const Messagelist = {
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
};

const Messagelistend = {
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "flex-end",
};
