const employee = require("../models/employee");
const jwt = require("jsonwebtoken");
const { param } = require("../routes/employeeRoute");

async function createEmployee(req, res) {
  try {
    const newEmployee = await employee.create(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateEmployee(req, res) {
  try {
    const { id } = req.params;
    const updateEmployee = await employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteEmployee(req, res) {
  try {
    const { id } = req.params;
    await employee.findByIdAndRemove(id);
    res.sendStatus(204).json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllEmployees(req, res) {
  try {
    const cards = await employee.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function login(req, res, next) {
  const { employeeName, password } = req.body;
  try {
    const employee = await employee.findOne({ employeeName });
    if (!employee) return res.status(404).json({ error: "employee not found" });
    if (employee.password != password)
      return res.status(401).json({ error: "Invalid Credentials" });
    var token = GenerateToken(employee);
    return res.status(200).json({
      message: "Logged in successfully",
      employeeName: employeeName,
      employeeid: employee.id,
      token: token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

function GenerateToken(employee) {
  const payload = {
    role: employee.role,
    id: employee._id,
  };
  const token = jwt.sign(payload, "adsfasdfjkh$#asdfasdf.adsfxc");
  return token;
}

async function admindasboard(req, res) {
  return res.status(200).json({ message: "Welcome to admin Dashboard" });
}

module.exports = {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  login,
  admindasboard,
};
