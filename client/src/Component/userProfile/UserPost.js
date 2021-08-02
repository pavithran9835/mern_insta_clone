import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { userPostAction } from "../../Redux/Action/post.action";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

const UserPost = ({ id, token }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userPostAction(id, token));
  }, [dispatch]);

  const { userPosts } = useSelector((state) => state.userPost);

  return (
    <UserPostContainer>
      {userPosts &&
        userPosts.map((posts) => (
          <>
            <PostBox
              style={{
                backgroundImage: `url(${posts.images[0].url})`,
                backgroundSize: "cover",
              }}
            >
              <PostDetails>
                <Options>
                  <p>{posts.likes.length}</p>
                  <FavoriteIcon />
                </Options>

                <Options>
                  <p>{posts.comments.length}</p>
                  <ChatBubbleIcon />
                </Options>
              </PostDetails>
            </PostBox>
          </>
        ))}
    </UserPostContainer>
  );
};

export default UserPost;

const UserPostContainer = styled.div`
  width: 65%;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 20px;
  margin-top: 20px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const PostBox = styled.div`
  width: 290px;
  height: 310px;
  margin-top: 20px;
`;

const PostDetails = styled.div`
  width: 100%;
  height: 100%;
  background-color: #00000070;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  opacity: 0;
  cursor: pointer;

  p {
    color: #aaa;
    margin-right: 5px;
  }

  .MuiSvgIcon-root {
    color: #aaa;
  }

  &:hover {
    opacity: 1;
  }
`;

const Options = styled.div`
  display: flex;
`;
