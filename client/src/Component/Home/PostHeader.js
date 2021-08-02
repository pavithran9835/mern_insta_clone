import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Link } from "react-router-dom";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import DeleteOutlineSharpIcon from "@material-ui/icons/DeleteOutlineSharp";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { getCookie } from "../../helper";
import { useSelector, useDispatch } from "react-redux";
import { deletePostAction } from "../../Redux/Action/post.action";

const PostHeader = ({ post }) => {
  const dispatch = useDispatch();
  const token = getCookie("token");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const deletePostHandler = (postId, token) => {
    dispatch(deletePostAction(postId, token));
    setDropdownOpen(false);
  };

  return (
    <>
      <PostHeaderContainer>
        <UserDetails>
          <Avatar>
            <Link to={`/profile/${post.user[0]._id}`}>
              <img src={post.user[0].avatar} alt="ProfilePic" />
            </Link>
          </Avatar>
          <Link to={`/profile/${post.user[0]._id}`}>
            <h5>{post.user[0].username}</h5>
          </Link>
        </UserDetails>
        <Options>
          <MoreHorizIcon
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
            }}
          />
        </Options>
        {dropdownOpen && (
          <MoreDropdown>
            {user._id != post.user[0]._id ? (
              <>
                <Link to="">
                  <FileCopyOutlinedIcon />
                  copy link
                </Link>
              </>
            ) : (
              <>
                <Link to="">
                  <EditSharpIcon />
                  Edit Post
                </Link>
                <Link
                  to=""
                  onClick={() => {
                    deletePostHandler(post._id, token);
                  }}
                >
                  <DeleteOutlineSharpIcon />
                  Delete Post
                </Link>
                <Link
                  to=""
                  onClick={() => {
                    setDropdownOpen(false);
                  }}
                >
                  <CloseSharpIcon />
                  cancel
                </Link>
              </>
            )}
          </MoreDropdown>
        )}
      </PostHeaderContainer>
    </>
  );
};

export default PostHeader;

const PostHeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const UserDetails = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  a {
    text-decoration: none;
    color: black;
  }

  h5 {
    font-size: 15px;
    font-weight: 500;
    margin-left: 20px;
  }
`;
const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 15px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const Options = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .MuiSvgIcon-root {
    font-size: 20px;
    margin-right: 10px;
    cursor: pointer;
  }
`;

const MoreDropdown = styled.div`
  width: 135px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: space-around;
  border-radius: 3px;
  border: 1px solid #eee;
  background-color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 50px;
  z-index: 1;

  a {
    text-decoration: none;
    color: black;
    font-size: 16px;
    padding-left: 10px;
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;

    &:hover {
      background-color: #eee;
    }
  }

  .MuiSvgIcon-root {
    margin-right: 10px;
  }
`;
