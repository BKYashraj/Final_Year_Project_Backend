const Factory = require("../schema/factorySchema");

async function findFactory(parameters) {
  try {
    const response = await Factory.findOne({ ...parameters });
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function createFactory(factoryDetails) {
  try {
    const response = await Factory.create(factoryDetails);
    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  findFactory,
  createFactory,
};
