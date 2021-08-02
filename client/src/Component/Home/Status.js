import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Statusmodel from "./Statusmodel";
import { useSelector, useDispatch } from "react-redux";

const Status = ({ userData }) => {
  const [openStatusModel, setOpenStatusModel] = useState(false);

  return (
    <>
      <StatusContainer>
        <ProfileImage>
          <img src={userData.avatar} alt="Profile Image" />
        </ProfileImage>
        <FormButton>
          <button
            onClick={() => {
              setOpenStatusModel(true);
            }}
          >
            {userData.fullname}, what are you thinking?
          </button>
        </FormButton>
      </StatusContainer>
      {openStatusModel && (
        <Statusmodel
          setOpenStatusModel={setOpenStatusModel}
          userData={userData}
        />
      )}
    </>
  );
};

export default Status;

const StatusContainer = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid #eee;
  margin-top: 20px;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;

  @media (max-width: 700px) {
    width: 99%;
    margin-left: auto;
    margin-right: auto;
  }
`;
const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-left: 10px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const FormButton = styled.div`
  width: 85%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  button {
    width: 98%;
    height: 50px;
    border: none;
    cursor: pointer;
    border-radius: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
    background-color: #eee;
    color: #5f5f5f;
  }
`;
