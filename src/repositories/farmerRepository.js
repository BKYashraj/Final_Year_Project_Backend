const Farmer = require("../schema/farmerSchema");

async function findFarmer(parameters) {
  try {
    const response = await Farmer.findOne(parameters);
    console.log("Res",response)
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

// this is for Factory when any new farmer register it shows on factory layout 
// then that factory will accept request which is this approvedFactories
// It add corresponding factory to that email farmer as 
// with pending status 

async function AppFarmer(farmerId, factoryId) {
  // Find the farmer by ID
  console.log("Yashraj");
  console.log(farmerId, factoryId);
  const farmer = await Farmer.findById(farmerId);

  // Check if the farmer exists
  if (!farmer) {
    const error = new Error('Farmer not found');
    error.statusCode = 404;
    throw error;
  }

  // Check if the factory is already in the approvedFactories array
  const alreadyExists = farmer.approvedFactories.some(
    (factory) => factory.factoryId.toString() === factoryId
  );

  if (alreadyExists) {
    const error = new Error('Factory already added!');
    error.statusCode = 400;
    throw error;
  }

  // Add the new factory to the approvedFactories array
  farmer.approvedFactories.push({
    factoryId,
    status: 'pending', // default status
  });

  // Save the updated farmer document
  await farmer.save();

  return farmer;
}


module.exports = {
  findFarmer,
  createFarmer,
  AppFarmer
}