module.exports.home = function (req, res) {
  // send the projects data in response
  return res.status(200).json({ data: "data will be here", status: "success" });
};
