import React from "react";
import Header from "../../Component/Header/Header";
import UserProfile from "../../Component/userProfile/UserProfile";
import { ProfileContainer, ProfilePageConatiner } from "./Profilestyle";

const Profile = () => {
  return (
    <>
      <ProfilePageConatiner>
        <Header />
        <UserProfile />
      </ProfilePageConatiner>
    </>
  );
};

export default Profile;
