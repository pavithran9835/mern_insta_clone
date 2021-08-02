import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { getCookie } from "../../helper";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  const token = getCookie("token");

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser);

    const getUser = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/user/getUserProfile/${friendId}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(data.userProfile);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [conversation, currentUser]);

  return (
    <Conversationcontainer>
      {user && (
        <>
          <img src={user.avatar} alt="Profile" />
          <p>{user.username}</p>
        </>
      )}
    </Conversationcontainer>
  );
};

export default Conversation;

const Conversationcontainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #eaeaea;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 10px;
    margin-right: 10px;
  }
`;
