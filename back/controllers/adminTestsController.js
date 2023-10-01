const Test = require("../models/Test");
const { validationResult } = require("express-validator");

class adminTestsController {
  async postTests(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Error, test not saved", errors });
      }
      const { title, shortDescription } = req.body;

      const test = new Test({
        title,
        shortDescription,
        active: true,
      });
      await test.save();
      return res.json({ message: "Test saved" });
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: "Error, test not saved" });
    }
  }
  async getAllTests(req, res) {
    try {
      const tests = await Test.find();
      if (!tests.length) {
        return res.status(404).json({ message: "There is no tests", errors });
      }
      const testArr = tests.map((item) => {
        return { ...item._doc, id: item._doc._id };
      });

      res.json(testArr);
    } catch (e) {
      console.error(e);
    }
  }
  async getTestById(req, res) {
    try {
      const { id } = req.params;
      const test = await Test.findOne({ _id: id });
      if (!test) {
        return res.status(404).json({ message: "There is no tests", errors });
      }

      res.json({ ...test._doc, id: test._doc._id });
    } catch (e) {
      console.error(e);
    }
  }
  async putTest(req, res) {
    try {
      const { id } = req.params;
      const { title, shortDescription } = req.body;

      const test = await Test.findOneAndUpdate(
        { _id: id },
        { title, shortDescription },
        { new: true }
      );

      if (!test) {
        return res.status(404).json({ message: `Test not found` });
      }

      return res.status(200).json({ message: `Test is changed` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Test Error" });
    }
  }
  async putTestActivation(req, res) {
    try {
      const { id } = req.params;
      const { active } = req.body;

      const test = await Test.findOneAndUpdate(
        { _id: id },
        { active },
        { new: true }
      );

      if (!test) {
        return res.status(404).json({ message: `Test not found` });
      }

      return res.status(200).json({ message: `Test activation changed` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Test Activation Error" });
    }
  }

  async deleteTest(req, res) {
    try {
      const { id } = req.params;

      const result = await Test.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).json({ message: "Item not found" });
      }
      return res.status(204).json({ message: "Test deleted" }).end();
    } catch (e) {
      console.error(e);
    }
  }
}
module.exports = new adminTestsController();
//   const userRole = new Role();
//   const adminRole = new Role({ value: "ADMIN" });
//   await userRole.save();
//   await adminRole.save();
