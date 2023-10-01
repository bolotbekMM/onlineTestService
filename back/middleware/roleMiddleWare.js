const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "user notregistred" });
      }
      const decodetData = jwt.verify(token, SECRET_KEY);
      let access = false;
      console.log(decodetData, "token");
      decodetData.roles.forEach((element) => {
        if (roles.includes(element)) {
          access = true;
        }
      });

      if (!access) {
        return res.status(403).json({ message: "have not access" });
      }

      next();
    } catch (e) {
      console.log(e);
      return res.status(403).json({ message: " user not registred" });
    }
  };
};
