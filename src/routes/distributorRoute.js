const express = require('express');  // dependencies call
const { createDistributor, getAllEthanolLots } = require('../controllers/distributorController');
const distributorRouter = express.Router();

distributorRouter.post('/', createDistributor);
distributorRouter.get('/getAllEthanolLots', getAllEthanolLots);

module.exports = distributorRouter;
