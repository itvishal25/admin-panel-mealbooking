const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  enabled: {
    type: Boolean,
    required: true,
    default: true,
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports.User = User;
// firstName
// lastName
// email
// mobile
// profilePic
//
