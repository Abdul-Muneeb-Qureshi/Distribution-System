const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employeeController");
const validateToken = require("../utils/customMiddleware");
const checkRole = require("../utils/roleMiddleware");

// Create a new user
router.post("/employee", employeeController.createEmployee);
// update the user
router.put("/employee/:id", userController.updateEmployee);
// delete the user
router.delete("/employee/:id", userController.deleteEmployee);
//get all user
router.get("/employee", userController.getAllemployees);
// login the user
router.post("/login", userController.login);
// authorization
router.get(
  "/dashboard",
  validateToken,
  checkRole(["Admin", "User"]),
  employeeController.admindasboard
);

module.exports = router;
