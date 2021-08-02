import React, { useRef, useState } from "react";
import Status from "./Status";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import PanoramaIcon from "@material-ui/icons/Panorama";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import { createPostAction } from "../../Redux/Action/post.action";
import { getCookie } from "../../helper";

const Statusmodel = ({ setOpenStatusModel, userData }) => {
  const dispatch = useDispatch();
  const token = getCookie("token");

  const userId = JSON.parse(localStorage.getItem("user"));

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [postImages, setPostImages] = useState([]);
  const [stream, setStream] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();
  const [tracks, setTracks] = useState("");
  const [buttonText, setbuttonText] = useState("Post");

  const imageChangeHandler = async (e) => {
    setLoading(true);
    const files = [...e.target.files];
    let error = "";
    let newImages = [];

    for (let i = 0; i < files.length; i++) {
      const base64 = await convertBase64(files[i]);

      axios
        .post(`http://localhost:5000/cloudinary/upload`, {
          image: base64,
        })
        .then(
          (res) => {
            console.log("Image Upload Data", res);
            newImages.push(res.data);
            setPostImages([...postImages, ...newImages]);
            setLoading(false);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const deleteImgHandler = (index, public_id) => {
    axios.post(`http://localhost:5000/cloudinary/remove`, { public_id }).then(
      (res) => {
        const newArray = [...postImages];
        newArray.splice(index, 1);
        setPostImages(newArray);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const cameraHandler = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((MediaStream) => {
          videoRef.current.srcObject = MediaStream;
          videoRef.current.play();
          const track = MediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  const captureHandler = async () => {
    const newCameraImages = [];
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    canvasRef.current.setAttribute("width", width);
    canvasRef.current.setAttribute("height", height);

    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    let URL = canvasRef.current.toDataURL();

    axios
      .post(`http://localhost:5000/cloudinary/upload`, {
        image: URL,
      })
      .then(
        (res) => {
          console.log("Image Upload Data", res);
          newCameraImages.push(res.data);
          setPostImages([...postImages, ...newCameraImages]);
          setLoading(false);
        },
        (err) => {
          console.log(err);
        }
      );
  };

  const stopStreamHandler = () => {
    tracks.stop();
    setStream(false);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setbuttonText("Posting...");

    dispatch(createPostAction(content, postImages, userId._id, token));

    setTimeout(() => {
      setOpenStatusModel(false);
    }, 2000);
  };

  return (
    <StatusContainer>
      <StatusBox>
        <StatusTop>
          <h2>Create Post</h2>
          <CloseIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOpenStatusModel(false);
            }}
          />
        </StatusTop>
        <StatusMiddle>
          <textarea
            name="content"
            id="content"
            cols="30"
            rows="10"
            placeholder={`${userData.fullname}, what are you thinking?`}
            spellCheck="false"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
        </StatusMiddle>
        {stream && (
          <StreamTab>
            <video autoPlay muted ref={videoRef} />
            <CloseIcon onClick={stopStreamHandler} />
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </StreamTab>
        )}
        <ShowImages>
          {loading ? (
            <Spinner></Spinner>
          ) : (
            <>
              {postImages.map((img, index) => (
                <ImageBox key={index}>
                  {/* {loading ? (
                <Spinner></Spinner>
              ) : ( */}
                  <>
                    <CloseIcon
                      onClick={() => {
                        deleteImgHandler(index, img.public_id);
                      }}
                    />
                    <img
                      src={img.camera ? img.camera : img.url}
                      alt="Post Images"
                      key={index}
                    />
                  </>
                  {/* )} */}
                </ImageBox>
              ))}
            </>
          )}
        </ShowImages>
        <StatusOptions>
          {stream ? (
            <CameraAltIcon onClick={captureHandler} />
          ) : (
            <>
              <CameraAltIcon onClick={cameraHandler} />
              <label htmlFor="file">
                <PanoramaIcon />
              </label>
              <input
                type="file"
                id="file"
                name="file"
                multiple
                accept="images/*"
                onChange={imageChangeHandler}
              />
            </>
          )}
        </StatusOptions>
        <StatusButton>
          <button type="submit" onClick={formSubmitHandler}>
            {buttonText}
          </button>
        </StatusButton>
      </StatusBox>
    </StatusContainer>
  );
};

export default Statusmodel;

const StatusContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #00000078;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const StatusBox = styled.div`
  width: 650px;
  min-height: 400px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
`;

const StatusTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatusMiddle = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;

  textarea {
    width: 90%;
    height: 90%;
    border: none;
    outline: none;
    font-family: "Heebo", sans-serif;
    font-size: 16px;

    ::-webkit-input-placeholder {
      color: #000;
      font-family: "Heebo", sans-serif;
      font-size: 16px;
    }

    :-ms-input-placeholder {
      color: #000;
      font-family: "Heebo", sans-serif;
    }

    ::placeholder {
      color: #000;
      font-family: "Heebo", sans-serif;
    }
  }
`;

const StreamTab = styled.div`
  width: 100%;
  height: 250px;
  position: relative;

  video {
    width: 100%;
    height: 100%;
  }

  .MuiSvgIcon-root {
    color: #222222;
    font-size: 15px;
    border: 2px solid #fff;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    right: 5px;
    box-shadow: 0px 0px 5px #00000080;
    cursor: pointer;
  }
`;

const ShowImages = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
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

const ImageBox = styled.div`
  width: 150px;
  height: 170px;
  margin-left: 30px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  position: relative;
  border: 1px solid #eee;

  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    object-fit: cover;
  }

  .MuiSvgIcon-root {
    color: #222222;
    font-size: 15px;
    border: 2px solid #fff;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    right: 5px;
    box-shadow: 0px 0px 5px #00000080;
    cursor: pointer;
  }
`;

const StatusOptions = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  label {
    display: flex;
    align-items: center;
  }

  input {
    display: none;
  }

  .MuiSvgIcon-root {
    font-size: 30px;
    margin: 8px;
    cursor: pointer;
  }
`;

const StatusButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  button {
    width: 50%;
    padding: 12px;
    border: none;
    border-radius: 5px;
    background-color: #3897f0;
    color: #fff;
    cursor: pointer;
  }
`;

const Spinner = styled.div`
  min-width: 40px;
  min-height: 40px;
  border: 5px solid rgba(255, 255, 255, 0.1);
  border-right: 5px solid #eee;
  border-radius: 50%;
  animation: spinner 1s linear infinite;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;
