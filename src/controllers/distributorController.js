const { registerDistributor } = require("../services/distributorService");

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

module.exports = {
  createDistributor,
};
