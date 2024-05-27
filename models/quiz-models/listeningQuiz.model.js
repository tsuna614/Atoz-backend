const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const Quiz = mongoose.model("quizzes", quizSchema);

module.exports = Quiz;
