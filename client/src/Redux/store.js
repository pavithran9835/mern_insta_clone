import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { registerReducer, loginReducer } from "./Reducer/auth.reducer";
import {
  followUserReducer,
  getUserFollowersReducer,
  getUserProfileReducer,
  searchUserReducer,
  suggestedUserReducer,
  unFollowUserReducer,
  updateUserProfileReducer,
} from "./Reducer/user.reducer";
import {
  createPostReducer,
  getPostReducer,
  likePostReducer,
  singlePostReducer,
  unlikePostReducer,
  userPostReducer,
  deletePostReducer,
  explorePostReducer,
} from "./Reducer/post.reducer";
import {
  createCommentReducer,
  likeCommentReducer,
  unlikeCommentReducer,
} from "./Reducer/comment.reducer";

const reducer = combineReducers({
  unlikeComment: unlikeCommentReducer,
  likeComment: likeCommentReducer,
  suggestedUser: suggestedUserReducer,
  explorePost: explorePostReducer,
  deletePost: deletePostReducer,
  userPost: userPostReducer,
  singlePost: singlePostReducer,
  createComment: createCommentReducer,
  unlikePost: unlikePostReducer,
  likePost: likePostReducer,
  getPost: getPostReducer,
  createPost: createPostReducer,
  getUserFollowers: getUserFollowersReducer,
  unFollowUser: unFollowUserReducer,
  followUser: followUserReducer,
  updateUserProfile: updateUserProfileReducer,
  getUserProfile: getUserProfileReducer,
  searchUser: searchUserReducer,
  register: registerReducer,
  login: loginReducer,
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
