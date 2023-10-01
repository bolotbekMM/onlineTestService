const { Schema, model } = require("mongoose");

const Types = new Schema({
  type: { type: "String", unique: true },
});
module.exports = model("Types", Types);
