const express = require('express');  // dependancies call 
const { createFarmer, getAllFarmers, approveFarmer, getApprovedFactory } = require('../controllers/farmerController');
const farmerRouter = express.Router()

farmerRouter.post('/',createFarmer);
farmerRouter.get('/getFarmer',getAllFarmers);

farmerRouter.post('/approve-factory',approveFarmer);

farmerRouter.get('/:id',getApprovedFactory);


module.exports = farmerRouter;