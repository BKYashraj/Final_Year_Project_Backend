const express = require('express');  // dependancies call 
const { createFarmer } = require('../controllers/farmerController');
const farmerRouter = express.Router()

farmerRouter.post('/',createFarmer);
module.exports = farmerRouter;