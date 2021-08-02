const User = require("../model/user.model");

exports.searchUser = async (req, res) => {
  try {
    const users = await User.find({
      username: { $regex: req.query.username },
    })
      .limit(10)
      .select("fullname avatar username");

    res.status(200).json({ users });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const _id = req.params.id;

    const userProfile = await User.findOne({ _id: _id }).select("-password");

    if (!userProfile)
      return res.status(400).json({ error: "User Doesnt Exist" });

    res.status(200).json({ userProfile });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.updateUser = async (req, res) => {
  const _id = req.params.id;

  User.findById({ _id: _id }, (err, user) => {
    if (!user) {
      res.status(400).json({ error: "User Not Found" });
    } else {
      user.fullname = req.body.fullname;
      user.username = req.body.username;
      user.email = req.body.email;
      user.avatar = req.body.avatar;
      user.gender = req.body.gender;
      user.role = req.body.role;
      user.mobile = req.body.mobile;
      user.address = req.body.address;
      user.story = req.body.story;
      user.website = req.body.website;
      user.followers = req.body.followers;
      user.following = req.body.following;

      user
        .save()
        .then((myData) => {
          res.status(200).json({ message: "Profile Updated" });
        })
        .catch((err) => {
          res.status(400).json({ error: "unable to update " });
        });
    }
  });
};

exports.follow = async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.find({ _id: _id, followers: req.user._id });
    if (user.length > 0)
      return res.status(400).json({ error: "Your alredy following." });

    const newUser = await User.findOneAndUpdate(
      { _id: _id },
      {
        $push: { followers: req.user._id },
      },
      { new: true }
    ).populate("followers following", "-password");

    const updateUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: { following: _id },
      },
      { new: true }
    );

    res.status(200).json({ message: "following this user" });
    // res.status(200).json({ newUser, updateUser });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.unfollow = async (req, res) => {
  const _id = req.params.id;

  try {
    const newUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: { followers: req.user._id },
      },
      { new: true }
    ).populate("followers following", "-password");

    const updateUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $pull: { following: _id },
      },
      { new: true }
    );

    res.status(200).json({ message: "unfollowed this user" });
    // res.status(200).json({ newUser, updateUser });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getUserFollower = async (req, res, next) => {
  try {
    const _id = req.params.id;

    const userFollowers = await User.find({ _id: _id }).populate(
      "followers , following"
    );

    if (!userFollowers)
      return res.status(400).json({ error: "User Doesnt Exist" });

    res.status(200).json({ userFollowers });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.suggestion = async (req, res) => {
  try {
    const newArray = [...req.user.following, req.user._id];

    const num = req.query.num || 5;

    const users = await User.aggregate([
      { $match: { _id: { $nin: newArray } } },
      { $sample: { size: Number(num) } },
      {
        $lookup: {
          from: "users",
          localField: "followers",
          foreignField: "_id",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "following",
          foreignField: "_id",
          as: "following",
        },
      },
    ]).project("-password");

    return res.json({
      users,
      result: users.length,
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
