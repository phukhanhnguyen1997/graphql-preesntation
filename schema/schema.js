import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Author {
    id: String
    name: String
    dob: Int
    books: [Book]
    gender: Gender
  }

  type Book {
    id: String
    name: String
    genre: String
    author: Author
  }

  type Movie {
    title: String
    director: String
  }

  union MediaResult = Book | Movie

  type Query {
    books: [Book]
    authors: [Author]
    book(id: String!): Book
    author(id: String!): Author
    authorByGender(gender: Gender!): Author
    mediaList: [MediaResult]
  }

  type Mutation {
    createAuthor(payload: createAuthorInput): Author
    createBook(name: String, genre: String, authorId: String): Book
    updateBook(id: String, name: String, genre: String): Book
  }

  input createAuthorInput {
    name: String
    dob: Int
  }

  enum Gender {
    MALE
    FEMALE
  }

  type Subscription {
    createBook: Book
    hello: String
  }
`;

export default typeDefs;
