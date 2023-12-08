const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");

router.get("/", (req, res, next) => {
  res.render("home.ejs");
});

// get all books
router.get("/getAllBooks", bookController.getAllBooks);

// find book by id
router.get("/getBookById/:id", bookController.getBookById);

// find book by name
router.get("/getBookByName/:name", bookController.getBookByName);

// add 1 book
router.post("/addBook", bookController.addBook);

// delete book by id
router.delete("/deleteBookById/:id", bookController.deleteBookById);

// delete all books by name
router.delete("/deleteBookByName/:name", bookController.deleteBookByName);

module.exports = router;
