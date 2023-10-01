const Router = require("express");
const router = new Router();
const multer = require("multer");
const controller = require("../controllers/loadFileController");
const roleMiddleWare = require("../middleware/roleMiddleWare");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/upload",
  roleMiddleWare(["ADMIN"]),
  upload.single("file"),
  controller.uploadFile
);
router.get("/upload/:id", controller.downloadFile);
router.delete("/upload/:id", roleMiddleWare(["ADMIN"]), controller.deleteFile);

module.exports = router;
