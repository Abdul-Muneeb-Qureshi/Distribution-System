const mongoose = require("mongoose");
const employeeSchema = mongoose.Schema(
  {
    userName: String,
    password: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
