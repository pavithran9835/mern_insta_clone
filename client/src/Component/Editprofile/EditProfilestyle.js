import styled from "styled-components";

export const Editform = styled.div`
  width: 60%;
  height: 110vh;
  margin-left: auto;
  margin-right: auto;
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

export const LeftOptions = styled.div`
  width: 30%;
  height: 90%;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: space-around;

  h5 {
    height: 100%;
    font-size: 16px;
    font-weight: 400;
    padding-left: 10px;
    display: flex;
    align-items: center;

    &:hover {
      background-color: #efefef;
      border-left: 3px solid black;
      margin-left: -3px;
    }
  }

  h4 {
    color: #3897f0;
    padding-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  @media (max-width: 770px) {
    display: none;
  }
`;
export const RightContent = styled.div`
  width: 70%;
  height: 90%;
  border: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
  align-items: space-around;

  form {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    textarea {
      width: 79%;
      height: 70px;
      border: 1px solid #ccc;
      outline: none;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    button {
      width: 150px;
      padding: 10px 15px;
      border: none;
      outline: none;
      background-color: #3897f0;
      border-radius: 5px;
      margin-top: 10px;
      color: #fff;
      cursor: pointer;
    }
  }
  @media (max-width: 770px) {
    width: 90%;
  }

  @media (max-width: 470px) {
    width: 100%;
    height: auto;
    padding-top: 29px;
    padding-bottom: 29px;
  }
`;

export const LabelPic = styled.label`
  margin-top: 5px;
  font-size: 14px;
  color: #3897f0;
  cursor: pointer;
`;

export const Fileinput = styled.input`
  display: none;
`;

export const Imgconatiner = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const FormGroup = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;

  label {
    color: #000;
    cursor: pointer;
  }

  input {
    width: 75%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
  }
`;

export const FormGroupTextarea = styled(FormGroup)`
  height: 80px;
`;

export const Genderinput = styled.div`
  width: 80%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  label {
    margin-left: -20px;
    color: #000;
    cursor: pointer;
  }
`;
