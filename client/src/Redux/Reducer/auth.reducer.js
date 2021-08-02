import {
  REGISTER_REQUESTS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUESTS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../Constant/auth.constant";

export const registerReducer = (state = { registerResponse: [] }, action) => {
  switch (action.type) {
    case REGISTER_REQUESTS:
      return {
        loading: true,
        registerResponse: [],
      };

    case REGISTER_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
      };

    case REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export const loginReducer = (state = { loginResponse: [] }, action) => {
  switch (action.type) {
    case LOGIN_REQUESTS:
      return {
        loading: true,
        loginResponse: [],
      };

    case LOGIN_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
      };

    case LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
