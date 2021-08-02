const express = require("express");
const userRouter = express.Router();
const {
  searchUser,
  getUserProfile,
  updateUser,
  follow,
  unfollow,
  getUserFollower,
  suggestion,
} = require("../controller/user.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

userRouter.route("/searchUser").get(authenticateToken, searchUser);
userRouter.route("/getUserProfile/:id").get(authenticateToken, getUserProfile);
userRouter.route("/updateUser/:id").post(authenticateToken, updateUser);
userRouter.route("/follow/:id").post(authenticateToken, follow);
userRouter.route("/unfollow/:id").post(authenticateToken, unfollow);
userRouter
  .route("/getUserFollower/:id")
  .get(authenticateToken, getUserFollower);
userRouter.route("/suggestion").get(authenticateToken, suggestion);

module.exports = userRouter;
