const Router = require("express");
const router = new Router();
const controller = require("../controllers/questionController");
const { check } = require("express-validator");
const roleMiddleWare = require("../middleware/roleMiddleWare");

router.post(
  "/question",
  [
    check("title", "title cannot be empty").notEmpty(),
    check("testId", "testId cannot be empty").notEmpty(),
    check("type", "type cannot be empty").notEmpty(),
    check("duration", "duration cannot be empty").notEmpty(),
  ],
  roleMiddleWare(["ADMIN"]),
  controller.postQuestion
);
router.get(
  "/question/:testId",
  roleMiddleWare(["ADMIN"]),
  controller.getQuestionsByTestId
);
router.delete(
  "/question/:id",
  roleMiddleWare(["ADMIN"]),
  controller.deleteQuestionById
);
router.put(
  "/question/:id",
  [
    check("title", "title cannot be empty").notEmpty(),
    check("testId", "testId cannot be empty").notEmpty(),
    check("type", "type cannot be empty").notEmpty(),
    check("duration", "duration cannot be empty").notEmpty(),
  ],
  roleMiddleWare(["ADMIN"]),
  controller.putQuestionById
);
router.put(
  "/question/block/:id",

  roleMiddleWare(["ADMIN"]),
  controller.putQuestionActivationById
);
// router.post("/login", controller.login);

module.exports = router;
