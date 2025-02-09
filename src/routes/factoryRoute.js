const express = require('express');  // dependencies call
const { createFactory, getFarmersByFactory } = require('../controllers/factoryController');
const factoryRouter = express.Router();

factoryRouter.post('/', createFactory);

factoryRouter.get('/getApprovedFarmer/:id', getFarmersByFactory);
// farmerRouter.get('/:id',getApprovedFactory);



module.exports = factoryRouter;
