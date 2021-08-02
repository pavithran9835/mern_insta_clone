const Post = require("../model/post.model");
const User = require("../model/user.model");
// const Joi = require("joi");

// const postSchemaValidation = Joi.object({
//   content: Joi.string().required(),
//   images: Joi.required(),
//   user: Joi.array(),
// });

class Apifeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString * 1 || 1;
    const limit = this.queryString * 1 || 30;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

exports.createPost = async (req, res, next) => {
  // const { error } = postSchemaValidation.validate(req.body);
  // if (error) return res.status(400).json({ error: error.details[0].message });

  // const userProfile = await User.findOne({ _id: req.user._id }).select(
  //   "-password , -email"
  // );
  // if (!userProfile) return res.status(400).json({ error: "User Doesnt Exist" });

  try {
    const post = new Post({
      content: req.body.content,
      images: req.body.images,
      user: req.body.user,
    });

    const newPost = await post.save();

    res.json({
      message: "Your Post Created",
      newPost: newPost,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getPost = async (req, res) => {
  try {
    const homePost = await Post.find({
      user: { $in: [...req.user.following, req.user._id] },
    })
      .sort("-createdAt")
      .populate("user likes comments", "avatar username fullname")
      .populate({
        path: "comments",
        populate: {
          path: "user likes",
          select: "-password",
        },
      });

    res.status(200).json({ homePost });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.likePost = async (req, res) => {
  const _id = req.params.id;

  try {
    const post = await Post.find({ _id: _id, likes: req.user._id });
    if (post.length > 0)
      return res.status(400).json({ error: "You already liked this post" });

    const like = await Post.findOneAndUpdate(
      { _id: _id },
      {
        $push: { likes: req.user._id },
      },
      { new: true }
    );

    if (!like)
      return res.status(400).json({ error: "This post does not exist." });

    res.status(200).json({ message: "You liked this post" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.unlikePost = async (req, res, next) => {
  const _id = req.params.id;

  const post = await Post.find({ _id: _id, likes: req.user._id });

  if (post.length <= 0)
    return res.status(400).json({ error: "You didn't like this post" });

  const unlike = await Post.findOneAndUpdate(
    { _id: _id },
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  );

  if (!unlike)
    return res.status(400).json({ error: "This post does not exist." });

  res.status(200).json({ message: "You unliked this post" });
};

exports.singlePost = async (req, res, next) => {
  const _id = req.params.id;

  try {
    const singlePost = await Post.findOne({ _id: _id })
      .populate("user likes comments", "avatar username fullname")
      .populate({
        path: "comments",
        populate: {
          path: "user likes",
          select: "-password",
        },
      });

    if (!singlePost)
      return res.status(400).json({ error: "This post does not exist." });

    res.status(200).json({ singlePost });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getUserPost = async (req, res) => {
  const _id = req.params.id;

  try {
    const userPosts = await Post.find({ user: _id })

      .populate("user likes comments", "avatar username fullname")
      .populate({
        path: "comments",
        populate: {
          path: "user likes",
          select: "-password",
        },
      })
      .sort("-createdAt");

    if (userPosts.length <= 0)
      return res.status(400).json({ error: "No Post Yet" });

    res.status(200).json({ userPosts });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.deletePost = async (req, res) => {
  const _id = req.params.id;

  try {
    const deletedPost = await Post.findByIdAndDelete({ _id: _id });

    res.status(200).json({
      message: "Your Post has been deleted",
      deletedPost: deletedPost,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getExplorePost = async (req, res) => {
  try {
    const features = new Apifeatures(
      Post.find({
        user: { $nin: [...req.user.following, req.user._id] },
      }),
      req.query
    ).paginating();

    const explorePosts = await features.query
      .sort("-createdAt")
      .populate("user likes comments", "avatar username fullname")
      .populate({
        path: "comments",
        populate: {
          path: "user likes",
          select: "-password",
        },
      })
      .sort("-createdAt");

    res.json({ explorePosts });
  } catch (error) {
    res.status(400).json({ error });
  }
};
