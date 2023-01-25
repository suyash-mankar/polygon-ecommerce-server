const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isAuthenticatedUser = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ message: "please login to access this page" });
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);
};
