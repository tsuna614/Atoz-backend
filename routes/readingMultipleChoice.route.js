const express = require("express");
const router = express.Router();
const quizController = require("../controllers/readingMultipleChoice.controller");

// get pages
router.get("/", quizController.getQuizPage);

router.get("/add-quiz", (req, res, next) => {
  res.render("add-quiz.ejs");
});

// get all quizzes
router.get("/getAllQuizzes", quizController.getAllQuizzes);

// get quiz by id
router.get("/getQuizById/:id", quizController.getQuizById);

// // find quiz by email
// router.get("/getQuizByEmail/:email", quizController.getQuizByEmail);

// add 1 quiz
router.post("/addQuiz", quizController.addQuiz);

// delete quiz by id
router.delete("/deleteQuizById/:id", quizController.deleteQuizById);

// delete quiz button
router.post("/deleteQuizButton", quizController.deleteQuizButton);

module.exports = router;
