const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "user notregistred" });
    }
    const decodetData = jwt.verify(token, SECRET_KEY);
    console.log(decodetData, "token");
    req.user = decodetData;
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: " user not registred" });
  }
};
