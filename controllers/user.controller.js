const { log } = require("console");
const User = require("../models/user.model");
const path = require("path");
const fs = require("fs");

const userController = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  getUserById: async (req, res, next) => {
    try {
      // THIS IS FIND BY userId, NOT BY _id
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
  getUserByEmail: async (req, res, next) => {
    try {
      const { email } = req.params;
      const user = await User.find({
        email: email,
      });
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  addUser: async (req, res, next) => {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  deleteUserByEmail: async (req, res, next) => {
    try {
      const email = req.params.email;
      await User.deleteMany({ email: email });
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  deleteUserById: async (req, res, next) => {
    console.log("delete by id");
    try {
      const id = req.params.id;
      await User.deleteMany({ userId: id });
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  editUserById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await User.findOneAndUpdate({ userId: id }, req.body, {
        new: true,
      });
      res.status(200).json("Updated successfully");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  addFriend: async (req, res, next) => {
    try {
      const id1 = req.params.id1;
      const id2 = req.params.id2;

      const user1 = await User.find({
        userId: id1,
      });
      await User.findOneAndUpdate(
        { userId: id1 },
        {
          userFriends: [...user1[0].userFriends, id2],
        },
        {
          new: true,
        }
      );

      const user2 = await User.find({
        userId: id2,
      });
      await User.findOneAndUpdate(
        { userId: id2 },
        {
          userFriends: [...user2[0].userFriends, id1],
        },
        {
          new: true,
        }
      );
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  editAllUsers: async (req, res, next) => {
    try {
      await User.updateMany({}, req.body, {
        new: true,
      });
      res.status(200).json("Updated all users successfully");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  removeFriend: async (req, res, next) => {
    try {
      const id1 = req.params.id1;
      const id2 = req.params.id2;

      const user1 = await User.find({
        userId: id1,
      });
      await User.findOneAndUpdate(
        { userId: id1 },
        {
          userFriends: user1[0].userFriends.filter((friend) => friend !== id2),
        },
        {
          new: true,
        }
      );

      const user2 = await User.find({
        userId: id2,
      });
      await User.findOneAndUpdate(
        { userId: id2 },
        {
          userFriends: user2[0].userFriends.filter((friend) => friend !== id1),
        },
        {
          new: true,
        }
      );
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  // uploadImage: async (req, res, next) => {
  //   try {
  //     const image = req.file;
  //     console.log(image);

  //     const id = req.params.id;
  //     const user = await User.findOneAndUpdate(
  //       { userId: id },
  //       {
  //         profileImage: image.buffer,
  //         score: 200,
  //       },
  //       {
  //         new: true,
  //       }
  //     );

  //     res.status(200).json(image);
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // },
  // getImage: async (req, res, next) => {
  //   try {
  //     const id = req.params.id;
  //     const user = await User.findOne({ userId: id });
  //     if (!user) {
  //       return res.status(404).json({ message: "User not found" });
  //     }
  //     if (!user.profileImage) {
  //       return res.status(404).json({ message: "Image not found" });
  //     }
  //     res.set("Content-Type", "image/jpg");
  //     res.status(200).send(user.profileImage);
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // },
};

module.exports = userController;
