import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import LikeButton from "./LikeButton";
import { useSelector, useDispatch } from "react-redux";
import {
  likeCommentAction,
  unlikeCommentAction,
} from "../../Redux/Action/comment.action";
import { getCookie } from "../../helper";
import moment from "moment";

const CommentsSingleBox = ({ comment }) => {
  const userId = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const token = getCookie("token");
  const messagesEndRef = useRef(null);

  const [commentIsLike, setCommentIsLike] = useState(false);

  let likeInitialCount = comment.likes && comment.likes.length;
  const [commentLikeCount, setCommentLikeCount] = useState(likeInitialCount);

  useEffect(() => {
    if (comment.likes.find((like) => like._id == userId._id)) {
      setCommentIsLike(true);
    } else {
      setCommentIsLike(false);
    }
  }, [comment.likes, userId._id]);

  const likeCommentHandler = () => {
    setCommentIsLike(true);
    dispatch(likeCommentAction(comment._id, token));
    setCommentLikeCount(commentLikeCount + 1);
  };

  const unlikeCommentHandler = () => {
    setCommentIsLike(false);
    dispatch(unlikeCommentAction(comment._id, token));
    setCommentLikeCount(commentLikeCount - 1);
  };

  const { createCommentmessage, newComment } = useSelector(
    (state) => state.createComment
  );

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      scrollToBottom();
    }
  }, [createCommentmessage, newComment]);

  return (
    <Commentscomment>
      <TopBox>
        <ProfileContainerBox>
          <Avatar>
            <img src={comment.user[0].avatar} alt="Profile" />
          </Avatar>
        </ProfileContainerBox>
        <CommentsContainerBox>
          <p>
            <span>{comment.user[0].username}</span>
            {comment.content}
          </p>
        </CommentsContainerBox>
        <LikeConatinerBox>
          <LikeButton
            isLike={commentIsLike}
            likeChangeHandler={likeCommentHandler}
            unlikeChangeHandler={unlikeCommentHandler}
          />
        </LikeConatinerBox>
      </TopBox>
      <BottomBox>
        <p>{moment(comment.createdAt).fromNow()}</p>
        <p>{commentLikeCount} likes</p>
        <p>Reply</p>
      </BottomBox>
      <div ref={messagesEndRef} />
    </Commentscomment>
  );
};

export default CommentsSingleBox;

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

const Commentscomment = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;

  span {
    font-size: 14px;
    font-weight: 500;
    color: #191919;
    margin-right: 10px;
  }

  p {
    font-size: 15px;
    margin-left: 10px;
    color: #5c5c5c;
    margin-top: 3px;
  }
`;

const ProfileContainerBox = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const CommentsContainerBox = styled.div`
  width: 70%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-right: 5px;
`;

const LikeConatinerBox = styled.div`
  width: 10%;
  height: auto;
  display: flex;
  align-items: center;

  .MuiSvgIcon-root {
    font-size: 14px;
    cursor: pointer;
  }
`;

const TopBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const BottomBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 5px;
  padding-left: 35%;

  p {
    font-size: 12px;
    font-weight: 400;
    color: #aaa;
  }
`;
