import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchUserAction } from "../../Redux/Action/user.action";
import { getCookie } from "../../helper";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import CachedIcon from "@material-ui/icons/Cached";
import { useHistory } from "react-router-dom";

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [search, setSearch] = useState("");

  const [userSearchList, setUserSearchList] = useState([]);

  const token = getCookie("token");

  useEffect(() => {
    if (search.length > 0) {
      dispatch(searchUserAction(search, token));
    }
  }, [dispatch, search]);

  const { users } = useSelector((state) => state.searchUser);

  useEffect(() => {
    if (users) {
      setUserSearchList(users);
    }
  }, [users]);

  let searchList = useRef();

  useEffect(() => {
    let handler = (event) => {
      if (searchList.current && !searchList.current.contains(event.target)) {
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Search..."
        autoComplete="off"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      <CloseIcon
        style={{
          marginLeft: "-25px",
          fontSize: "13px",
          color: "grey",
          cursor: "pointer",
        }}
        onClick={() => {
          setSearch("");
        }}
      />

      {search && (
        <UserList ref={searchList}>
          {userSearchList.map((list) => (
            <Userdisplay
              key={list.username}
              onClick={() => {
                history.push(`/profile/${list._id}`);
              }}
            >
              <Avatar>
                <AvatarImg>
                  <img src={list.avatar} alt="avatar" />
                </AvatarImg>
              </Avatar>
              <Namedetails>
                <h5>{list.fullname}</h5>
                <p>{list.username}</p>
              </Namedetails>
            </Userdisplay>
          ))}
          {userSearchList.length > 0 ? "" : <Para>No User Found</Para>}
        </UserList>
      )}
    </>
  );
};

export default Search;

const UserList = styled.div`
  width: 280px;
  max-height: 300px;
  border: 1px solid #ccc;
  position: absolute;
  top: 56px;
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: scroll;
  box-shadow: 0px 0px 5px #ccc;
  background-color: #fff;

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

const Userdisplay = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  padding: 5px 0px;

  &:hover {
    background-color: #e6e6e6;
    cursor: pointer;
  }
`;

const Avatar = styled.div`
  width: 30%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AvatarImg = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2.5px dotted red;
  box-shadow: 0px 0px 5px #000;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const Namedetails = styled.div`
  width: 70%;
  height: 50px;
`;

const Para = styled.p`
  text-align: center;
  margin-top: 5px;
`;
