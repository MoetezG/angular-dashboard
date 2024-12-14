const jwt = require("jsonwebtoken");
require("dotenv").config();
function auth(req, res, next) {
  if (!req.headers.cookie) {
    return res.json({ status: "ko", message: "invalid token" });
  }
  const token = req.headers.cookie.split("token=")[1];

  if (!token) {
    return res.json({ status: "ko", message: "invalid token" });
  }
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.json({ status: "ko", message: "invalid token" });
    }
    req.userId = decoded.id;
    next();
  } catch (err) {
    throw new Error(err);
  }
}
module.exports = auth;
