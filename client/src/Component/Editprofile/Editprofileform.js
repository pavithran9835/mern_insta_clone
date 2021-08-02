import React, { useEffect, useState } from "react";
import {
  Editform,
  LeftOptions,
  RightContent,
  FormGroup,
  Genderinput,
  Imgconatiner,
  Fileinput,
  FormGroupTextarea,
  LabelPic,
} from "./EditProfilestyle";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfileAction } from "../../Redux/Action/user.action";
import { getCookie } from "../../helper";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { updateUserProfileAction } from "../../Redux/Action/user.action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Editprofileform = ({ match }) => {
  const dispatch = useDispatch();
  const token = getCookie("token");

  const [fileName, setFileName] = useState("Choose Profile Picture");

  const [editProfileDetails, seteditProfileDetails] = useState({});
  const [imagePreview, setImagePreview] = useState("");

  const optionList = [
    "Edit Profile",
    "Change Pasword",
    "Apps and Websites",
    "Email ans SMS",
    "Push Notification",
    "Manage Contacts",
    "Privacy and Security",
    "Login Activity",
    "Email From Instagram",
  ];

  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserProfileAction(id, token));
  }, [getUserProfileAction]);

  const { userProfileDetails, profileLoading } = useSelector(
    (state) => state.getUserProfile
  );

  useEffect(() => {
    if (userProfileDetails) {
      seteditProfileDetails(userProfileDetails);
    }
  }, [userProfileDetails]);

  const editInputHandler = (e) => {
    const { name, value } = e.target;

    seteditProfileDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const genderInputHandler = (e) => {
    const { name, value } = e.target;

    seteditProfileDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const fileChangeHandler = (e) => {
    setFileName(e.target.files[0].name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);

    let files = e.target.files;

    let allFileUpload = editProfileDetails.avatar;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          500,
          500,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(`http://localhost:5000/cloudinary/upload`, {
                image: uri,
              })
              .then(
                (res) => {
                  console.log("Image Upload Data", res);
                  allFileUpload = res.data.url;
                  seteditProfileDetails({
                    ...editProfileDetails,
                    avatar: allFileUpload,
                  });
                },
                (err) => {
                  console.log(err);
                }
              );
          },
          "base64"
        );
      }
    }
  };

  const editFormSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUserProfileAction(id, token, editProfileDetails));
  };

  const { updateLoading, updateMessage } = useSelector(
    (state) => state.updateUserProfile
  );

  useEffect(() => {
    toast.dark(updateMessage);
  }, [updateMessage]);

  return (
    <>
      <ToastContainer autoClose={1000} hideProgressBar />
      {profileLoading || updateLoading ? (
        <Loading />
      ) : (
        <Editform>
          <LeftOptions>
            {optionList.map((options, index) => (
              <h5 key={index}>{options}</h5>
            ))}
            <h4>Switch to personal account</h4>
          </LeftOptions>
          <RightContent>
            <form action="">
              <Imgconatiner>
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" />
                ) : (
                  <img src={editProfileDetails.avatar} alt="Profile" />
                )}
              </Imgconatiner>
              <LabelPic htmlFor="chooseImage">{fileName}</LabelPic>
              <Fileinput
                type="file"
                id="chooseImage"
                name="avatar"
                onChange={fileChangeHandler}
              />

              <FormGroup>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  name="fullname"
                  id="fullname"
                  onChange={editInputHandler}
                  value={editProfileDetails.fullname}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="name">User Name</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="User Name"
                  value={editProfileDetails.username}
                  onChange={editInputHandler}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="name">Website</label>
                <input
                  type="text"
                  name="website"
                  id="website"
                  placeholder="Website"
                  value={editProfileDetails.website}
                  onChange={editInputHandler}
                />
              </FormGroup>
              <FormGroupTextarea>
                <label htmlFor="name">Story</label>
                <textarea
                  name="story"
                  id="story"
                  cols="30"
                  rows="3"
                  value={editProfileDetails.story}
                  onChange={editInputHandler}
                ></textarea>
              </FormGroupTextarea>
              <FormGroup>
                <label htmlFor="name">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={editProfileDetails.email}
                  onChange={editInputHandler}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="name">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  placeholder="Mobile"
                  value={editProfileDetails.mobile}
                  onChange={editInputHandler}
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="name">Gender</label>
                <Genderinput>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    onChange={genderInputHandler}
                  />
                  <label htmlFor="male">Male</label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    onChange={genderInputHandler}
                  />
                  <label htmlFor="female">Female</label>
                  <input
                    type="radio"
                    id="other"
                    name="gender"
                    value="other"
                    onChange={genderInputHandler}
                  />
                  <label htmlFor="other">Other</label>
                </Genderinput>
              </FormGroup>
              <button type="submit" onClick={editFormSubmitHandler}>
                submit
              </button>
            </form>
          </RightContent>
        </Editform>
      )}
    </>
  );
};

export default Editprofileform;
