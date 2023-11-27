// employeeAudit.js
const mongoose = require("mongoose");

const employeeAuditSchema = new mongoose.Schema({
  action: {
    type: String,
    enum: ["CREATE", "UPDATE", "DELETE"],
    required: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  olddata: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },

  newdata: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("EmployeeAudit", employeeAuditSchema);
