import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import { useSelector, useDispatch } from "react-redux";
import { getPostAction } from "../../Redux/Action/post.action";
import { getCookie } from "../../helper";
import Pusher from "pusher-js";
import SinglePost from "./SinglePost";

const Posts = ({ userData }) => {
  const dispatch = useDispatch();
  const token = getCookie("token");

  const [homePostData, setHomePostData] = useState([]);

  useEffect(() => {
    dispatch(getPostAction(token));
  }, [dispatch]);

  // useEffect(() => {
  //   const pusher = new Pusher("8228a9b223a03209c206", {
  //     cluster: "ap2",
  //   });

  //   const channel = pusher.subscribe("posts");
  //   channel.bind("inserted", function (data) {
  //     dispatch(getPostAction(token));
  //   });
  // }, []);

  const { homePost } = useSelector((state) => state.getPost);

  useEffect(() => {
    if (homePost) {
      setHomePostData(homePost);
    }
  }, [homePost]);

  const { deleteMessage, deletedPost } = useSelector(
    (state) => state.deletePost
  );

  useEffect(() => {
    if (deletedPost) {
      const newPosts = homePostData.filter(
        (post) => post._id !== deletedPost._id
      );
      setHomePostData(newPosts);
    }
  }, [deletedPost]);

  const { newPost } = useSelector((state) => state.createPost);

  useEffect(() => {
    if (newPost) {
      setHomePostData([newPost, ...homePostData]);
    }
  }, [newPost]);

  const { newComment } = useSelector((state) => state.createComment);

  useEffect(() => {
    if (newComment) {
      homePostData.find((homePost) => {
        if (homePost._id === newComment._id) {
          homePost.comments = [...homePost.comments];
        }
      });
    }
  }, [newComment]);

  return (
    <>
      {homePostData &&
        homePostData.map((post, index) => (
          <PostContainer key={index}>
            <PostHeader post={post} />
            <PostBody post={post} />
            <PostFooter post={post} userData={userData} />
          </PostContainer>
        ))}
    </>
  );
};

export default Posts;

const PostContainer = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid #eee;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Para = styled.p`
  text-align: center;
  margin-top: 50px;
`;
