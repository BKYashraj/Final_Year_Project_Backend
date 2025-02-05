const express = require('express');  // dependencies call
const { createDistributor } = require('../controllers/distributorController');
const distributorRouter = express.Router();

distributorRouter.post('/', createDistributor);

module.exports = distributorRouter;
