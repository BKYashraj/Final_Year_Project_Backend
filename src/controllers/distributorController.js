const { registerDistributor } = require("../services/distributorService");
const EthanolLot = require('../schema/EthanolLot.js'); // Assuming this model exists
const Factory = require('../schema/factorySchema.js');

async function createDistributor(req, res) {
  try {
    const response = await registerDistributor(req.body);
    return res.json({
      message: "Successfully registered the distributor",
      success: true,
      data: response,
      error: {},
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.reason,
      data: {},
      error: error,
    });
  }
}

async function getAllEthanolLots(req, res) {
  try {
    const lots = await EthanolLot.find(); // No populate here
    res.status(200).json({
      success: true,
      message: "Fetched all ethanol lots",
      data: { lots }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching lots",
      error: error.message
    });
  }
}

module.exports = {
  createDistributor,
  getAllEthanolLots
};



