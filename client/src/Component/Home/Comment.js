import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import { useSelector, useDispatch } from "react-redux";
import { createCommentAction } from "../../Redux/Action/comment.action";
import { getCookie } from "../../helper";
import EmojiPicker from "emoji-picker-react";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";

const Comment = ({
  postId,
  emojiopen,
  setemojiopen,
  commentData,
  setCommentData,
  setMyComment,
}) => {
  const dispatch = useDispatch();
  const token = getCookie("token");

  // const [emojiopen, setemojiopen] = useState(false);
  const [buttonTxt, setbuttonTxt] = useState("Post");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setbuttonTxt("Posting...");
    dispatch(createCommentAction(commentData, postId, token));
    setTimeout(() => {
      setbuttonTxt("Post");
    }, 2000);

    setTimeout(() => {
      setMyComment(commentData);
      setCommentData("");
    }, 2000);
  };

  const handleOpenEmoji = () => {
    setemojiopen(false);
  };

  const handleCloseEmoji = () => {
    setemojiopen(true);
  };

  return (
    <CommentContainer>
      <Emoji>
        {emojiopen ? (
          <CloseSharpIcon onClick={handleOpenEmoji} />
        ) : (
          <SentimentSatisfiedOutlinedIcon onClick={handleCloseEmoji} />
        )}
      </Emoji>
      <CommentForm>
        <input
          type="text"
          placeholder="Add a comment..."
          name="comment"
          autoComplete="off"
          value={commentData}
          onChange={(e) => {
            setCommentData(e.target.value);
          }}
        />
      </CommentForm>
      <CommentButton>
        <button onClick={formSubmitHandler}>{buttonTxt}</button>
      </CommentButton>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Emoji = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .MuiSvgIcon-root {
    font-size: 25px;
    color: #797979;
    cursor: pointer;
    position: relative;
  }
`;
const CommentForm = styled.div`
  width: 65%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;

    ::-webkit-input-placeholder {
      color: #5c5c5c;
      font-family: "Heebo", sans-serif;
      font-size: 14px;
    }

    :-ms-input-placeholder {
      color: #5c5c5c;
      font-family: "Heebo", sans-serif;
    }

    ::placeholder {
      color: #5c5c5c;
      font-family: "Heebo", sans-serif;
    }
  }
`;
const CommentButton = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    border: none;
    outline: none;
    background-color: transparent;
    color: #00a2ff88;
    font-size: 15px;
    cursor: pointer;
  }
`;
