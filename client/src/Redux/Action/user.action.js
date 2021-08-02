import {
  SEARCH_USER_REQUESTS,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAIL,
  GET_USER_PROFILE_REQUESTS,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  UPDATE_USER_REQUESTS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  FOLLOW_USER_REQUESTS,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAIL,
  UNFOLLOW_USER_REQUESTS,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAIL,
  GET_USER_FOLLOWERS_REQUESTS,
  GET_USER_FOLLOWERS_SUCCESS,
  GET_USER_FOLLOWERS_FAIL,
  SUGGESTION_USER_REQUESTS,
  SUGGESTION_USER_SUCCESS,
  SUGGESTION_USER_FAIL,
} from "../Constant/user.constant";
import axios from "axios";

export const searchUserAction = (name, token) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_USER_REQUESTS });

    const { data } = await axios.get(
      `http://localhost:5000/user/searchUser?username=${name}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: SEARCH_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_USER_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const getUserProfileAction = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_PROFILE_REQUESTS });

    const { data } = await axios.get(
      `http://localhost:5000/user/getUserProfile/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const updateUserProfileAction = (id, token, editProfile) => async (
  dispatch
) => {
  try {
    dispatch({ type: UPDATE_USER_REQUESTS });

    const { data } = await axios.post(
      `http://localhost:5000/user/updateUser/${id}`,
      {
        fullname: editProfile.fullname,
        username: editProfile.username,
        email: editProfile.email,
        avatar: editProfile.avatar,
        gender: editProfile.gender,
        role: editProfile.role,
        mobile: editProfile.mobile,
        address: editProfile.address,
        story: editProfile.story,
        website: editProfile.website,
        followers: editProfile.followers,
        following: editProfile.following,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const followUserAction = (id, token) => async (dispatch) => {
  try {
    console.log(id, token);

    dispatch({ type: FOLLOW_USER_REQUESTS });

    const { data } = await axios.post(
      `http://localhost:5000/user/follow/${id}`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FOLLOW_USER_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const unFollowUserAction = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: UNFOLLOW_USER_REQUESTS });

    const { data } = await axios.post(
      `http://localhost:5000/user/unfollow/${id}`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: UNFOLLOW_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UNFOLLOW_USER_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const getUserFollowerAction = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_FOLLOWERS_REQUESTS });

    const { data } = await axios.get(
      `http://localhost:5000/user/getUserFollower/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: GET_USER_FOLLOWERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_FOLLOWERS_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const getSuggestedUserAction = (token) => async (dispatch) => {
  try {
    dispatch({ type: SUGGESTION_USER_REQUESTS });

    const { data } = await axios.get(`http://localhost:5000/user/suggestion`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: SUGGESTION_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SUGGESTION_USER_FAIL,
      payload: error.response && error.response.data,
    });
  }
};
