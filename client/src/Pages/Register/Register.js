import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../../Component/RegisterForm/RegisterForm";
import {
  RegisterContainer,
  RegisterLeft,
  RegisterRight,
  Havaccount,
  StoreImages,
  ListPages,
} from "./RegisterStyle";

const Register = () => {
  return (
    <RegisterContainer>
      <RegisterForm />
      <Havaccount>
        <p>
          Have an account? <Link to="/login">Log in</Link>
        </p>
      </Havaccount>
      <p>Get the app.</p>
      <StoreImages>
        <img src="images/app-store.png" alt="App Store" />
        <img src="images/play-store.png" alt="Play Store" />
      </StoreImages>
      <ListPages>
        <li>About</li>
        <li>Blog</li>
        <li>Jobs</li>
        <li>Help</li>
        <li>API</li>
        <li>Privacy</li>
        <li>Terms</li>
        <li>Top Accounts</li>
        <li>Hashtags</li>
        <li>Locations</li>
        <li>English</li>
        <li>© 2021 Instagram from Facebook</li>
      </ListPages>
    </RegisterContainer>
  );
};

export default Register;
