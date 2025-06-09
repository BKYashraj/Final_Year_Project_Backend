const { registerFarmer, AppFactory } = require("../services/farmerService");
const Farmer = require("../schema/farmerSchema.js"); 
const { AppFarmer } = require("../repositories/farmerRepository.js");

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






module.exports = {
  createFarmer,
  getAllFarmers,
  approveFarmer,
  getApprovedFactory,
}