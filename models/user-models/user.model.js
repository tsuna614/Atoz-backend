const mongoose = require("mongoose");
// const Stage = require("./stage.model");

const stageSchema = mongoose.Schema({
  star: {
    type: Number,
    required: true,
  },
  clearTime: {
    type: Number,
    required: true,
  },
});

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
    required: true,
  },
  userStage: {
    type: [[stageSchema]],
    required: true,
  },
  userType: {
    type: String,
    required: false,
  },
  userFriends: {
    type: Array,
    required: true,
  },
  // userState: {
  //   type: String,
  //   required: true,
  // },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
