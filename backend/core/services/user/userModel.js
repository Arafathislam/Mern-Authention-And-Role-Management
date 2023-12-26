var mongoose = require('mongoose');

// Define Schema
var userSchema = new mongoose.Schema({
  username: { type: String, require: false, trim: true ,default:''},
  roles: { type: String, require: false, trim: true ,default:''},
  password: { type: String, require: true, trim: true },
  status: {
    type: Boolean,
    required: false,
    default: true,
    message: "status is missing",
  },

  isDeleted: {
    type: Boolean,
    default: false,
    message: "active status is missing",
    required: false,
  },
}, {
  timestamps: true,
});

// Create Model
var UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
