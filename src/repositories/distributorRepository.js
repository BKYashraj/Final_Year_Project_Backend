const Distributor = require("../schema/distributorSchema");

async function findDistributor(parameters) {
  try {
    const { email } = parameters;
    const response = await Distributor.findOne({ email });
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function createDistributor(distributorDetails) {
  try {
    const response = await Distributor.create(distributorDetails);
    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  findDistributor,
  createDistributor,
};
