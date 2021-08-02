import React from "react";
import styled from "styled-components";

const Loading = () => {
  return <LoadingContainer></LoadingContainer>;
};

export default Loading;

const LoadingContainer = styled.div`
  width: 50px;
  height: 50px;
  margin: 110px auto 0;
  border: solid 7px #a4a4a4;
  border-radius: 50%;
  border-right-color: transparent;
  border-bottom-color: transparent;
  -webkit-transition: all 0.5s ease-in;
  -webkit-animation-name: rotate;
  -webkit-animation-duration: 1s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  transition: all 0.5s ease-in;
  animation-name: rotate;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
`;
