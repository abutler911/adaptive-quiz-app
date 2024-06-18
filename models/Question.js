const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: String,
  difficulty: { type: Number, default: 1 },
  timesShown: { type: Number, default: 0 },
});

module.exports = mongoose.model("Question", questionSchema);
