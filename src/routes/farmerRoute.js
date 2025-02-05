const express = require('express');  // dependancies call 
const { createFarmer, getAllFarmers } = require('../controllers/farmerController');
const farmerRouter = express.Router()

farmerRouter.post('/',createFarmer);
farmerRouter.get('/getFarmer',getAllFarmers);


module.exports = farmerRouter;