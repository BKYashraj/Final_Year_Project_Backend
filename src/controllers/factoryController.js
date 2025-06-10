// controllers/factoryController.js
const mongoose = require("mongoose");
const { registerFactory } = require("../services/factoryService");
const { registerFarmer, AppFactory } = require("../services/farmerService");
const Farmer = require("../schema/farmerSchema.js");
const EthanolLot = require("../schema/EthanolLot.js");
const Transaction = require("../schema/transactionSchema.js"); 
// ✅ Create Factory
async function createFactory(req, res) {
  try {
    const response = await registerFactory(req.body);
    return res.json({
      message: "Successfully registered the factory",
      success: true,
      data: response,
      error: {},
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.reason || "Factory registration failed",
      data: {},
      error,
    });
  }
}

// ✅ Get Approved Farmers by Factory
async function getFarmersByFactory(req, res) {
  try {
    const factoryId_ = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(factoryId_)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Factory ID",
        data: {},
        error: {},
      });
    }

    const factoryObjectId = new mongoose.Types.ObjectId(factoryId_);

    const response = await Farmer.find({
      approvedFactories: {
        $elemMatch: {
          factoryId: factoryObjectId,
          status: "Approved",
        },
      },
    }).limit(20);

    return res.json({
      message: "Successfully fetched farmers",
      success: true,
      data: response,
      error: {},
    });
  } catch (error) {
    console.error("Error fetching farmers:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.reason || "An unexpected error occurred.",
      data: {},
      error,
    });
  }
}

// ✅ Add Ethanol Lot
async function addEthanolLot(req, res) {
  try {
    const { quantity, pricePerLiter, productionDate, location, factoryId, name } = req.body;

    if (!factoryId) {
      return res.status(400).json({
        message: "Factory ID is required",
        success: false,
        data: {},
        error: {},
      });
    }

    const newLot = new EthanolLot({
      factoryId,
      quantity,
      pricePerLiter,
      productionDate,
      location,
      name
    });

    await newLot.save();

    return res.status(201).json({
      message: "Ethanol lot added successfully",
      success: true,
      data: newLot,
      error: {},
    });
  } catch (error) {
    console.error("Error adding ethanol lot:", error);

    return res.status(500).json({
      message: "Error adding lot",
      success: false,
      data: {},
      error,
    });
  }
}


// ✅ Get All Lots for Factory
async function getEthanolLotsByFactory(req, res) {
  try {
    const { factoryId } = req.params;

    if (!factoryId) {
      return res.status(400).json({
        success: false,
        message: "Factory ID is required",
      });
    }

    const lots = await EthanolLot.find({ factoryId }).sort({ productionDate: -1 });

    return res.status(200).json({
      message: "Lots fetched successfully",
      success: true,
      lots,
    });
  } catch (error) {
    console.error("Error fetching lots:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching lots",
      error,
    });
  }
}

async function getPreveousOrders(req, res) {
  try {
    console.log(req.body);
    const factoryId = req.params.id;
    console.log("Farmer ID:", factoryId);

    // Find all payments related to the farmer
    const response = await Transaction.find({ factoryId });

    console.log("Transaction History:", response);

    if (!response || response.length === 0) {
      return res.status(404).json({ message: "No transactions found for this farmer." });
    }

    res.status(200).json({ success: true, transactions: response });
  } catch (error) {
    // Determine the status code to use
    const statusCode = (error.statusCode >= 100 && error.statusCode < 600) ? error.statusCode : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.reason || "An unexpected error occurred.",
      data: {},
      error: error,
    });
  }
}

module.exports = {
  createFactory,
  getFarmersByFactory,
  addEthanolLot,
 getEthanolLotsByFactory,
 getPreveousOrders
};
