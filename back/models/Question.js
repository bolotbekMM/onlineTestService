const { Schema, model } = require("mongoose");

const wordSchema = new Schema({
  word: { type: String, required: true },
  correct: { type: Boolean, required: true },
  id: { type: String, required: true },
});

const optionSchema = new Schema({
  word: { type: String, required: true },
  correct: { type: Boolean, required: true },
  id: { type: String, required: true },
  file: String,
});

const questionSchema = new Schema({
  title: { type: String, required: true },
  testId: { type: String, required: true },
  duration: { type: String, required: true },
  type: { type: String, ref: "Type", required: true },
  active: { type: Boolean, default: true },
  correctAnswer: String,
  passage: String,
  attempt: { type: Number, min: 0, max: 10 },
  statement: String,
  countOfWords: { type: Number, min: 0, max: 100 },
  questionStatement: String,
  file: String,
  words: [wordSchema],
  options: [optionSchema],
});

module.exports = model("Question", questionSchema);

// const { Schema, model } = require("mongoose");

// const Questions = new Schema({
//   title: { type: String, required: true },
//   testId: { type: String, required: true },
//   duration: { type: String, required: true },
//   type: { type: String, ref: "Type", required: true },
//   correctAnswer: String,
//   passage: String,
//   attempt: Number,
//   statement: String,
//   countOfWords: Number,
//   questionStatement: String,
//   file: Buffer,
//   words: [
//     {
//       word: { type: String, required: true },
//       correct: { type: Boolean, required: true },
//       id: { type: String, required: true },
//     },
//   ],
//   options: [
//     {
//       word: { type: String, required: true },
//       correct: { type: Boolean, required: true },
//       id: { type: String, required: true },
//       file: { type: Buffer, required: true },
//     },
//   ],
// });

// module.exports = model("Questions", Questions);
