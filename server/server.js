const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const cloudinaryRouter = require("./routes/cloudinary.routes");
const postRouter = require("./routes/post.routes");
const commentRouter = require("./routes/comment.routes");
const conversationRouter = require("./routes/conversation.routes");
const messageRouter = require("./routes/message.routes");
const Pusher = require("pusher");
dotenv.config();

app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(cookieParser());

// const pusher = new Pusher({
//   appId: "1211450",
//   key: "8228a9b223a03209c206",
//   secret: "83fae7e1a134d38f7150",
//   cluster: "ap2",
//   useTLS: true,
// });

mongoose
  .connect(process.env.DB_CONFIG, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(
    (res) => {
      console.log("mongodb connected");

      // const changeStream = mongoose.connection.collection("posts").watch();

      // changeStream.on("change", (change) => {
      //   console.log(change);

      //   if (change.operationType === "insert") {
      //     console.log("Triigering pusher");

      //     const postDetails = change.fullDocument;
      //     pusher.trigger("posts", "inserted", {
      //       content: postDetails.content,
      //       images: postDetails.images,
      //       comments: postDetails.comments,
      //       likes: postDetails.likes,
      //       user: postDetails.user,
      //     });
      //   } else {
      //     console.log("unknown trigger");
      //   }
      // });
    },
    (err) => {
      console.log(err);
    }
  );

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/cloudinary", cloudinaryRouter);
app.use("/post", postRouter);
app.use("/comments", commentRouter);
app.use("/conversation", conversationRouter);
app.use("/message", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log("server up and running");
});
