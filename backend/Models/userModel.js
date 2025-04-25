const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: ["true", "Please add an username"],
    },
    email: {
      type: String,
      required: ["true", "Please add an email"],
    },
    password: {
      type: String,
      required: ["true", "Please add a password"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
