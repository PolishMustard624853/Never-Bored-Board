const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const locationSchema = new Schema({
  locationText: {
    type: String,
    required: "You need to leave a location!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  locationAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Location = model("Location", locationSchema);

module.exports = Location;
