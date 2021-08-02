const express = require("express");
const messageRouter = express.Router();
const {
  createMessage,
  getMessage,
} = require("../controller/message.controller");

messageRouter.route("/createMessage").post(createMessage);
messageRouter.route("/getMessage/:id").get(getMessage);

module.exports = messageRouter;
