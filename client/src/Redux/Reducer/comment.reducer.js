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

export const createCommentReducer = (state = { createComment: [] }, action) => {
  switch (action.type) {
    case CREATE_COMMENT_REQUESTS:
      return {
        createCommentLoading: true,
        createComment: [],
      };

    case CREATE_COMMENT_SUCCESS:
      return {
        createCommentLoading: false,
        createCommentmessage: action.payload.message,
        newComment: action.payload.newComment,
      };

    case CREATE_COMMENT_FAIL:
      return {
        createCommentLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export const likeCommentReducer = (state = { likeComment: [] }, action) => {
  switch (action.type) {
    case LIKE_COMMENT_REQUESTS:
      return {
        likeCommentLoading: true,
        likeComment: [],
      };

    case LIKE_COMMENT_SUCCESS:
      return {
        likeCommentLoading: false,
        likeCommentMessage: action.payload.message,
      };

    case LIKE_COMMENT_FAIL:
      return {
        likeCommentLoading: false,
        likeCommentError: action.payload.error,
      };

    default:
      return state;
  }
};

export const unlikeCommentReducer = (state = { unlikeComment: [] }, action) => {
  switch (action.type) {
    case UNLIKE_COMMENT_REQUESTS:
      return {
        unlikeCommentLoading: true,
        unlikeComment: [],
      };

    case UNLIKE_COMMENT_SUCCESS:
      return {
        unlikeCommentLoading: false,
        unlikeCommentMessage: action.payload.message,
      };

    case UNLIKE_COMMENT_FAIL:
      return {
        unlikeCommentLoading: false,
        unlikeCommentError: action.payload.error,
      };

    default:
      return state;
  }
};
