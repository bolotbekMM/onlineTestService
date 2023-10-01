const Router = require("express");
const router = new Router();
const controller = require("../controllers/adminTestsController");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleWare");
const roleMiddleWare = require("../middleware/roleMiddleWare");

router.post(
  "/tests",
  roleMiddleWare(["ADMIN"]),
  [check("title", "Title cannot be empty").notEmpty()],
  controller.postTests
);
router.get("/tests", roleMiddleWare(["ADMIN"]), controller.getAllTests);
router.get("/tests/:id", roleMiddleWare(["ADMIN"]), controller.getTestById);
router.put("/tests/:id", roleMiddleWare(["ADMIN"]), controller.putTest);
router.put(
  "/tests/block/:id",
  roleMiddleWare(["ADMIN"]),
  controller.putTestActivation
);
router.delete("/tests/:id", roleMiddleWare(["ADMIN"]), controller.deleteTest);

module.exports = router;
