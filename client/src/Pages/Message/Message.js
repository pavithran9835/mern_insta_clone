import React, { useEffect, useState } from "react";
import Header from "../../Component/Header/Header";
import styled from "styled-components";
import {} from "./Messagestyle";
import Conversation from "../../Component/Message/Conversation";
import Messagebox from "../../Component/Message/Messagebox";
import axios from "axios";
import { useRef } from "react";
import { io } from "socket.io-client";

const Message = () => {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const { _id } = JSON.parse(localStorage.getItem("user"));
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const s = io("ws://localhost:8900");
    setSocket(s);
    return () => {
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", _id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [_id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/conversation/${_id}`
        );
        setConversation(res.data.coversation);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [_id]);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/message/getMessage/${currentChat?._id}`
        );
        setMessages(res.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const messageData = {
      sender: _id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await axios.post(
        `http://localhost:5000/message/createMessage`,
        messageData
      );
      // console.log(res.data);
      setMessages([...messages, res.data.savedMessage]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <MessageBox>
        <Chatmenu>
          <form action="">
            <input type="text" placeholder="search for friends..." />
            {conversation.length > 0 &&
              conversation.map((c, index) => (
                <div
                  onClick={() => {
                    setCurrentChat(c);
                  }}
                  key={index}
                >
                  <Conversation conversation={c} currentUser={_id} />
                </div>
              ))}
          </form>
        </Chatmenu>
        <Chatbox>
          <Messageboxarea>
            {messages.map((message, index) => (
              <div key={index} ref={scrollRef}>
                <Messagebox message={message} own={message.sender === _id} />
              </div>
            ))}
          </Messageboxarea>

          <Messageinputarae>
            <Textareamessage>
              <input
                type="text"
                placeholder="Type your message..."
                name="text"
                onChange={(e) => {
                  setNewMessage(e.target.value);
                }}
                value={newMessage}
                autoComplete="off"
              />
              <button onClick={formSubmitHandler}>send</button>
            </Textareamessage>
          </Messageinputarae>
        </Chatbox>
      </MessageBox>
    </>
  );
};

export default Message;

const MessageBox = styled.div`
  width: 60%;
  height: 75%;
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 50px;

  @media (max-width: 800px) {
    width: 95%;
  }
`;

const Chatmenu = styled.div`
  width: 35%;
  height: 100%;
  border: 1px solid #eee;

  input {
    width: 97%;
    height: 60px;
    border: none;
    outline: none;
    border-bottom: 1px solid #eee;
    padding-left: 10px;
  }
`;
const Chatbox = styled.div`
  width: 65%;
  height: 100%;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
`;

const Messageboxarea = styled.div`
  width: 100%;
  height: 88%;
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Messageinputarae = styled.div`
  width: 100%;
  height: 12%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const Textareamessage = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #eee;
  display: flex;
  align-items: center;

  input {
    width: 80%;
    height: 100%;
    border: none;
    outline: none;
    border-bottom: 1px solid #eee;
    padding-left: 10px;
  }

  button {
    width: 20%;
    height: 60%;
    border: none;
    outline: none;
    background-color: #000;
    cursor: pointer;
    border-radius: 10px;
    color: #fff;
  }
`;
