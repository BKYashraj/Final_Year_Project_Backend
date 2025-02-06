const Factory = require("../schema/factorySchema");

async function findFactory(parameters) {
  try {
    console.log("response",parameters)
    const { email } = parameters;
    const response = await Factory.findOne({email});
    console.log("response",response)
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
