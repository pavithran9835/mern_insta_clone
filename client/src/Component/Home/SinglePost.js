import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { singlePostAction } from "../../Redux/Action/post.action";
import { getCookie } from "../../helper";
import CloseIcon from "@material-ui/icons/Close";
import { indigo } from "@material-ui/core/colors";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Comment from "./Comment";
import SinglePostComment from "./SinglePostComment";
import EmojiPicker from "emoji-picker-react";
import Loading from "../Loading/Loading";
import LikeButton from "./LikeButton";
import {
  likePostAction,
  unlikePostAction,
} from "../../Redux/Action/post.action";
import ChatBubbleOutlineSharpIcon from "@material-ui/icons/ChatBubbleOutlineSharp";
import SendSharpIcon from "@material-ui/icons/SendSharp";
import BookmarkBorderSharpIcon from "@material-ui/icons/BookmarkBorderSharp";
import BookmarkSharpIcon from "@material-ui/icons/BookmarkSharp";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import { likeCommentAction } from "../../Redux/Action/comment.action";
import CommentsSingleBox from "./CommentsSingleBox";
SwiperCore.use([Navigation]);
SwiperCore.use([Pagination]);

const SinglePost = ({
  match,
  setSinglePostOpen,
  singlePostId,
  likeCount,
  setlikeCount,
  isLike,
  setIsLike,
}) => {
  const dispatch = useDispatch();
  const token = getCookie("token");
  const userId = JSON.parse(localStorage.getItem("user"));
  const [postData, setPostData] = useState({});
  const [emojiopen, setemojiopen] = useState(false);
  const [commentData, setCommentData] = useState("");
  const [commentId, setCommentId] = useState("");

  useEffect(() => {
    dispatch(singlePostAction(singlePostId, token));
  }, [dispatch]);

  const { singlePost, singlePostLoading } = useSelector(
    (state) => state.singlePost
  );

  useEffect(() => {
    if (singlePost) {
      setPostData(singlePost);
    }
  }, [singlePost]);

  const handleEmojiClick = (e, emojiObject) => {
    setCommentData(commentData + emojiObject.emoji);
  };

  const likeChangeHandler = () => {
    setIsLike(true);
    setlikeCount(likeCount + 1);
    dispatch(likeCommentAction(singlePost._id, token));
  };

  const unlikeChangeHandler = () => {
    setIsLike(false);
    setlikeCount(likeCount - 1);
    dispatch(unlikePostAction(singlePost._id, token));
  };

  const slides = [];

  singlePost &&
    singlePost.images.map((image, index) => {
      slides.push(
        <SwiperSlide style={{ width: "100%", height: "100%" }}>
          <img
            src={image.url}
            alt="index slide"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </SwiperSlide>
      );
    });

  return (
    <>
      {singlePostLoading ? (
        <Loading />
      ) : (
        <SinglepostContainer>
          <CloseIcon
            style={{
              fontSize: "30px",
              color: "#fff",
              position: "absolute",
              top: "0",
              right: "0",
              margin: "20px",
              cursor: "pointer",
            }}
            onClick={() => {
              setSinglePostOpen(false);
            }}
          />
          {singlePost && (
            <SinglePostBox>
              <ImageContainer>
                <Swipercontainer
                  navigation={true}
                  pagination={true}
                  className="mySwiper"
                >
                  {slides}
                </Swipercontainer>
              </ImageContainer>
              <PostDetailsContainer>
                <ProfileContainer>
                  <ProfileDetails>
                    <Avatar>
                      <img src={singlePost.user[0].avatar} alt="Profile" />
                    </Avatar>
                    <h5>{singlePost.user[0].username}</h5>
                  </ProfileDetails>
                  <MoreButton>
                    <MoreHorizIcon />
                  </MoreButton>
                </ProfileContainer>
                <CommentsContainer>
                  {singlePost.comments.map((comment, index) => (
                    <CommentsSingleBox comment={comment} key={index} />
                  ))}
                </CommentsContainer>
                <OptionsContainer>
                  {emojiopen && (
                    <EmojiContainer>
                      <EmojiPicker
                        disableSearchBar
                        disableSkinTonePicker
                        onEmojiClick={handleEmojiClick}
                      />
                    </EmojiContainer>
                  )}
                  <IconContainer>
                    <Reactiontab>
                      <LikeButton
                        isLike={isLike}
                        likeChangeHandler={likeChangeHandler}
                        unlikeChangeHandler={unlikeChangeHandler}
                      />
                      <ChatBubbleOutlineSharpIcon />
                      <SendSharpIcon
                        style={{
                          transform: "rotate(-30deg)",
                          marginTop: "-10px",
                        }}
                      />
                    </Reactiontab>
                    <Savetab>
                      <BookmarkBorderSharpIcon />
                    </Savetab>
                  </IconContainer>
                  <p>
                    Liked by <span>{likeCount} people</span>
                  </p>
                  <p>{moment(singlePost.createdAt).fromNow()}</p>
                </OptionsContainer>
                <SinglePostComment
                  postId={singlePost._id}
                  emojiopen={emojiopen}
                  setemojiopen={setemojiopen}
                  commentData={commentData}
                  setCommentData={setCommentData}
                />
              </PostDetailsContainer>
            </SinglePostBox>
          )}
        </SinglepostContainer>
      )}
    </>
  );
};

