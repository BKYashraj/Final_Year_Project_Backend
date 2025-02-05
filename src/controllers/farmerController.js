const { registerFarmer } = require("../services/farmerService");
const Farmer = require("../schema/farmerSchema.js"); 

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
    const farmers = await Farmer.find({}).limit(12); // ✅ Use the model to query
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



module.exports = {
  createFarmer,
  getAllFarmers
}