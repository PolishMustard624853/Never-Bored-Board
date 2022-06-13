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
    name: String!, description: String!, address: String!, photo: String!, restaurantId: ID!
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
    addLocation(name: String!, description: String!, address: String!, photo: String!, restaurantId: ID! ): Location
    addComment(locationId: ID!, commentText: String!): Location
    removeLocation(locationId: ID!): Location
    removeComment(locationId: ID!, commentId: ID!): Location
  }
`;

module.exports = typeDefs;
