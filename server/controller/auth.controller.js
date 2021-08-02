const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
// const cookie = require("cookie-parser");

//register validation
const registerSchemaValidation = Joi.object({
  fullname: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(15).required(),
});

//login validation
const loginSchemaValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(4).max(12).required(),
});

//register Controller
exports.register = async (req, res) => {
  const { error } = registerSchemaValidation.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist)
    return res.status(400).json({ error: "username already taken" });

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).json({ error: "Email already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const user = new User({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();

    res.json({
      message: "Your Account Created",
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

//login Controller
exports.login = async (req, res) => {
  const { error } = loginSchemaValidation.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: "Email Doesnt Exist" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Invalid Password" });

  const { _id, name, role } = user;

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "7d",
  });

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_TOKEN,
    {
      expiresIn: "7d",
    }
  );

  res.status(200).json({
    message: "Logged In",
    token: accessToken,
    refreshToken,
    user: { _id, name, role },
  });
};
