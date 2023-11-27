// employeeController.js
const employee = require("../models/employee");
const jwt = require("jsonwebtoken");
const Log = require("../models/log");
const EmployeeAudit = require("../models/employeeAudit"); // Import the EmployeeAudit model
// const { log } = require("console");

async function logToDatabase(functionName, message, level = "info") {
  try {
    const logEntry = new Log({
      functionName,
      message,
      level,
    });
    await logEntry.save();
  } catch (error) {
    console.error("Error logging to database:", error);
  }
}

async function getLogs(req, res) {
  try {
    const logs = await log.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
//this function is just to make logtable visible in database
const createLog = async (req, res) => {
  try {
    // Create a log record
    const newlog = new log({
      ...req.body, // Include other log-related attributes here
    });
    await newlog.save();

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding the log." });
  }
};

async function createEmployee(req, res) {
  try {
    const newEmployee = await employee.create(req.body);
    await logToDatabase(
      "createEmployee",
      `Employee created successfully: ${newEmployee}`
    );
    res.status(201).json(newEmployee);
  } catch (error) {
    // Log the error before sending the response
    await logToDatabase(
      "createEmployee",
      `Error creating employee: ${error}`,
      "error"
    );
    console.error("Error creating employee:", error);

    // Send an appropriate response to the client
    if (error.name === "ValidationError") {
      res.status(400).json({
        error: "Validation error. Please provide all required fields.",
      });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

async function updateEmployee(req, res) {
  try {
    const { id } = req.params;

    // Find the existing employee data before the update
    const existingEmployee = await employee.findById(id);

    // Update the employee with the new data
    const updateEmployee = await employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // Log the update of the employee in the audit table
    await EmployeeAudit.create({
      action: "UPDATE",
      employeeId: id,
      oldData: existingEmployee.toObject(), // Save old data
      newData: updateEmployee.toObject(), // Save new data
      olddata: existingEmployee.toObject(),
      newdata: updateEmployee.toObject(), // Include the updated employee data

      // performedBy: req.user.id,  Assuming you have user information in the request
    });

    await logToDatabase(
      "updateEmployee",
      `Employee updated successfully: ${updateEmployee}`
    );

    res.json(updateEmployee);
  } catch (err) {
    await logToDatabase(
      "updateEmployee",
      `Error updating employee: ${err}`,
      "error"
    );
    res.status(500).json({ error: err.message });
  }
}

async function deleteEmployee(req, res) {
  try {
    const { id } = req.params;
    await employee.findByIdAndRemove(id);
    await logToDatabase(
      "deleteEmployee",
      `Employee deleted successfully with id: ${id}`
    );
    res.sendStatus(204).json({ message: "Deleted Successfully" });
  } catch (err) {
    await logToDatabase(
      "deleteEmployee",
      `Error deleting employee: ${err}`,
      "error"
    );
    res.status(500).json({ error: err.message });
  }
}

async function getAllEmployees(req, res) {
  try {
    const employees = await employee.find();
    await logToDatabase(
      "getAllEmployees",
      "Retrieved all employees successfully"
    );
    res.json(employees);
  } catch (err) {
    await logToDatabase(
      "getAllEmployees",
      `Error retrieving employees: ${err}`,
      "error"
    );
    res.status(500).json({ error: err.message });
  }
}

async function login(req, res, next) {
  const { employeeName, password } = req.body;
  try {
    const employeeData = await employee.findOne({ employeeName });
    if (!employeeData) {
      await logToDatabase(
        "login",
        `Employee not found with name: ${employeeName}`,
        "error"
      );
      return res.status(404).json({ error: "Employee not found" });
    }
    if (employeeData.password !== password) {
      await logToDatabase("login", "Invalid Credentials", "error");
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    const token = GenerateToken(employeeData);
    await logToDatabase("login", `Logged in successfully: ${employeeName}`);
    return res.status(200).json({
      message: "Logged in successfully",
      employeeName: employeeName,
      employeeid: employeeData.id,
      token: token,
    });
  } catch (err) {
    await logToDatabase("login", `Error logging in: ${err}`, "error");
    res.status(500).json({ error: err.message });
  }
}

function GenerateToken(employeeData) {
  const payload = {
    role: employeeData.role,
    id: employeeData._id,
  };
  const token = jwt.sign(payload, "adsfasdfjkh$#asdfasdf.adsfxc");
  return token;
}

async function admindasboard(req, res) {
  await logToDatabase("admindasboard", "Welcome to admin Dashboard");
  return res.status(200).json({ message: "Welcome to admin Dashboard" });
}

module.exports = {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  login,
  admindasboard,
  getLogs,
  createLog,
};
