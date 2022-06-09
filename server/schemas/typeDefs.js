const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    locations: [Location]!
  }

  type Location {
    _id: ID
    locationText: String
    locationAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    locations(username: String): [Location]
    location(locationId: ID!): Location
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addLocation(locationText: String!): Location
    addComment(locationId: ID!, commentText: String!): Location
    removeLocation(locationId: ID!): Location
    removeComment(locationId: ID!, commentId: ID!): Location
  }
`;

module.exports = typeDefs;
