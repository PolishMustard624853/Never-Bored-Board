const { AuthenticationError } = require("apollo-server-express");
const { User, Location } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("locations");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("locations");
    },
    locations: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Location.find(params).sort({ createdAt: -1 });
    },
    location: async (parent, { locationId }) => {
      return Location.findOne({ _id: locationId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("locations");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addLocation: async (parent, { name, description, address, photo, restaurantId }, context) => {
      if (context.user) {
        const location = await Location.create({
          name, description, address, photo, restaurantId
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { locations: location._id } }
        );

        return location;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, { locationId, commentText }, context) => {
      if (context.user) {
        return Location.findOneAndUpdate(
          { _id: locationId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeLocation: async (parent, { locationId }, context) => {
      if (context.user) {
        const location = await Location.findOneAndDelete({
          _id: locationId,
          locationAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { locations: location._id } }
        );

        return location;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeComment: async (parent, { locationId, commentId }, context) => {
      if (context.user) {
        return Location.findOneAndUpdate(
          { _id: locationId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
