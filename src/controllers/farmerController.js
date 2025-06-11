const { registerFarmer, AppFactory } = require("../services/farmerService");
const Farmer = require("../schema/farmerSchema.js"); 
const { AppFarmer, approveFarmerFactory } = require("../repositories/farmerRepository.js");
const Transaction = require("../schema/transactionSchema.js"); 
const FacToFar =  require("../schema/transparancyFactoryToFarmer.js"); 

async function createFarmer(req, res) {
  try {
    const response = await registerFarmer(req.body);
    
    return res.json({
      message: "Successfully registered the farmer",
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


async function getAllFarmers(req, res) {
  try {
    const farmers = await Farmer.find({
      approvedFactories: { $size: 0 }  // only farmers with no approved factories
    }).limit(20); // ✅ Use the model to query
    res.status(200).send({
      success: true,
      countTotal: farmers.length,
      message: "All Farmers",
      farmers,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting farmers",
      error: error.message,
    });
  }
}

const mongoose = require('mongoose');
const transactionSchema = require("../schema/transactionSchema.js");

async function getAllApprovedFarmers(req, res) {
  try {
  
// const factoryId = '6845c290a374c6530dd6e925'; // Use req.body.factoryId or req.user._id if needed
const factoryId = req.params.id;
// console.log("abcdefg",factory)
const farmers2 = await Farmer.find({
  approvedFactories: {
    $elemMatch: {
      factoryId: new mongoose.Types.ObjectId(factoryId),
      status: "approved"
    }
  }
}).limit(20);


    res.status(200).send({
      success: true,
      countTotal: farmers2.length,
      message: "Approved Farmers for this Factory",
      farmers2,
    });
  } catch (error) {
    console.error("Error in getAllApprovedFarmers:", error);
    res.status(500).send({
      success: false,
      message: "Error in getting approved farmers",
      error: error.message,
    });
  }
}



async function approveFarmer(req, res) {
  try {
    const { farmerId, factoryId } = req.body;
    console.log("check it ",farmerId,factoryId);
    const response = await AppFarmer(farmerId,factoryId);
    return res.json({
      message: "Successfully Done",
      success: true,
      data: response,
      error: {},
    });
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

async function approveFarmer2(req, res) {
  try {
    const farmerId = req.params.id;
    console.log("check it ",farmerId);
    const response = await approveFarmerFactory(farmerId);
    return res.json({
      message: "Successfully Done",
      success: true,
      data: response,
      error: {},
    });
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

async function getApprovedFactory(req, res) {
  try {
    console.log(req.body);
    const farmerId = req.params.id;
    console.log(farmerId);
    const response = await AppFactory(farmerId);
    console.log(response);
    return res.json({
      message: "Successfully Done",
      success: true,
      data: response,
      error: {},
    });
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

async function getPreveousOrders(req, res) {
  try {
    console.log(req.body);
    const farmerId = req.params.id;
    console.log("Farmer ID:", farmerId);

    // Find all payments related to the farmer
    const response = await Transaction.find({ farmerId });

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


async function getPreveousOrders(req, res) {
  try {
    console.log(req.body);
    const farmerId = req.params.id;
    console.log("Farmer ID:", farmerId);

    // Find all payments related to the farmer
    const response = await Transaction.find({ farmerId });

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


async function getRecentOrders(req, res) {
  try {
    console.log(req.body);
    const farmerId = req.params.id;
    console.log("Farmer ID:", farmerId);

    // Find all payments related to the farmer
    const response = await FacToFar.find({ farmerId });

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
  createFarmer,
  getAllFarmers,
  approveFarmer,
  getApprovedFactory,
  getAllApprovedFarmers,
  approveFarmer2,
  getPreveousOrders,
  getRecentOrders
}