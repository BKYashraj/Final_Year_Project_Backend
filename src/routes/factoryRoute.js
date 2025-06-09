// src/routes/factoryRoute.js
const express = require('express');  // dependencies call
const { createFactory, getFarmersByFactory } = require('../controllers/factoryController');
const { addEthanolLot,getEthanolLotsByFactory } = require('../controllers/factoryController'); // Confirm this is the right file
const factoryRouter = express.Router();
const authenticate = require('../middlewares/authMiddleware');
// Register new factory
factoryRouter.post('/', createFactory);

// Get approved farmers
factoryRouter.get('/getApprovedFarmer/:id', getFarmersByFactory);

// Add ethanol lot
factoryRouter.post('/addLot',addEthanolLot);
factoryRouter.get("/getLots/:factoryId", getEthanolLotsByFactory);


module.exports = factoryRouter;
