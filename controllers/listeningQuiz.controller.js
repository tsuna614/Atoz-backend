const Quiz = require("../models/quiz-models/listeningQuiz.model");
const { generateQuiz } = require("../api/test.js");

const quizController = {
  getAllQuizzes: async (req, res, next) => {
    try {
      //   openAPI();
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
      //   const response = await openAPI();
      //   const quiz = await Quiz.create(JSON.parse(response));
      const quiz = await Quiz.create(req.body);
      res.status(200).json({ message: "Successfully added quiz" });
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
  getAllQuizzesWithCondition: async (req, res, next) => {
    try {
      var difficulty = 1;
      if (req.body.userProgression >= 200) {
        difficulty = 2;
      }
      if (req.body.userProgression >= 500) {
        difficulty = 3;
      }
      if (req.body.userProgression >= 1000) {
        difficulty = 4;
      }
      const quizzes = await Quiz.find({
        language: req.body.language,
        difficulty: difficulty,
      });
      res.status(200).json(quizzes);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  generateQuiz: async (req, res, next) => {
    try {
      const response = await generateQuiz(req.body.content);
      console.log(response);
      const newQuiz = {
        fullSentence: JSON.parse(response[0]).fullSentence,
        answers: JSON.parse(response[0]).answers,
        publicId: response[1],
      };
      const quiz = await Quiz.create(newQuiz);
      res.status(200).json(newQuiz);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = quizController;
