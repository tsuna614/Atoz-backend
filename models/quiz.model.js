const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: Array,
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  quizType: {
    type: String,
    required: true,
  },
});

const Quiz = mongoose.model("quizzes", quizSchema);

module.exports = Quiz;
