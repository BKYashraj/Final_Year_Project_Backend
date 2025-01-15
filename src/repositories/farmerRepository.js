const Farmer = require("../schema/farmerSchema");

async function findFarmer(parameters) {
  try {
    const response = await Farmer.findOne({ ...parameters });
    return response;
  } catch (error) {
    console.log(error);
  }
}
async function createFarmer(userDetails) {
  try {
    const response = await Farmer.create(userDetails);
    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  findFarmer,
  createFarmer
}