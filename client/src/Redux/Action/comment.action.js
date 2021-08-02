import {
  CREATE_COMMENT_REQUESTS,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  LIKE_COMMENT_REQUESTS,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAIL,
  UNLIKE_COMMENT_REQUESTS,
  UNLIKE_COMMENT_SUCCESS,
  UNLIKE_COMMENT_FAIL,
} from "../Constant/comment.constant";
import axios from "axios";

export const createCommentAction = (content, postId, token) => async (
  dispatch
) => {
  try {
    dispatch({ type: CREATE_COMMENT_REQUESTS });

    const { data } = await axios.post(
      `http://localhost:5000/comments/craeteComment`,
      {
        content: content,
        postId: postId,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_COMMENT_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const likeCommentAction = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: LIKE_COMMENT_REQUESTS });

    const { data } = await axios.patch(
      `http://localhost:5000/comments/likeComment/${id}`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: LIKE_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIKE_COMMENT_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const unlikeCommentAction = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: UNLIKE_COMMENT_REQUESTS });

    const { data } = await axios.patch(
      `http://localhost:5000/comments/unlikeComment/${id}`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: UNLIKE_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UNLIKE_COMMENT_FAIL,
      payload: error.response && error.response.data,
    });
  }
};
