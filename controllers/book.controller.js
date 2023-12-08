const Book = require("../models/book.model");

const bookController = {
  getAllBooks: async (req, res, next) => {
    try {
      const books = await Book.find({});
      res.status(200).json(books);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  getBookById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);
      res.status(200).json(book);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  getBookByName: async (req, res, next) => {
    try {
      const { name } = req.params;
      const book = await Book.find({
        name: name,
      });
      res.status(200).json(book);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  addBook: async (req, res, next) => {
    try {
      const book = await Book.create(req.body);
      res.status(200).json(book);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  deleteBookById: async (req, res, next) => {
    try {
      const id = req.params.id;
      await Book.findByIdAndDelete(id);
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  deleteBookByName: async (req, res, next) => {
    try {
      const name = req.params.name;
      // var ids = db.collection1.find({}, { "item.key": 1 }).toArray();
      // db.collection2.deleteMany({ _id: { $nin: ids } });
      // var data = await Book.find({ name: name });
      // var ids = data.map(function (item) {
      //   return item._id;
      // });
      await Book.deleteMany({ name: name });
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = bookController;
