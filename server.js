const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const bookRoute = require("./routes/book.route");
const userRoute = require("./routes/user.route");
const quizRoute = require("./routes/quiz.route");
const readingRoute = require("./routes/readingQuiz.route");
const multipleChoiceRoute = require("./routes/readingMultipleChoice.route");
const userScoreRoute = require("./routes/userScore.route");

mongoose.connect(
  "mongodb+srv://thedarkspiritaway:ci0ijEu14OB36epX@atoz.rwfanqk.mongodb.net/Atoz-API?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.on("open", () => {
  console.log("Connected to database");
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use("/v1/book", bookRoute);
app.use("/v1/user", userRoute);
app.use("/v1/quiz", quizRoute);
app.use("/v1/readingQuiz", readingRoute);
app.use("/v1/readingMultipleChoice", multipleChoiceRoute);
app.use("/v1/userScore", userScoreRoute);

app.get("/", (req, res, next) => {
  res.render("home.ejs");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
