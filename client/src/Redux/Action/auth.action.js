import {
  REGISTER_REQUESTS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUESTS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../Constant/auth.constant";
import axios from "axios";

export const registerAction = (registerData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUESTS });

    const { data } = await axios.post(`http://localhost:5000/auth/register`, {
      fullname: registerData.fullname,
      username: registerData.username,
      email: registerData.email,
      password: registerData.password,
    });
    dispatch({ type: REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const loginAction = (loginData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUESTS });

    const { data } = await axios.post(`http://localhost:5000/auth/login`, {
      email: loginData.email,
      password: loginData.password,
    });
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response && error.response.data,
    });
  }
};
