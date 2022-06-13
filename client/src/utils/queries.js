import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      locations {
        _id
        locationText
        createdAt
      }
    }
  }
`;

export const QUERY_LOCATIONS = gql`
  query getLocations {
    locations {
      _id
      locationText
      locationAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_LOCATION = gql`
  query getSingleLocation($locationId: ID!) {
    location(locationId: $locationId) {
      _id
      locationText
      locationAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query Query {
  me {
    _id
    username
    email
    locations {
      _id
      name
      description
      address
      photo
      restaurantId
    }
  }
}
`;
