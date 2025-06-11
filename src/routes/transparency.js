// routes/transparency.js

const express = require('express');
const router = express.Router();
const Farmer = require('../schema/farmerSchema');
const Factory = require('../schema/factorySchema');
const Transparency = require('../schema/transparencyDistributorToFactory');
const Distributor = require('../schema/distributorSchema')

// collection that stores distributorId with factoryId
router.post('/fecth', async (req, res) => {
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

module.exports = router;