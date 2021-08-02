import {
  CREATE_POST_REQUESTS,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  GET_POST_REQUESTS,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  LIKE_POST_REQUESTS,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
  UNLIKE_POST_REQUESTS,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAIL,
  SINGLE_POST_REQUESTS,
  SINGLE_POST_SUCCESS,
  SINGLE_POST_FAIL,
  GET_USER_POST_REQUESTS,
  GET_USER_POST_SUCCESS,
  GET_USER_POST_FAIL,
  DELETE_POST_REQUESTS,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  EXPLORE_POST_REQUESTS,
  EXPLORE_POST_SUCCESS,
  EXPLORE_POST_FAIL,
} from "../Constant/post.constant";
import axios from "axios";

export const createPostAction = (content, images, userId, token) => async (
  dispatch
) => {
  try {
    dispatch({ type: CREATE_POST_REQUESTS });

    const { data } = await axios.post(
      `http://localhost:5000/post/createPost`,
      {
        content: content,
        images: images,
        user: userId,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: CREATE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const getPostAction = (token) => async (dispatch) => {
  try {
    dispatch({ type: GET_POST_REQUESTS });

    const { data } = await axios.get(`http://localhost:5000/post/getPost`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: GET_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_POST_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const likePostAction = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: LIKE_POST_REQUESTS });

    const { data } = await axios.patch(
      `http://localhost:5000/post/likePost/${id}`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: LIKE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIKE_POST_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const unlikePostAction = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: UNLIKE_POST_REQUESTS });

    const { data } = await axios.patch(
      `http://localhost:5000/post/unlikePost/${id}`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: UNLIKE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UNLIKE_POST_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const singlePostAction = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_POST_REQUESTS });

    const { data } = await axios.get(
      `http://localhost:5000/post/singlePost/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: SINGLE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SINGLE_POST_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const userPostAction = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_POST_REQUESTS });

    const { data } = await axios.get(
      `http://localhost:5000/post/getUserPost/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: GET_USER_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_POST_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const deletePostAction = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_POST_REQUESTS });

    const { data } = await axios.get(
      `http://localhost:5000/post/deletePost/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: DELETE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const explorePostAction = (token) => async (dispatch) => {
  try {
    dispatch({ type: EXPLORE_POST_REQUESTS });

    const { data } = await axios.get(
      `http://localhost:5000/post/getExplorePost`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: EXPLORE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EXPLORE_POST_FAIL,
      payload: error.response && error.response.data,
    });
  }
};
