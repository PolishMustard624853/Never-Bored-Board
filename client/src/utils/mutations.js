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

export const SAVE_RESTAURANT = gql`
  mutation Mutation($name: String!, $description: String!, $address: String!, $photo: String!, $restaurantId: ID!) {
  addLocation(name: $name, description: $description, address: $address, photo: $photo, restaurantId: $restaurantId) {
    _id
    name
    description
    address
    photo
    restaurantId
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
