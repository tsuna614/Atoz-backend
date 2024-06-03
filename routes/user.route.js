const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const upload = require("../middleware/multer.middleware");

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

// delete user by id
router.delete("/deleteUserById/:id", userController.deleteUserById);

// edit user by id
router.put("/editUserById/:id", userController.editUserById);

// add friends between 2 users
router.put("/addFriend/:id1/:id2", userController.addFriend);

// edit all users
router.put("/editAllUsers", userController.editAllUsers);

// remove a friend of both users from their userFriends
router.put("/removeFriend/:id1/:id2", userController.removeFriend);

// get and post user profile image
router.post("/uploadImage", upload.single("image"), userController.uploadImage);

// router.get("/getProfileImage/:id", userController.getImage);

module.exports = router;
