const { Schema, model } = require("mongoose");

const File = new Schema({
  file: { type: Buffer, required: true },
});
module.exports = model("File", File);
