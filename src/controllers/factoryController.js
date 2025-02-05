const { registerFactory } = require("../services/factoryService");

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

module.exports = {
  createFactory,
};
