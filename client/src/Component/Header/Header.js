import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  HeaderContainer,
  HeaderRow,
  HeaderLogo,
  HeaderSearch,
  HeaderOptions,
  Dropdown,
} from "./Headerstyle";
import { logout } from "../../helper";
import { Link, useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import InboxOutlinedIcon from "@material-ui/icons/InboxOutlined";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Search from "./Search";

const Header = () => {
  const history = useHistory();

  const [showDropDown, setShowDropDown] = useState(false);

  const dropdownHandler = () => {
    setShowDropDown(!showDropDown);
  };

  // const user = localStorage.getItem("user");
  const { _id } = JSON.parse(localStorage.getItem("user"));
  console.log(_id);

  const navliks = [
    { icon: <HomeIcon />, path: "/" },
    { icon: <InboxOutlinedIcon />, path: "/message" },
    { icon: <ExploreOutlinedIcon />, path: "/explore" },
    { icon: <FavoriteBorderOutlinedIcon />, path: "/" },
  ];

  const dropDownLinks = [
    {
      icon: <AccountCircleOutlinedIcon />,
      path: `/profile/${_id}`,
      title: "Profile",
    },
    { icon: <BookmarkIcon />, path: "/", title: "Saved" },
    { icon: <SettingsIcon />, path: "/", title: "Settings" },
  ];

  let dropDown = useRef();

  useEffect(() => {
    let handler = (event) => {
      if (dropDown.current && !dropDown.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      <HeaderContainer>
        <HeaderRow>
          <HeaderLogo>
            <img
              src="/images/home-logo.png"
              alt="Logo"
              onClick={() => {
                history.push("/");
              }}
            />
          </HeaderLogo>
          <HeaderSearch>
            <Search />
          </HeaderSearch>
          <HeaderOptions>
            {navliks.map((links, index) => (
              <Link to={links.path} key={index}>
                {links.icon}
              </Link>
            ))}
            <Link to="#" onClick={dropdownHandler}>
              <img
                src="https://image.flaticon.com/icons/png/512/147/147144.png"
                alt="avatar"
              />
            </Link>
            {showDropDown && (
              <Dropdown ref={dropDown}>
                {dropDownLinks.map((dropLinks) => (
                  <Link
                    to={dropLinks.path}
                    style={{
                      color: "#1d1d1d",
                      marginRight: "10px",
                    }}
                    key={dropLinks.title}
                  >
                    {dropLinks.icon}&nbsp;&nbsp;&nbsp;
                    {dropLinks.title}
                  </Link>
                ))}
                <Link
                  to=""
                  onClick={() => {
                    logout(() => {
                      history.push("/login");
                    });
                  }}
                >
                  <ExitToAppIcon
                    style={{
                      color: "#1d1d1d",
                      marginRight: "10px",
                    }}
                  />
                  Logout
                </Link>
              </Dropdown>
            )}
          </HeaderOptions>
        </HeaderRow>
      </HeaderContainer>
    </>
  );
};

export default Header;
