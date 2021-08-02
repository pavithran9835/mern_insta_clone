import React, { useEffect, useState } from "react";
import {
  RegisterFormContainer,
  FormGroup,
  SubmitBtn,
  RegisterButton,
  PasswordContainer,
} from "./style";
import FacebookIcon from "@material-ui/icons/Facebook";
import { registerAction } from "../../Redux/Action/auth.action";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(true);

  const passwordIconHandler = () => {
    setShowPassword(!showPassword);
  };

  const [userData, setUserData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setUserData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(registerAction(userData));
  };

  const { message, error } = useSelector((state) => state.register);

  useEffect(() => {
    toast.dark(message);
    toast.dark(error);
  }, [message, error]);

  return (
    <RegisterFormContainer>
      <ToastContainer />
      <img src="images/insta-logo.png" alt="Logo" />
      <p>Sign up to see photos and videos from your friends.</p>
      <RegisterButton type="button">
        <FacebookIcon size="large" />
        &nbsp;&nbsp;Log in with Facebook
      </RegisterButton>
      <p>OR</p>
      <FormGroup>
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          onChange={inputChangeHandler}
        />
        <input
          type="text"
          name="username"
          placeholder="User Name"
          onChange={inputChangeHandler}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={inputChangeHandler}
        />
        <PasswordContainer>
          <input
            type={showPassword ? "password" : "text"}
            name="password"
            placeholder="Password"
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
          Submit
        </RegisterButton>
      </FormGroup>

      <p>
        By signing up, you agree to our Terms , Data Policy and Cookies Policy .
      </p>
    </RegisterFormContainer>
  );
};

export default RegisterForm;
