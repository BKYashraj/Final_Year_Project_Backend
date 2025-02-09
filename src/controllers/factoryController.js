const { registerFactory } = require("../services/factoryService");
const { registerFarmer, AppFactory } = require("../services/farmerService");
const Farmer = require("../schema/farmerSchema.js"); 
const { AppFarmer } = require("../repositories/farmerRepository.js");


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
    return res.status(error.statusCode).json({
      success: false,
      message: error.reason,
      data: {},
      error: error,
    });
  }
}


async function getFarmersByFactory(req, res) {
  try {
    console.log(req.body);
    const factoryId_ = req.params.id;
    // const factoryObjectId = new mongoose.Types.ObjectId(factoryId_);

    console.log(factoryId_)
    const response = await Farmer.find({
      "approvedFactories.factoryId": factoryId_
  }).limit(20);



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
  createFactory,
  getFarmersByFactory,
};
