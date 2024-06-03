const express = require("express");
const router = express.Router();
const quizController = require("../controllers/speakingQuiz.controller");
const path = require("path");
const upload = require("../middleware/multer.middleware");
const { speechToText } = require("../api/test.js");

const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  organization: process.env.ORGANIZATION,
  project: process.env.PROJECT,
  apiKey: process.env.API_KEY,
});

// get all quizzes
router.get("/getAllQuizzes", quizController.getAllQuizzes);

// get quiz by id
router.get("/getQuizById/:id", quizController.getQuizById);

// add 1 quiz
router.post("/addQuiz", quizController.addQuiz);

// delete quiz by id
router.delete("/deleteQuizById/:id", quizController.deleteQuizById);

// get all quizzes with condition
router.post(
  "/getAllQuizzesWithCondition",
  quizController.getAllQuizzesWithCondition
);

router.post("/speech-to-text", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    var generatedText = await speechToText(path.extname(req.file.originalname));

    console.log(generatedText);

    generatedText = generatedText.replace(/(\r\n|\n|\r)/gm, "");

    // send generatedText as json
    res.status(200).json({ userAnswer: generatedText });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
