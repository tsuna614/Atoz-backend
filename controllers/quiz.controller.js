const Quiz = require("../models/quiz-models/quiz.model");

const quizController = {
  getQuizPage: async (req, res, next) => {
    try {
      const quizzes = await Quiz.find({});
      res.render("quizzes.ejs", { quizzes: quizzes });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  getAllQuizzes: async (req, res, next) => {
    try {
      const quizzes = await Quiz.find({});
      res.status(200).json(quizzes);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  getQuizById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const quiz = await Quiz.findById(id);
      res.status(200).json(quiz);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  addQuiz: async (req, res, next) => {
    try {
      const quiz = await Quiz.create(req.body);
      res.status(200);
      res.redirect("/v1/quiz/add-quiz");
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  deleteQuizById: async (req, res, next) => {
    try {
      const id = req.params.id;
      await Quiz.findByIdAndDelete(id);
      res
        .status(200)
        .json({ message: `Successfully deleted quiz by id ${id}` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  deleteQuizButton: async (req, res, next) => {
    try {
      const id = req.body.quizId;
      await Quiz.findByIdAndDelete(id);
      res.status(200);
      res.redirect("/v1/quiz");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = quizController;
