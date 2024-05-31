const express = require("express");
const router = express.Router();
const quizController = require("../controllers/listeningQuiz.controller");

// get all quizzes
router.get("/getAllQuizzes", quizController.getAllQuizzes);

// get quiz by id
router.get("/getQuizById/:id", quizController.getQuizById);

// add 1 quiz
// router.post("/addQuiz", quizController.addQuiz);
router.post("/addQuiz", quizController.addQuiz);

// delete quiz by id
router.delete("/deleteQuizById/:id", quizController.deleteQuizById);

// get all quizzes with condition
router.post(
  "/getAllQuizzesWithCondition",
  quizController.getAllQuizzesWithCondition
);

// generate quiz
router.post("/generateQuiz", quizController.generateQuiz);

module.exports = router;
