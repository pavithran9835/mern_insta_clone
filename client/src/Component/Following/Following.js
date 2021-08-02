import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector, useDispatch } from "react-redux";
import { getUserFollowerAction } from "../../Redux/Action/user.action";
import { getCookie } from "../../helper";
import Loading from "../Loading/Loading";
import FollowBtn from "../FollowBtn/FollowBtn";
import { Fade } from "react-reveal";

const Following = ({ userId, setFollowingOpen }) => {
  const dispatch = useDispatch();

  const token = getCookie("token");

  const [userFollowingDetails, setUserFollowingDetails] = useState([]);

  useEffect(() => {
    dispatch(getUserFollowerAction(userId, token));
  }, [dispatch]);

  const { getUserFollowersLoading, userFollowers } = useSelector(
    (state) => state.getUserFollowers
  );

  useEffect(() => {
    if (userFollowers) {
      setUserFollowingDetails(userFollowers);
    }
  }, [userFollowers]);

  return (
    <>
      <FollowersContainer>
        {getUserFollowersLoading ? (
          <Loading />
        ) : (
          <FollowersBox>
            <Boxtop>
              <h2>Following</h2>
              <CloseIcon
                style={{ margin: "20px", cursor: "pointer" }}
                onClick={() => {
                  setFollowingOpen(false);
                }}
              />
            </Boxtop>

            <BoxUsers>
              {userFollowingDetails.map((userData) =>
                userData.following.map((followingData) => (
                  <UserBox>
                    <ProfileBox>
                      <ImgBox>
                        <img src={followingData.avatar} alt="Profile" />
                      </ImgBox>
                      <NameDetails>
                        <p>{followingData.username}</p>
                        <h5>{followingData.fullname}</h5>
                      </NameDetails>
                    </ProfileBox>
                    <FolowButtonBox>
                      <FollowBtn profileDetails={followingData} />
                    </FolowButtonBox>
                  </UserBox>
                ))
              )}
            </BoxUsers>
          </FollowersBox>
        )}
      </FollowersContainer>
    </>
  );
};

export default Following;

const FollowersContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #00000078;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const FollowersBox = styled.div`
  width: 25%;
  height: 70%;
  background-color: white;
  border-radius: 10px;

  @media (max-width: 1300px) {
    width: 30%;
  }

  @media (max-width: 1200px) {
    width: 35%;
  }

  @media (max-width: 1100px) {
    width: 40%;
  }

  @media (max-width: 1000px) {
    width: 45%;
  }

  @media (max-width: 900px) {
    width: 55%;
  }

  @media (max-width: 800px) {
    width: 65%;
  }

  @media (max-width: 700px) {
    width: 70%;
  }

  @media (max-width: 500px) {
    width: 80%;
  }
`;

const Boxtop = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;

  h2 {
    margin: 20px;
  }
`;

const BoxUsers = styled.div`
  width: 100%;
  height: 80%;
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
  }

  &::-webkit-scrollbar-thumb {
    background: grey;
  }
`;

const UserBox = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileBox = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
`;
const FolowButtonBox = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImgBox = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin-left: 10px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const NameDetails = styled.div`
  margin-left: 10px;
`;
