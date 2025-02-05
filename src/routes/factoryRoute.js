const express = require('express');  // dependencies call
const { createFactory } = require('../controllers/factoryController');
const factoryRouter = express.Router();

factoryRouter.post('/', createFactory);



module.exports = factoryRouter;
