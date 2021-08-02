import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
`;

export const HeaderRow = styled.div`
  width: 65%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1300px) {
    width: 70%;
  }

  @media (max-width: 1200px) {
    width: 75%;
  }

  @media (max-width: 1100px) {
    width: 80%;
  }

  @media (max-width: 1000px) {
    width: 85%;
  }

  @media (max-width: 900px) {
    width: 90%;
  }

  @media (max-width: 800px) {
    width: 95%;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const HeaderLogo = styled.div`
  flex: 30%;
  height: 100%;
  display: flex;
  align-items: center;

  img {
    cursor: pointer;
    @media only screen and (max-width: 479px) {
      margin-left: 10px;
    }
  }
`;

export const HeaderSearch = styled.div`
  flex: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    width: 70%;
    padding: 5px;
    border: 1px solid #eee;
    border-radius: 3px;
    /* background-color: #fafafa; */
    outline: none;
  }

  input::-webkit-input-placeholder {
    color: grey;
  }

  @media only screen and (max-width: 479px) {
    display: none;
  }
`;

export const HeaderOptions = styled.div`
  flex: 35%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  a {
    text-decoration: none;
    color: black;
  }

  img {
    width: 26px;
    object-fit: contain;
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
  }

  .MuiSvgIcon-root {
    font-size: 24px;
    margin-left: 10px;
    margin-right: 10px;
    font-weight: 300;
    cursor: pointer;
  }
`;

export const Dropdown = styled.div`
  width: 150px;
  position: absolute;
  top: 55px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 5px #ccc;
  transition: all ease 0.5s;
  background-color: #fff;

  a {
    width: 94%;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;

    &:hover {
      background-color: #e6e6e6;
    }
  }

  > .MuiSvgIcon-root {
    color: red;
  }
`;
