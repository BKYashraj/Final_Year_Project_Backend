const { findFarmer, createFarmer } = require("../repositories/farmerRepository");
const Factory = require("../schema/factorySchema");
const Farmer = require("../schema/farmerSchema");

async function registerFarmer(userDetails) {
  // It will create a brand new user in the db
  // 1. We need to check if the user with this email and mobile number already exists or not
  const user = await findFarmer({
    email: userDetails.email,
    mobileNumber: userDetails.mobileNumber,
  });
  // 2. If the user exists, then we will throw an error
  if (user) {
    throw {
      reason: "User with the given email and mobile number already exist",
      statusCode: 400,
    };
  }
  // 3. If the user does not exist, then we will create a new user
  const newUser = await createFarmer({
    email: userDetails.email,
    password: userDetails.password,
    fullName: userDetails.name,
    mobileNumber: userDetails.mobileNumber,
    role: userDetails.role,
    aadharNumber:userDetails.aadhar,
    farmerId:userDetails.farmerId,
    gatNo:userDetails.gatNo,
    state:userDetails.state,
    district:userDetails.district,
    totalLandArea:userDetails.totalLandArea,
    production: Array.isArray(userDetails.cropTypes) ? userDetails.cropTypes : [],
    address:userDetails.address,
    bankAccount: userDetails.bankAccount,
    ifsc:userDetails.ifsc
  });
  if (!newUser) {
    throw {
      reason: "Something went wrong, cannot create user",
      statusCode: 500,
    };
  }
  // 3. retuern the details of created user
  return newUser;
}

async function AppFactory(farmerId) {
  try {
    const farmer = await Farmer.findById(farmerId).populate('approvedFactories.factoryId');

    if (!farmer) {
      return { success: false, message: 'Farmer not found' };
    }

    const factories = farmer.approvedFactories
      .filter(entry => entry.status === 'pending' && entry.factoryId) // safety check
      .map(entry => entry.factoryId);

    return { success: true, factories };
  } catch (error) {
    console.error('Error fetching farmer:', error);
    return { success: false, message: 'Server error' };
  }
}







module.exports = {
  registerFarmer,
  AppFactory
}