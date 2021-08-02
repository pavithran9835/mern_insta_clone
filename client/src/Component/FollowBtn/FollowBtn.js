import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  followUserAction,
  unFollowUserAction,
} from "../../Redux/Action/user.action";
import { getCookie } from "../../helper";

const FollowBtn = ({ profileDetails }) => {
  const dispatch = useDispatch();
  const token = getCookie("token");

  const [followed, setFollowed] = useState(false);

  const { _id } = JSON.parse(localStorage.getItem("user"));

  const handleFollow = () => {
    setFollowed(true);
    dispatch(followUserAction(profileDetails._id, token));
  };

  const { followUserLoading, followMessage, followError } = useSelector(
    (state) => state.followUser
  );

  // useEffect(() => {
  //   toast.dark(followMessage);
  //   toast.dark(followError);
  // }, [followMessage, followError]);

  const followCheck = profileDetails.followers;

  const followbtnstatus = followCheck && followCheck.includes(_id);

  useEffect(() => {
    if (followbtnstatus) {
      setFollowed(followbtnstatus);
    }
  }, [followbtnstatus, profileDetails]);

  const handleUnfollow = () => {
    setFollowed(false);

    dispatch(unFollowUserAction(profileDetails._id, token));
  };

  const { unfollowUserLoading, unfollowMessage, unfollowError } = useSelector(
    (state) => state.unFollowUser
  );

  // useEffect(() => {
  //   toast.dark(unfollowMessage);
  //   toast.dark(unfollowError);
  // }, [unfollowMessage, unfollowError]);

  return (
    <>
      {followed ? (
        <FollowButton
          style={{ backgroundColor: "#3897F0", color: "#fff", border: "none" }}
          onClick={handleUnfollow}
        >
          UnFollow
        </FollowButton>
      ) : (
        <FollowButton
          style={{ backgroundColor: "#3897F0", color: "#fff", border: "none" }}
          onClick={handleFollow}
        >
          Follow
        </FollowButton>
      )}
    </>
  );
};

export default FollowBtn;

const FollowButton = styled.button`
  width: 100px;
  height: 35px;
  margin-left: 20px;
  background-color: transparent;
  border-radius: 4px;
  outline: none;
  border: 1px solid #000;
  cursor: pointer;
`;
