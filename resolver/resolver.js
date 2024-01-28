import Author from "../models/Author.js";
import Book from "../models/Book.js";
const resolvers = {
  Query: {
    // GET endpoint/books
    books: async (parent, args, context, info) => {
      return await context.mongoDataMethods.getAllBooks();
    },
    // GET endpoint/media
    mediaList: async (parent, args, context, info) => {
      return await context.mongoDataMethods.getAllBooks();
    },
    // GET endpoint/book/:id
    book: async (parent, args, context) => {
      return await context.mongoDataMethods.getBook(args.id);
    },
    // GET endpoint/authors
    authors: async (parent, args, context) => {
      return await context.mongoDataMethods.getAllAuthors();
    },
    // GET endpoint/authors/:id
    author: async (parent, args, context) => {
      return await context.mongoDataMethods.getAuthor(args.id);
    },
  },
  Mutation: {
    // POST endpoint/author
    createAuthor: async (parent, { payload }) => {
      const newAuthor = new Author(payload);
      return await newAuthor.save();
    },
    // POST endpoint/book
    createBook: async (parent, args) => {
      const newBook = new Book(args);
      return await newBook.save();
    },
    // PUT endpoint/book/:id
    updateBook: async (parent, args, context) => {
      return await context.mongoDataMethods.updateBook(args.id, {
        name: args.name,
        genre: args.genre,
      });
    },
  },
  MediaResult: {
    __resolveType(obj, context, info) {
      if (obj.name) {
        return "Book";
      }
      if (obj.title) {
        return "Movie";
      }
      return null;
    },
  },
  Book: {
    author: async (parent, args, context) => {
      return await context.mongoDataMethods.getAuthor(parent.authorId);
    },
  },
  Author: {
    books: async (parent, args, context) => {
      return await context.mongoDataMethods.getBooksByAuthor(parent.id);
    },
  },
};

export default resolvers;
