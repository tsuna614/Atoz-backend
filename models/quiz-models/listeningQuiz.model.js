const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  fullSentence: {
    type: String,
    required: true,
  },
  answers: {
    type: [String],
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
});

const Quiz = mongoose.model("listeningQuizzes", quizSchema);

module.exports = Quiz;
