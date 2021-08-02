import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatBubbleOutlineSharpIcon from "@material-ui/icons/ChatBubbleOutlineSharp";
import SendSharpIcon from "@material-ui/icons/SendSharp";
import BookmarkBorderSharpIcon from "@material-ui/icons/BookmarkBorderSharp";
import BookmarkSharpIcon from "@material-ui/icons/BookmarkSharp";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import moment from "moment";
import LikeButton from "./LikeButton";
import Comment from "./Comment";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "../../helper";
import EmojiPicker from "emoji-picker-react";
import {
  likePostAction,
  unlikePostAction,
} from "../../Redux/Action/post.action";
import FirstComment from "./FirstComment";
import SinglePost from "./SinglePost";
import Sharemodel from "./Sharemodel";

const PostFooter = ({ post, userData }) => {
  const userId = JSON.parse(localStorage.getItem("user"));

  const [isLike, setIsLike] = useState(false);
  const [emojiopen, setemojiopen] = useState(false);
  const [commentData, setCommentData] = useState("");
  const [singlePostId, setSinglePostId] = useState("");
  const [singlePostOpen, setSinglePostOpen] = useState(false);
  const [shareModelOpen, setShareModelOpen] = useState(false);
  const [myComment, setMyComment] = useState("");

  let likeInitialCount = post.likes.length;

  const [likeCount, setlikeCount] = useState(likeInitialCount);

  useEffect(() => {
    if (post.likes.find((like) => like._id == userId._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, userId._id]);

  const dispatch = useDispatch();
  const token = getCookie("token");

  const likeChangeHandler = () => {
    setIsLike(true);
    setlikeCount(likeCount + 1);
    dispatch(likePostAction(post._id, token));
  };

  const unlikeChangeHandler = () => {
    setIsLike(false);
    setlikeCount(likeCount - 1);
    dispatch(unlikePostAction(post._id, token));
  };

  const handleEmojiClick = (e, emojiObject) => {
    setCommentData(commentData + emojiObject.emoji);
  };

  const { newComment } = useSelector((state) => state.createComment);

  return (
    <>
      <PostFooterContainer>
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
              style={{ transform: "rotate(-30deg)", marginTop: "-10px" }}
              onClick={() => {
                setShareModelOpen(!shareModelOpen);
              }}
            />
          </Reactiontab>
          <Savetab>
            <BookmarkBorderSharpIcon />
          </Savetab>
        </IconContainer>
        {shareModelOpen && <Sharemodel url={"https://google.com"} />}
        <p>
          Liked by <span>{likeCount} people</span>
        </p>
        <p>
          <span>{post.user[0].username}</span> &nbsp;&nbsp;
          {post.content}
        </p>

        <FirstComment post={post} />
        {newComment && myComment != "" && (
          <Mycomment>
            <Picture>
              <img src={userData.avatar} alt="Profile Image" />
            </Picture>
            <h5>{userData.username}</h5>
            <p>{myComment}</p>
          </Mycomment>
        )}
        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSinglePostOpen(true);
            setSinglePostId(post._id);
          }}
        >
          View all {post.comments.length} comments
        </p>
        <p>{moment(post.createdAt).fromNow()}</p>
        <Comment
          postId={post._id}
          setemojiopen={setemojiopen}
          emojiopen={emojiopen}
          commentData={commentData}
          setCommentData={setCommentData}
          setMyComment={setMyComment}
        />
      </PostFooterContainer>
      {singlePostOpen && (
        <SinglePost
          setSinglePostOpen={setSinglePostOpen}
          singlePostId={singlePostId}
          likeCount={likeCount}
          setlikeCount={setlikeCount}
          isLike={isLike}
          setIsLike={setIsLike}
        />
      )}
    </>
  );
};

export default PostFooter;

const PostFooterContainer = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid #efefef;
  background-color: #fff;
  position: relative;

  span {
    font-size: 15px;
    font-weight: 500;
    color: #191919;
  }

  p {
    max-width: 500px;
    font-size: 15px;
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

const EmojiContainer = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 52px;
  left: 0;
  z-index: 5;
  margin-left: -3px;
  box-shadow: none;
`;

const Mycomment = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  margin-top: 5px;

  h5 {
    margin-left: 5px;
  }
`;

const Picture = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-left: 10px;
  padding-left: 5px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;
