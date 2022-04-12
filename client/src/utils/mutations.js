import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK=gql`
    mutation saveBook(
        $authors: [String]
        $description: String!
        $title: String!
        $bookId: String!
        $image: String
    ) {
        saveBook(
            authors: $authors
            description: $description
            title: $title
            bookId: $bookId
            image: $image
        ) {
            _id
        }
    }
`;

export const DELETE_BOOK = gql`
mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      _id
      username
    }
  }
`;
