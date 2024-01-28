import Book from "../models/Book.js";
import Author from "../models/Author.js";

const mongoDataMethods = {
  getAllBooks: async () => await Book.find(),
  getAllAuthors: async () => await Author.find(),
  getBook: async (id) => await Book.findById(id),
  getAuthor: async (id) => await Author.findById(id),
  getBooksByAuthor: async (authorId) => await Book.find({ authorId }),
  updateBook: async (id, data) =>
    await Book.findByIdAndUpdate(id, data, { returnDocument: "after" }),
};

export default mongoDataMethods;
