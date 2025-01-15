const { registerFarmer } = require("../services/farmerService");

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

module.exports = {
  createFarmer,
}