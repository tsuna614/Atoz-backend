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
});

const ReadingMultipleChoice = mongoose.model(
  "readingMultipleChoice",
  quizSchema
);

module.exports = ReadingMultipleChoice;
