const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const validateToken = require('../utils/customMiddleware');
const checkRole = require('../utils/roleMiddleware');

// Create a new user
router.post('/user', userController.createUser);
// update the user
router.put('/user/:id' , userController.updateUser);
// delete the user
router.delete('/user/:id' , userController.deleteUser);
//get all user
router.get('/user' , userController.getAllusers);
// login the user
router.post('/login' , userController.login);
// authorization
router.get('/dashboard' , validateToken , checkRole(['Admin' , 'User']) , userController.admindasboard);

module.exports = router