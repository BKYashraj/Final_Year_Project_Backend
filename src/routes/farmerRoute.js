const express = require('express');  // dependancies call 
const { createFarmer, getAllFarmers, approveFarmer2, getPreveousOrders, approveFarmer, getApprovedFactory, getAllApprovedFarmers, getRecentOrders } = require('../controllers/farmerController');
const farmerRouter = express.Router()
const Farmer = require('../schema/farmerSchema');
const Factory = require('../schema/factorySchema');
const Transparency = require('../schema/transparencyDistributorToFactory');
const Distributor = require('../schema/distributorSchema')

farmerRouter.post('/',createFarmer);

// this is for farmer login send proposal
farmerRouter.get('/approvedFarmer/:id',getAllApprovedFarmers);

farmerRouter.get('/getFarmer',getAllFarmers);

farmerRouter.post('/approve-factory',approveFarmer);

farmerRouter.get('/PreveousOrders/:id', getPreveousOrders);
// this is for factor send request to factory level 2
farmerRouter.put('/farmerapprovefactory/:id',approveFarmer2);

farmerRouter.get('/:id',getApprovedFactory);


farmerRouter.get('/recentOrder/:id', getRecentOrders);


farmerRouter.post('/fecth', async (req, res) => {
  const { farmerId, factoryId } = req.body;

  try {
    if (!farmerId || !factoryId) {
      return res.status(400).json({ message: 'Missing IDs' });
    }

    // Replace with your DB logic
    const farmer = await Farmer.findById(farmerId);
    const factory = await Factory.findById(factoryId);
    const distributor = await Distributor.findOne({ factoryId });

    if (!farmer || !factory || !distributor) {
      return res.status(404).json({ message: 'One or more entities not found' });
    }

    res.json({
      farmer,
      factory,
      distributor
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = farmerRouter;