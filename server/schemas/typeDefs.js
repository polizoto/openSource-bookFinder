const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
  bookcount: Int
  savedBooks: [Book]
}

  type Book {
    bookId: String!
    authors: [String]
    description: String!
    title: String!
    image: String
}

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: [String], description: String!, title: String!, bookId: String!, image: String): User
    deleteBook(bookId: String!): User
  }
`;

module.exports = typeDefs;