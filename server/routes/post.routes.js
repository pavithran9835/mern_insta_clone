const express = require("express");
const postRouter = express.Router();
const { authenticateToken } = require("../middleware/auth.middleware");
const {
  createPost,
  getPost,
  likePost,
  unlikePost,
  singlePost,
  getUserPost,
  deletePost,
  getExplorePost,
} = require("../controller/post.controller");

postRouter.route("/createPost").post(authenticateToken, createPost);
postRouter.route("/getPost").get(authenticateToken, getPost);
postRouter.route("/likePost/:id").patch(authenticateToken, likePost);
postRouter.route("/unlikePost/:id").patch(authenticateToken, unlikePost);
postRouter.route("/singlePost/:id").get(authenticateToken, singlePost);
postRouter.route("/getUserPost/:id").get(authenticateToken, getUserPost);
postRouter.route("/deletePost/:id").get(authenticateToken, deletePost);
postRouter.route("/getExplorePost").get(authenticateToken, getExplorePost);

module.exports = postRouter;
