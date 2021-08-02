import styled from "styled-components";
import { RegisterContainer } from "../Register/RegisterStyle";
import { RegisterFormContainer } from "../../Component/RegisterForm/style";

export const LoginContainer = styled(RegisterContainer)`
  height: 100vh;
  flex-direction: row;
`;

export const LoginLeft = styled.div`
  width: 50%;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 800px) {
    display: none;
  }
`;

export const LoginRight = styled.div`
  width: 50%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const LoginForm = styled(RegisterFormContainer)`
  height: auto;

  a {
    text-decoration: none;
    margin-top: 20px;
  }
`;

export const Screenshot = styled.img`
  position: absolute;
  margin-top: 4px;
  margin-left: -63px;
`;

export const Para = styled.p`
  text-align: center;
`;
