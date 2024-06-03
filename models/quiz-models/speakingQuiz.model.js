const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  sentence: {
    type: String,
    required: true,
  },
});

const Quiz = mongoose.model("speakingQuizzes", quizSchema);

module.exports = Quiz;