export default SinglePost;

const SinglepostContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #00000030;
  overflow: hidden;
  z-index: 6;
`;

const SinglePostBox = styled.div`
  width: 59%;
  height: 83%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1300px) {
    width: 60%;
  }

  @media (max-width: 1200px) {
    width: 65%;
  }

  @media (max-width: 1100px) {
    width: 70%;
  }

  @media (max-width: 1000px) {
    width: 75%;
  }

  @media (max-width: 900px) {
    width: 80%;
  }

  @media (max-width: 800px) {
    width: 85%;
  }

  @media (max-width: 700px) {
    width: 90%;
  }

  @media (max-width: 600px) {
    width: 95%;
  }

  @media (max-width: 500px) {
    width: 95%;
  }
`;

const EmojiContainer = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 5;
  margin-left: -3px;
  box-shadow: none;
`;

const ImageContainer = styled.div`
  width: 61%;
  height: 100%;
`;

const Swipercontainer = styled(Swiper)`
  width: 100%;
  height: 100%;

  .swiper-button-next,
  .swiper-button-prev {
    width: 10px;
    height: 10px;
    background-color: white;
    background-color: rgba(255, 255, 255, 0.5);
    right: 10px;
    padding: 5px;
    size: 20px !important;
    color: #000 !important;
    fill: black !important;
    stroke: black !important;
    font-size: 20px;
    border-radius: 50%;
  }

  .swiper-button-next::after {
    font-weight: 900;
    font-size: 10px;
  }

  .swiper-button-prev::after {
    font-weight: 900;
    font-size: 10px;
  }
`;

const Swiperslidecontainer = styled(SwiperSlide)`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PostDetailsContainer = styled.div`
  width: 39%;
  height: 100%;
`;

const ProfileContainer = styled.div`
  width: 100%;
  height: 12%;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;

  h5 {
    margin-left: 10px;
  }

  .MuiSvgIcon-root {
    font-size: 20px;
    position: relative;
    margin-right: 10px;
    cursor: pointer;
  }
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 10px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const ProfileDetails = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const MoreButton = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const CommentsContainer = styled.div`
  width: 100%;
  height: 60%;
  border-bottom: 1px solid #eee;
  overflow-x: hidden;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const OptionsContainer = styled.div`
  width: 100%;
  height: 19%;
  border-bottom: 1px solid #eee;
  position: relative;

  p {
    max-width: 500px;
    font-size: 14px;
    margin-left: 15px;
    color: #5c5c5c;
    margin-top: 3px;
  }
`;

const IconContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Reactiontab = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .MuiSvgIcon-root {
    font-size: 26px;
    font-weight: normal;
    margin-left: 15px;
    cursor: pointer;
  }
`;
const Savetab = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .MuiSvgIcon-root {
    font-size: 26px;
    margin-right: 10px;
    cursor: pointer;
  }
`;

const CommentBox = styled.div``;
