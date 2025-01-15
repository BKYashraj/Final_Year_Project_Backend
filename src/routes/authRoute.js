const express = require('express');
const { login } = require('../controllers/authController');
// const { login, logout } = require('../controllers/authController');
// We have to initialise a router object to add routes in a new file
// Routers are used for segregating your routes in different modules
const authRouter = express.Router();
authRouter.post('/login', login);
// authRouter.post('/logout', logout);
// Route maps a client request to a correct controller
module.exports = authRouter; // Exporting the Router For Server