const mongoose = require("mongoose");
const ReadingMultipleChoice = require("./readingMultipleChoiceQuiz.model");

const quizSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  paragraphsList: {
    type: Array,
    required: true,
  },
  questionsList: {
    // reference to the ReadingMultipleChoice model
    type: Array,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    required: true,
  },
});

const ReadingQuiz = mongoose.model("readingQuiz", quizSchema);

module.exports = ReadingQuiz;
