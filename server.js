const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const bookRoute = require("./routes/book.route");
const userRoute = require("./routes/user.route");
const quizRoute = require("./routes/quiz.route");

mongoose.connect(process.env.DATABASE_URL);
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

app.get("/", (req, res, next) => {
  res.render("home.ejs");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
