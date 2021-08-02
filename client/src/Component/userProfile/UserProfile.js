import React, { useEffect, useState } from "react";
import {
  ProfileContainer,
  UserAvatar,
  UserDetails,
  UserDetailsTop,
  DownButton,
  UserDetailsFollowers,
  UserContact,
  AvatarImage,
} from "../userProfile/userProfilestyle";
import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfileAction } from "../../Redux/Action/user.action";
import { getCookie } from "../../helper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Loading from "../Loading/Loading";
import FollowBtn from "../FollowBtn/FollowBtn";
import Followers from "../Followers/Followers";
import Following from "../Following/Following";
import UserPost from "./UserPost";

const UserProfile = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();

  const token = getCookie("token");

  const [profileDetails, setProfileDetails] = useState({});
  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);

  const { _id } = JSON.parse(localStorage.getItem("user"));

  const { followUserLoading, followMessage, followError } = useSelector(
    (state) => state.followUser
  );

  const { unfollowUserLoading, unfollowMessage, unfollowError } = useSelector(
    (state) => state.unFollowUser
  );

  useEffect(() => {
    dispatch(getUserProfileAction(id, token));
  }, [dispatch, id, followMessage, unfollowMessage]);

  const { userProfileDetails, profileLoading } = useSelector(
    (state) => state.getUserProfile
  );

  useEffect(() => {
    if (userProfileDetails) {
      setProfileDetails(userProfileDetails);
    }
  }, [userProfileDetails]);

  return (
    <>
      {profileLoading ? (
        <Loading />
      ) : (
        <ProfileContainer>
          <UserAvatar>
            <AvatarImage>
              <img src={profileDetails.avatar} alt="Profile Picture" />
            </AvatarImage>
          </UserAvatar>
          <UserDetails>
            <UserDetailsTop>
              <h2>{profileDetails.username}</h2>

              {_id === profileDetails._id ? (
                <Link to={`/edit-profile/${profileDetails._id}`}>
                  <button
                    style={{
                      backgroundColor: "#3897F0",
                      color: "#FFFFFF",
                      border: "none",
                    }}
                  >
                    Edit Profile
                  </button>
                </Link>
              ) : (
                <FollowBtn profileDetails={profileDetails} />
              )}

              <DownButton style={{ width: "40px" }}>
                <KeyboardArrowDownIcon />
              </DownButton>
              <MoreHorizIcon style={{ marginLeft: "20px" }} />
            </UserDetailsTop>
            <UserDetailsFollowers>
              <h5>0 &nbsp;Posts</h5>
              <h5
                onClick={() => {
                  setFollowersOpen(true);
                }}
              >
                {profileDetails.followers && profileDetails.followers.length}
                &nbsp;Followers
              </h5>
              <h5
                onClick={() => {
                  setFollowingOpen(true);
                }}
              >
                {profileDetails.following && profileDetails.following.length}
                &nbsp;Following
              </h5>
            </UserDetailsFollowers>
            <h3>{profileDetails.fullname}</h3>
            <a href={profileDetails.website}>{profileDetails.website}</a>
            <UserContact>
              <p>{profileDetails.mobile}</p>
              <p>{profileDetails.address}</p>
            </UserContact>
            <p>{profileDetails.story}</p>
          </UserDetails>
        </ProfileContainer>
      )}
      {followersOpen && (
        <Followers
          userId={profileDetails._id}
          setFollowersOpen={setFollowersOpen}
        />
      )}
      {followingOpen && (
        <Following
          userId={profileDetails._id}
          setFollowingOpen={setFollowingOpen}
        />
      )}

      <UserPost id={id} token={token} />
    </>
  );
};

export default UserProfile;
