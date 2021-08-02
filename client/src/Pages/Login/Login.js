import React, { useState } from "react";
import {
  LoginContainer,
  LoginLeft,
  LoginRight,
  LoginForm,
  Screenshot,
  Para,
} from "./Loginstyle";
import FacebookIcon from "@material-ui/icons/Facebook";
import {
  FormGroup,
  RegisterButton,
  PasswordContainer,
} from "../../Component/RegisterForm/style";
import { Havaccount, StoreImages } from "../Register/RegisterStyle";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import { authenticate, isAuth } from "../../helper";
import Loading from "../../Component/Loading/Loading";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const [showPassword, setShowPassword] = useState(true);

  const passwordIconHandler = () => {
    setShowPassword(!showPassword);
  };

  const [loginData, setloginData] = useState({
    email: "demo@demo.com",
    password: "demo",
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setloginData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    setLoading(true);

    const { data } = axios
      .post("http://localhost:5000/auth/login", {
        email: loginData.email,
        password: loginData.password,
      })
      .then((response) => {
        authenticate(response, () => {
          setloginData({ email: "", password: "" });

          let intended = history.location.state;
          console.log("intended :", intended);
          if (intended) {
            history.push(intended.from);
          } else {
            isAuth() && history.push("/");
          }
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response);
        toast.dark(error.response.data.error);
      });

    console.log(data);
  };

  return (
    <>
      <LoginContainer>
        {loading && <Loading />}
        <ToastContainer />
        <LoginLeft>
          <img src="images/mobile-image.png" alt="Mobile Image" />
          <Screenshot src="images/shot.jpg" alt="screen shot" />
        </LoginLeft>
        <LoginRight>
          <LoginForm>
            <img src="images/insta-logo.png" alt="Logo" />
            <FormGroup>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={inputChangeHandler}
              />
              <PasswordContainer>
                <input
                  type={showPassword ? "password" : "text"}
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={inputChangeHandler}
                />
                {showPassword ? (
                  <VisibilityOffIcon
                    style={{
                      marginTop: "15px",
                      marginLeft: "-30px",
                    }}
                    onClick={passwordIconHandler}
                  />
                ) : (
                  <VisibilityIcon
                    style={{ marginTop: "15px", marginLeft: "-30px" }}
                    onClick={passwordIconHandler}
                  />
                )}
              </PasswordContainer>
              <RegisterButton type="submit" onClick={formSubmitHandler}>
                Log In
              </RegisterButton>
            </FormGroup>
            <p>OR</p>
            <RegisterButton type="button">
              <FacebookIcon size="large" />
              &nbsp;&nbsp;Log in with Facebook
            </RegisterButton>
            <Link to="/forgot-password">Forgot password</Link>
          </LoginForm>
          <Havaccount>
            <p>
              Don't Have account? <Link to="/register">Sign Up</Link>
            </p>
          </Havaccount>
          <Para style={{ textAlign: "center" }}>Get the app.</Para>
          <StoreImages>
            <img src="images/app-store.png" alt="App Store" />
            <img src="images/play-store.png" alt="Play Store" />
          </StoreImages>
        </LoginRight>
      </LoginContainer>
    </>
  );
};

export default Login;
