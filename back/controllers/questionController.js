const Question = require("../models/Question");
const { validationResult } = require("express-validator");
const Types = require("../models/Types");

class questionController {
  async postQuestion(req, res) {
    try {
      console.log(req, "tttttttttttttttttttttt");
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "question error", errors });
      }
      const { type } = req.body;
      const checkType = await Types.findOne({ type: type });
      if (!checkType) {
        return res.status(400).json({ message: "question type not found" });
      }

      const postQuestions = new Question(req.body);
      await postQuestions.save();

      return res.json({ message: "Question successfully saved" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  }
  async getQuestionsByTestId(req, res) {
    try {
      const { testId } = req.params;
      const questions = await Question.find({ testId }).lean();
      if (!questions || questions.length === 0) {
        const question = await Question.findOne({ _id: testId }).lean();
        if (!question) {
          return res
            .status(400)
            .json({ message: "No questions found for the given id" });
        }

        return res.json({ ...question, id: question._id });
      }
      const questionsArr = questions.map((item) => {
        const { _id, ...rest } = item;
        return { ...rest, id: _id };
      });

      res.json(questionsArr);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  }
  async deleteQuestionById(req, res) {
    try {
      const { id } = req.params;
      const deleteQuestion = await Question.findByIdAndDelete(id);
      if (!deleteQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }
      return res.status(204).json({ message: "Question deleted" }).end();
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  }
  async putQuestionById(req, res) {
    try {
      const { id } = req.params;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "question error", errors });
      }
      const { type } = req.body;
      const checkType = await Types.findOne({ type: type });
      if (!checkType) {
        return res.status(400).json({ message: "question type not found" });
      }

      const selectedQuestion = await Question.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true }
      );
      if (!selectedQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }
      return res.status(204).json({ message: "Question changed" }).end();
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  }
  async putQuestionActivationById(req, res) {
    try {
      const { id } = req.params;
      const { active } = req.body;
      const selectedQuestion = await Question.findOneAndUpdate(
        { _id: id },
        { active },
        { new: true }
      );
      if (!selectedQuestion) {
        return res.status(404).json({ message: "Question not found" });
      }
      return res
        .status(204)
        .json({ message: "Question activation changed" })
        .end();
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Server error" });
    }
  }
}
module.exports = new questionController();
//   const adminRole = new Role({ value: "ADMIN" });
//   await adminRole.save();
