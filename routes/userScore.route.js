const express = require("express");
const router = express.Router();
const userScoreController = require("../controllers/userScore.controller");
const upload = require("../middleware/multer.middleware");

// get all users score
router.get("/getAllUsersScore", userScoreController.getAllUsersScore);

// find user score by id
router.get("/getUserScoreById/:id", userScoreController.getUserScoreById);

// add 1 user score
router.post("/addUserScore", userScoreController.addUserScore);

// delete user by id
router.delete(
  "/deleteUserScoreById/:id",
  userScoreController.deleteUserScoreById
);

// edit user by id
router.put("/editUserScoreById/:id", userScoreController.editUserScoreById);

// get all user score by user id
router.get(
  "/getAllUserScoreByUserId/:id",
  userScoreController.getAllUserScoreByUserId
);

// // get and post user profile image
// router.post(
//   "/uploadImage/:id",
//   upload.single("image"),
//   userScoreController.uploadImage
// );

// router.get("/getProfileImage/:id", userScoreController.getImage);

module.exports = router;
