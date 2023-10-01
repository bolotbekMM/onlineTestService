const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const jvt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { SECRET_KEY } = require("../config");

const genereateWebToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jvt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    try {
      console.log(req);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "registration error", errors });
      }
      const { fullName, gmail, password } = req.body;
      const candidate = await User.findOne({ gmail });
      if (candidate) {
        return res.status(400).json({ message: "email already exists" });
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        fullName,
        gmail,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();
      return res.json({ message: "user successfully registered" });
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: "Registration error" });
    }
  }
  async login(req, res) {
    try {
      const { gmail, password } = req.body;
      const user = await User.findOne({ gmail });
      if (!user) {
        return res.status(400).json({ message: `${gmail} - user not found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `invalid password` });
      }
      const token = genereateWebToken(user._id, user.roles);

      return res.json({
        fullName: user.fullName,
        gmail: user.gmail,
        id: user._id,
        roles: user.roles,
        token,
      });
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: "Login error" });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.error(e);
    }
  }
}
module.exports = new authController();
//   const userRole = new Role();
//   const adminRole = new Role({ value: "ADMIN" });
//   await userRole.save();
//   await adminRole.save();
