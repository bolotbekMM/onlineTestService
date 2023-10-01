const Router = require("express");
const router = new Router();
const controller = require("../controllers/userController");
const { check } = require("express-validator");
const roleMiddleWare = require("../middleware/roleMiddleWare");

// /api/user
// export const getAllTest = () => {
//    return axiosInstance.get('/api/user/tests')
// }
// export const getUserTest = (id) => {
//    return axiosInstance.get(`/api/user/tests/${id}`)
// }
// export const postUserAnswerQuestion = (testId) => {
//    return axiosInstance.post(`/api/user/tests/${testId}`)
// }
// export const postUserTest = (answers) => {
//    return axiosInstance.post(`/api/user/tests/question`, answers)
// }

router.get("/tests", roleMiddleWare(["USER"]), controller.getAllTests);
router.get(
  "/tests/:testId",
  roleMiddleWare(["USER"]),
  controller.getQuestionsById
);

// router.post(
//   "/tests",
//   roleMiddleWare(["ADMIN"]),
//   [check("title", "Title cannot be empty").notEmpty()],
//   controller.postTests
// );
// router.get("/tests/:id", roleMiddleWare(["ADMIN"]), controller.getTestById);
// router.put("/tests/:id", roleMiddleWare(["ADMIN"]), controller.putTest);
// router.put(
//   "/tests/block/:id",
//   roleMiddleWare(["ADMIN"]),
//   controller.putTestActivation
// );
// router.delete("/tests/:id", roleMiddleWare(["ADMIN"]), controller.deleteTest);

module.exports = router;
