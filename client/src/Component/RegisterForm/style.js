import styled from "styled-components";

export const RegisterFormContainer = styled.div`
  width: 320px;
  height: auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 30px;
  margin-top: 20px;

  img {
    width: 55%;
    object-fit: contain;
  }

  p {
    font-size: 15px;
    text-align: center;
    margin-top: 15px;
    color: #5c5c5c;
  }
`;

export const FormGroup = styled.div`
  width: 100%;
  height: auto;

  input {
    width: 97%;
    padding: 12px 0px;
    margin-top: 10px;
    background-color: #fafafa;
    border: 1px solid #c7c7c7;
    outline: none;
    padding-left: 5px;
  }
`;

export const RegisterButton = styled.button`
  width: 100%;
  padding: 9px;
  margin-top: 15px;
  background-color: #0095f6;
  border: none;
  color: white;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
`;

export const ToastContainer = styled.div`
  background-color: #7889;
`;

export const PasswordContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: grey;
`;
