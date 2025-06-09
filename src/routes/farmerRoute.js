const express = require('express');  // dependancies call 
const { createFarmer, getAllFarmers, approveFarmer2, approveFarmer, getApprovedFactory, getAllApprovedFarmers } = require('../controllers/farmerController');
const farmerRouter = express.Router()

farmerRouter.post('/',createFarmer);

// this is for farmer login send proposal
farmerRouter.get('/approvedFarmer/:id',getAllApprovedFarmers);

farmerRouter.get('/getFarmer',getAllFarmers);

farmerRouter.post('/approve-factory',approveFarmer);

// this is for factor send request to factory level 2
farmerRouter.put('/farmerapprovefactory/:id',approveFarmer2);

farmerRouter.get('/:id',getApprovedFactory);


module.exports = farmerRouter;