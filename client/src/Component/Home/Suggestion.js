import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getSuggestedUserAction } from "../../Redux/Action/user.action";
import { getCookie } from "../../helper";
import { useEffect } from "react";
import FollowBtn from "../FollowBtn/FollowBtn";
import { Link } from "react-router-dom";

const Suggestion = ({ userData }) => {
  const token = getCookie("token");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSuggestedUserAction(token));
  }, [dispatch]);

  const { suggestedUsers } = useSelector((state) => state.suggestedUser);

  return (
    <>
      <ProfileContainer>
        <ProfileImage>
          <img src={userData.avatar} alt="Profile Image" />
        </ProfileImage>
        <UserDetails>
          <h5>{userData.username}</h5>
          <p>{userData.fullname}</p>
        </UserDetails>
        <button>Switch</button>
      </ProfileContainer>
      <SuggestionContainer>
        <Title>
          <p>Suggestions For You</p>
          <p>see all</p>
        </Title>

        {suggestedUsers &&
          suggestedUsers.map((suggest) => (
            <SuggestionBox key={suggest._id}>
              <Profile>
                <Avatar>
                  <Link to={`/profile/${suggest._id}`}>
                    <img src={suggest.avatar} alt="Profile Image" />
                  </Link>
                </Avatar>
                <UserDetails>
                  <Link to={`/profile/${suggest._id}`}>
                    <h5>{suggest.username}</h5>
                  </Link>
                  <p>{suggest.fullname}</p>
                </UserDetails>
              </Profile>
              <FollowBtn profileDetails={suggest} />
            </SuggestionBox>
          ))}
      </SuggestionContainer>
    </>
  );
};

export default Suggestion;

const ProfileContainer = styled.div`
  width: 99%;
  height: auto;
  display: flex;
  margin-top: 30px;

  button {
    background-color: transparent;
    border: none;
    outline: none;
    margin-left: 30px;
    font-size: 14px;
    color: #3897f0;
  }
`;

const ProfileImage = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-left: 10px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;

  h5 {
    font-size: 15px;
  }

  p {
    font-size: 13px;
  }
  a {
    text-decoration: none;
    color: black;
  }
`;

const SuggestionContainer = styled.div`
  width: 99%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;

  p {
    color: #999;
  }
`;

const SuggestionBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Profile = styled.div`
  display: flex;
`;

const Avatar = styled.div`
width: 45px;
height: 45px;
border-radius: 50%;
margin-left: 10px;

img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;
