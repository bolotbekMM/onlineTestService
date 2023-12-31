const Router = require("express");
const router = new Router();
const controller = require("../controllers/authController");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleWare");
const roleMiddleWare = require("../middleware/roleMiddleWare");

router.post(
  "/registration",
  [
    check("fullName", "Username cannot be empty").notEmpty(),
    check("gmail", "Invalid email address").isEmail(),
    check(
      "password",
      "Password must be more than 4 and less than 10 characters"
    ).isLength({ min: 4, max: 10 }),
  ],
  controller.registration
);
router.post("/login", controller.login);
router.get("/users", roleMiddleWare(["ADMIN"]), controller.getUsers);

module.exports = router;
