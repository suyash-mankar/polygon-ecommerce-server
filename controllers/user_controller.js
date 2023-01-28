const User = require("../models/user");
const sendToken = require("../utils/jwtToken");

module.exports.registerUser = async function (req, res) {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "please enter all fields", success: false });
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      user = await User.create(req.body);
      sendToken(user, 201, res);
    } else {
      return res
        .status(200)
        .json({ message: "user already registered", success: false });
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

module.exports.loginUser = async function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "please enter both email and password" });
  }

  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  let isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  sendToken(user, 200, res);
};

module.exports.logout = function (req, res) {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });

  res.status(200).json({ message: "logged out successfully", success: true });
};

// Get User Detail
exports.getUserDetails = async (req, res) => {
  try {
    if (req.user) {
      const user = await User.findById(req.user.id);
      res.status(200).json({
        success: true,
        user,
      });
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

// Get all users(admin)
exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    console.log(err);
    return;
  }
};
