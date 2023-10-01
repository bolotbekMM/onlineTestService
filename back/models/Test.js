const { Schema, model } = require("mongoose");

const Test = new Schema({
  title: { type: "String", required: true },
  shortDescription: { type: "String" },
  active: { type: Boolean, required: true },
});
module.exports = model("Test", Test);
