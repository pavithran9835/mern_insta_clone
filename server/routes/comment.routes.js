const express = require("express");
const commentRouter = express.Router();
const {
  craeteComment,
  likeComment,
  unlikeComment,
} = require("../controller/comment.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

commentRouter.route("/craeteComment").post(authenticateToken, craeteComment);
commentRouter.route("/likeComment/:id").patch(authenticateToken, likeComment);
commentRouter
  .route("/unlikeComment/:id")
  .patch(authenticateToken, unlikeComment);

module.exports = commentRouter;
