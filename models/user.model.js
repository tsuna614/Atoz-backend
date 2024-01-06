const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    required: false,
  },
  progression: {
    type: Number,
    required: false,
  },
  score: {
    type: Number,
    required: false,
  },
  profileImage: {
    type: String,
    required: false,
  },
  userStage: {
    type: Number,
    required: true,
  },
  userType: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
