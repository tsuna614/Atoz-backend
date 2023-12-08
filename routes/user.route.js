const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// get all users
router.get("/getAllUsers", userController.getAllUsers);

// find user by id
router.get("/getUserById/:id", userController.getUserById);

// find user by email
router.get("/getUserByEmail/:email", userController.getUserByEmail);

// add 1 user
router.post("/addUser", userController.addUser);

// delete user by email
router.delete("/deleteUserByEmail/:email", userController.deleteUserByEmail);

// edit user by id
router.put("/editUserById/:id", userController.editUserById);

module.exports = router;
