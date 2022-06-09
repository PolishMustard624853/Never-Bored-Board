import { gql } from "@apollo/client";

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
        _id
        username
      }
    }
  }
`;

export const ADD_LOCATION = gql`
  mutation addLocation($locationText: String!) {
    addLocation(locationText: $locationText) {
      _id
      locationText
      locationAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($locationId: ID!, $commentText: String!) {
    addComment(locationId: $locationId, commentText: $commentText) {
      _id
      locationText
      locationAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
