const { log } = require("console");
const User = require("../models/userScore.model");
const path = require("path");
const fs = require("fs");

const userController = {
  getAllUsersScore: async (req, res, next) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  getUserScoreById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.find({
        _id: id,
      });
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  getAllUserScoreByUserId: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.find({
        userId: id,
      });
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  // getUserScoreByEmail: async (req, res, next) => {
  //   try {
  //     const { email } = req.params;
  //     const user = await User.find({
  //       email: email,
  //     });
  //     res.status(200).json(user);
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json({ message: err.message });
  //   }
  // },
  addUserScore: async (req, res, next) => {
    try {
      // const user = await User.create(req.body);
      // date field is the current date
      const user = await User.create({
        userId: req.body.userId,
        score: req.body.score,
        date: Date.now(),
      });
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  deleteUserScoreById: async (req, res, next) => {
    try {
      const id = req.params;
      await User.deleteMany({ _id: id });
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  editUserScoreById: async (req, res, next) => {
    try {
      const id = req.params;
      const user = await User.findOneAndUpdate({ userId: id }, req.body, {
        new: true,
      });
      res.status(200).json("Updated successfully");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = userController;
