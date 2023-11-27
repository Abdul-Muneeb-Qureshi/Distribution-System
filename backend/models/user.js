const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    email: String,
    password: String,
    role: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

