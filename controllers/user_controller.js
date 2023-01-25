const User = require("../models/user");
const sendToken = require("../utils/jwtToken");

module.exports.registerUser = async function (req, res) {
  try {
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

module.exports.loginUser = function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "please enter both email and password" });
  }

  let user = User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  let isPasswordMatched = user.comparePassword(password);
  if (!isPasswordMatched) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  sendToken(user, 200, res);
};
