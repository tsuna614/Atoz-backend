const mongoose = require("mongoose");

const userScoreSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const UserScore = mongoose.model("userScore", userScoreSchema);

module.exports = UserScore;
