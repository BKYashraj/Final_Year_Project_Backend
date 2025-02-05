const { findFactory, createFactory } = require("../repositories/factoryRepository");

async function registerFactory(factoryDetails) {
  // 1. Check if the factory with this registration number or email already exists
  const existingFactory = await findFactory({
    email: factoryDetails.email,
    factoryRegistrationNumber: factoryDetails.factoryRegistrationNumber,
  });

  // 2. If the factory exists, throw an error
  if (existingFactory) {
    throw {
      reason: "Factory with the given email or registration number already exists",
      statusCode: 400,
    };
  }

  // 3. If the factory does not exist, create a new factory
  const newFactory = await createFactory({
    factoryName: factoryDetails.factoryName,
    factoryAddress: factoryDetails.factoryAddress,
    contactPersonName: factoryDetails.factoryContactPerson,
    contactNumber: factoryDetails.factoryContactNumber,
    email: factoryDetails.factoryEmail,
    password:factoryDetails.factoryPassword,
    factoryRegNumber: factoryDetails.factoryRegNo,
    gstNumber: factoryDetails.factoryGstNo,
    targetProduction: factoryDetails.factoryTargetProduction,
    previousYearProduction: factoryDetails.factoryPreviousProduction,
    storageCapacity: factoryDetails.storageCapacity,
    numberOfExistingFarmers: factoryDetails.existingFarmers,
    // newFarmerRequirement: factoryDetails.newFarmerRequirement,
    // production: Array.isArray(userDetails.cropTypes) ? userDetails.cropTypes : [],
    typesOfCropsUsed: Array.isArray(factoryDetails.factoryCropTypes) ? factoryDetails.factoryCropTypes : [],
    subsidyOrIncentiveSchemes: factoryDetails.subsidySchemes,
  });

  if (!newFactory) {
    throw {
      reason: "Something went wrong, cannot create factory",
      statusCode: 500,
    };
  }

  // 4. Return the details of the created factory
  return newFactory;
}

module.exports = {
  registerFactory,
};
