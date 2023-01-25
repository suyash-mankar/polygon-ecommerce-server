const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ message: "please login to access this page" });
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
};

exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json(`Role: ${req.user.role} is not allowed to access this page`);
    }
    next();
  };
};
