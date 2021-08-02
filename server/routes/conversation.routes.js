const express = require("express");
const conversationRouter = express.Router();
const {
  createConversation,
  getCoversation,
} = require("../controller/conversation.controller");

conversationRouter.route("/createConversation").post(createConversation);
conversationRouter.route("/:id").get(getCoversation);

module.exports = conversationRouter;
