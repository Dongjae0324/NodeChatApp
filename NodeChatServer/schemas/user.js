const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  profileImage: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  pw: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
