const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employeeController");
const validateToken = require("../utils/customMiddleware");
const checkRole = require("../utils/roleMiddleware");

// Create a new user
router.post("/employee", employeeController.createEmployee);
// update the user
router.put("/employee/:id", employeeController.updateEmployee);
// delete the user
router.delete("/employee/:id", employeeController.deleteEmployee);
//get all user
router.get("/employee", employeeController.getAllEmployees);
// login the user
router.post("/login", employeeController.login);
//log table
router.get("/logs", employeeController.getLogs);
router.post("/logs", employeeController.createLog);

// authorization
router.get(
  "/dashboard",
  validateToken,
  checkRole(["Admin", "User"]),
  employeeController.admindasboard
);

module.exports = router;
