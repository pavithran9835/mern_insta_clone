import styled from "styled-components";

export const ProfileContainer = styled.div`
  width: 65%;
  height: 220px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  margin-top: 20px;
  overflow: hidden;

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

  @media (max-width: 500px) {
    height: auto;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding-left: 20px;
  }
`;

export const UserAvatar = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 5px solid #fff;
  }
`;

export const AvatarImage = styled.div`
  width: 170px;
  height: 170px;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserDetails = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;

  a {
    margin-top: 5px;
    color: #3897f0;
  }

  p {
    font-size: 15px;
  }

  h3 {
    font-size: 20px;
    font-weight: 400;
    margin-top: -3px;
  }
`;

export const UserDetailsTop = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;

  h2 {
    font-size: 25px;
    font-weight: 400;
  }

  button {
    width: 100px;
    height: 35px;
    margin-left: 20px;
    background-color: transparent;
    border-radius: 4px;
    outline: none;
    border: 1px solid #000;
    cursor: pointer;
  }
`;

export const DownButton = styled.button`
  width: 50px;
  height: 30px;
  margin-left: 20px;
  background-color: transparent;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserDetailsFollowers = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;

  h5 {
    font-size: 16px;
    font-weight: 400;
    margin-right: 30px;
    cursor: pointer;
  }
`;

export const UserContact = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;

  p {
    margin-right: 20px;
  }
`;
