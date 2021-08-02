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

export const createPostReducer = (state = { createPost: [] }, action) => {
  switch (action.type) {
    case CREATE_POST_REQUESTS:
      return {
        createPostLoading: true,
        createPost: [],
      };

    case CREATE_POST_SUCCESS:
      return {
        profileLoading: false,
        message: action.payload.message,
        newPost: action.payload.newPost,
      };

    case CREATE_POST_FAIL:
      return {
        createPostLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export const getPostReducer = (state = { getPost: [] }, action) => {
  switch (action.type) {
    case GET_POST_REQUESTS:
      return {
        getPostLoading: true,
        getPost: [],
      };

    case GET_POST_SUCCESS:
      return {
        getPostLoading: false,
        homePost: action.payload.homePost,
      };

    case GET_POST_FAIL:
      return {
        getPostLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export const likePostReducer = (state = { likePost: [] }, action) => {
  switch (action.type) {
    case LIKE_POST_REQUESTS:
      return {
        likePostLoading: true,
        likePost: [],
      };

    case LIKE_POST_SUCCESS:
      return {
        likePostLoading: false,
        likeMessage: action.payload.message,
      };

    case LIKE_POST_FAIL:
      return {
        likePostLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export const unlikePostReducer = (state = { unlikePost: [] }, action) => {
  switch (action.type) {
    case UNLIKE_POST_REQUESTS:
      return {
        unlikePostLoading: true,
        unlikePost: [],
      };

    case UNLIKE_POST_SUCCESS:
      return {
        unlikePostLoading: false,
        unlikeMessage: action.payload.message,
      };

    case UNLIKE_POST_FAIL:
      return {
        unlikePostLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export const singlePostReducer = (state = { singlePostData: [] }, action) => {
  switch (action.type) {
    case SINGLE_POST_REQUESTS:
      return {
        singlePostLoading: true,
        singlePostData: [],
      };

    case SINGLE_POST_SUCCESS:
      return {
        singlePostLoading: false,
        singlePost: action.payload.singlePost,
      };

    case SINGLE_POST_FAIL:
      return {
        singlePostLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export const userPostReducer = (state = { userPost: [] }, action) => {
  switch (action.type) {
    case GET_USER_POST_REQUESTS:
      return {
        userPostLoading: true,
        userPost: [],
      };

    case GET_USER_POST_SUCCESS:
      return {
        userPostLoading: false,
        userPosts: action.payload.userPosts,
      };

    case GET_USER_POST_FAIL:
      return {
        userPostLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export const deletePostReducer = (state = { deletePost: [] }, action) => {
  switch (action.type) {
    case DELETE_POST_REQUESTS:
      return {
        deletePostLoading: true,
        deletePost: [],
      };

    case DELETE_POST_SUCCESS:
      return {
        deletePostLoading: false,
        deleteMessage: action.payload.message,
        deletedPost: action.payload.deletedPost,
      };

    case DELETE_POST_FAIL:
      return {
        deletePostLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export const explorePostReducer = (
  state = { explorePostDetails: [] },
  action
) => {
  switch (action.type) {
    case EXPLORE_POST_REQUESTS:
      return {
        explorePostLoading: true,
        explorePostDetails: [],
      };

    case EXPLORE_POST_SUCCESS:
      return {
        explorePostLoading: false,
        explorePost: action.payload.explorePosts,
      };

    case EXPLORE_POST_FAIL:
      return {
        explorePostLoading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
