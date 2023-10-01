const File = require("../models/File");
const sharp = require("sharp");
const fs = require("fs");

class loadFileController {
  async uploadFile(req, res) {
    try {
      const { buffer } = req.file;
      const newFile = new File({ file: buffer });
      const savedFile = await newFile.save();

      return res.json({ id: savedFile._id });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error!" });
    }
  }
  async downloadFile(req, res) {
    try {
      const { id } = req.params;
      const findedFile = await File.findOne({ _id: id }).lean();

      if (!findedFile) {
        return res.status(404).json({ message: "File not found" });
      }

      const fileBinary = findedFile.file;
      const fileBuffer = Buffer.from(fileBinary.buffer);
      res.setHeader("Content-Disposition", "attachment; filename=image.jpg");
      res.end(fileBuffer);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  }

  async deleteFile(req, res) {
    try {
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  }
}
module.exports = new loadFileController();
//   const userRole = new Role();
//   const adminRole = new Role({ value: "ADMIN" });
//   await userRole.save();
//   await adminRole.save();
