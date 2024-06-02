const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const upload = require("../middleware/multer.middleware");
const { Readable } = require("stream");
const path = require("path");

const { speechToText } = require("../api/test.js");

//////

const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  organization: process.env.ORGANIZATION,
  project: process.env.PROJECT,
  apiKey: process.env.API_KEY,
});

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

router.post("/upload-audio", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    // // // Create a readable stream from the buffer
    // // const readableStream = new Readable();
    // // readableStream.push(req.file.buffer);
    // // readableStream.push(null);

    // // Use the buffer to perform speech-to-text
    // const transcription = await speechToText(readableStream);

    // console.log(transcription.text);
    // res.status(200).send({ transcription: transcription.text });

    speechToText(path.extname(req.file.originalname));

    res.status(200).send("Audio uploaded successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

router.get("/test", (req, res) => {
  speechToText();
  res.status(200).send("Test successful");
});

// router.get("/getProfileImage/:id", userController.getImage);

function bufferToStream(buffer) {
  const readable = new Readable();
  readable._read = () => {}; // _read is required but you can noop it
  readable.push(buffer);
  readable.push(null);
  return readable;
}

module.exports = router;
