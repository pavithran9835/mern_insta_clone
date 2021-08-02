const Comment = require("../model/comment.model");
const Post = require("../model/post.model");

exports.craeteComment = async (req, res, next) => {
  try {
    const comment = new Comment({
      user: req.user._id,
      content: req.body.content,
      tag: req.body.tag,
      reply: req.body.reply,
    });

    const newComment = await Post.findOneAndUpdate(
      { _id: req.body.postId },
      {
        $push: { comments: comment._id },
      },
      { new: true }
    )
      .populate("user likes", "avatar username fullname")
      .populate({
        path: "comments",
        populate: {
          path: "user likes",
          select: "-password",
        },
      });

    await comment.save();

    res
      .status(200)
      .json({ message: "comment created", newComment: newComment });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.likeComment = async (req, res) => {
  const _id = req.params.id;

  try {
    const comment = await Comment.find({ _id: _id, likes: req.user._id });
    if (comment.length > 0)
      return res.status(400).json({ error: "You already liked this comment" });

    const like = await Comment.findOneAndUpdate(
      { _id: _id },
      {
        $push: { likes: req.user._id },
      },
      { new: true }
    );

    if (!like)
      return res.status(400).json({ error: "This Comment does not exist." });

    res.status(200).json({ message: "You liked this comment" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.unlikeComment = async (req, res, next) => {
  const _id = req.params.id;

  const comment = await Comment.find({ _id: _id, likes: req.user._id });

  if (comment.length <= 0)
    return res.status(400).json({ error: "You didn't like this commet" });

  const unlike = await Comment.findOneAndUpdate(
    { _id: _id },
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  );

  if (!unlike)
    return res.status(400).json({ error: "This comment does not exist." });

  res.status(200).json({ message: "You unliked this post" });
};
