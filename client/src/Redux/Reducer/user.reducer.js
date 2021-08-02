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

export const searchUserReducer = (state = { searchUserData: [] }, action) => {
  switch (action.type) {
    case SEARCH_USER_REQUESTS:
      return {
        loading: true,
        searchUserData: [],
      };

    case SEARCH_USER_SUCCESS:
      return {
        loading: false,
        users: action.payload.users,
      };

    case SEARCH_USER_FAIL:
      return {
        loading: false,
      };

    default:
      return state;
  }
};

export const getUserProfileReducer = (
  state = { getUserProfile: [] },
  action
) => {
  switch (action.type) {
    case GET_USER_PROFILE_REQUESTS:
      return {
        profileLoading: true,
        getUserProfile: [],
      };

    case GET_USER_PROFILE_SUCCESS:
      return {
        profileLoading: false,
        userProfileDetails: action.payload.userProfile,
      };

    case GET_USER_PROFILE_FAIL:
      return {
        profileLoading: false,
      };

    default:
      return state;
  }
};

export const updateUserProfileReducer = (
  state = { updateUserProfile: [] },
  action
) => {
  switch (action.type) {
    case UPDATE_USER_REQUESTS:
      return {
        updateLoading: true,
        updateUserProfile: [],
      };

    case UPDATE_USER_SUCCESS:
      return {
        updateLoading: false,
        updateMessage: action.payload.message,
      };

    case UPDATE_USER_FAIL:
      return {
        updateLoading: false,
      };

    default:
      return state;
  }
};

export const followUserReducer = (state = { followUser: [] }, action) => {
  switch (action.type) {
    case FOLLOW_USER_REQUESTS:
      return {
        followUserLoading: true,
        followUser: [],
      };

    case FOLLOW_USER_SUCCESS:
      return {
        followUserLoading: false,
        followMessage: action.payload.message,
      };

    case FOLLOW_USER_FAIL:
      return {
        followUserLoading: false,
        followError: action.payload.error,
      };

    default:
      return state;
  }
};

export const unFollowUserReducer = (state = { unFollowUser: [] }, action) => {
  switch (action.type) {
    case UNFOLLOW_USER_REQUESTS:
      return {
        unfollowUserLoading: true,
        unFollowUser: [],
      };

    case UNFOLLOW_USER_SUCCESS:
      return {
        unfollowUserLoading: false,
        unfollowMessage: action.payload.message,
      };

    case UNFOLLOW_USER_FAIL:
      return {
        unfollowUserLoading: false,
        unfollowError: action.payload.error,
      };

    default:
      return state;
  }
};

export const getUserFollowersReducer = (
  state = { getUserFollowers: [] },
  action
) => {
  switch (action.type) {
    case GET_USER_FOLLOWERS_REQUESTS:
      return {
        getUserFollowersLoading: true,
        getUserFollowers: [],
      };

    case GET_USER_FOLLOWERS_SUCCESS:
      return {
        getUserFollowersLoading: false,
        userFollowers: action.payload.userFollowers,
      };

    case GET_USER_FOLLOWERS_FAIL:
      return {
        getUserFollowersLoading: false,
        getUserFollowersError: action.payload.error,
      };

    default:
      return state;
  }
};

export const suggestedUserReducer = (state = { suggestedUser: [] }, action) => {
  switch (action.type) {
    case SUGGESTION_USER_REQUESTS:
      return {
        suggestedUserLoading: true,
        suggestedUser: [],
      };

    case SUGGESTION_USER_SUCCESS:
      return {
        suggestedUserLoading: false,
        suggestedUsers: action.payload.users,
      };

    case SUGGESTION_USER_FAIL:
      return {
        suggestedUserLoading: false,
        suggestedUsersError: action.payload.error,
      };

    default:
      return state;
  }
};
