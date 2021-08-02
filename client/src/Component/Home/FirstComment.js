import React from "react";
import styled from "styled-components";

const FirstComment = ({ post }) => {
  const firstCommentData = post;

  return (
    <>
      {firstCommentData.comments.length >= 2 &&
        firstCommentData.comments.slice(-2).map((first, index) => (
          <FirstcommentContainer key={index}>
            {first.user.map((userdet, index) => (
              <UserCommentTab key={index}>
                <Avatar>
                  <img src={userdet.avatar} alt="Avatar" />
                </Avatar>
                <span>{userdet.username}</span>
              </UserCommentTab>
            ))}
            <p>{first.content}</p>
          </FirstcommentContainer>
        ))}
    </>
  );
};

export default FirstComment;

const FirstcommentContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 8px;

  span {
    margin-left: 5px;
  }

  p {
    margin-left: 8px;
  }
`;

const Avatar = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 15px;
  display: flex;
  align-items: center;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const UserCommentTab = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
`;
