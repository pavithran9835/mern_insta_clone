import React, { useEffect, useState } from "react";
import Header from "../../Component/Header/Header";
import Posts from "../../Component/Home/Posts";
import Status from "../../Component/Home/Status";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfileAction } from "../../Redux/Action/user.action";
import { getCookie } from "../../helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Suggestion from "../../Component/Home/Suggestion";

const Home = () => {
  const dispatch = useDispatch();

  const token = getCookie("token");
  const { _id } = JSON.parse(localStorage.getItem("user"));

  const [userData, setUserData] = useState({});

  useEffect(() => {
    dispatch(getUserProfileAction(_id, token));
  }, [dispatch]);

  const { userProfileDetails } = useSelector((state) => state.getUserProfile);

  useEffect(() => {
    if (userProfileDetails) {
      setUserData(userProfileDetails);
    }
  }, [userProfileDetails]);

  const { message, error } = useSelector((state) => state.createPost);

  const { deleteMessage } = useSelector((state) => state.deletePost);

  useEffect(() => {
    toast.info(message);
    toast.info(error);
    toast.info(deleteMessage);
  }, [message, error, deleteMessage]);

  return (
    <HomePage>
      <Header />
      <ToastContainer autoClose={2500} hideProgressBar />
      <HomeContainer>
        <PostsContainer>
          <Status userData={userData} />
          <Posts userData={userData} />
        </PostsContainer>
        <SuggestionContainer>
          <Suggestion userData={userData} />
        </SuggestionContainer>
      </HomeContainer>
    </HomePage>
  );
};

export default Home;

const HomePage = styled.div`
  width: 100%;
  min-height: auto;
  background-color: #fafafa;
  position: relative;
`;

const HomeContainer = styled.div`
  width: 65%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  overflow: hidden;

  @media (max-width: 1300px) {
    width: 70%;
  }

  @media (max-width: 1200px) {
    width: 75%;
  }

  @media (max-width: 1100px) {
    width: 80%;
  }

  @media (max-width: 1000px) {
    width: 85%;
  }

  @media (max-width: 900px) {
    width: 90%;
  }

  @media (max-width: 800px) {
    width: 95%;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const PostsContainer = styled.div`
  width: 62%;
  height: 100%;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 700px) {
    width: 80%;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
  @media (max-width: 500px) {
    width: 99%;
  }
`;

const SuggestionContainer = styled.div`
  max-width: 34%;
  height: 600px;
  margin-top: 20px;
  position: relative;

  @media (max-width: 786px) {
    display: none;
  }
`;
