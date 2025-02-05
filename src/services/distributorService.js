const { findDistributor, createDistributor } = require("../repositories/distributorRepository");

async function registerDistributor(distributorDetails) {
  // 1. Check if the distributor with this registration number or email already exists
  const existingDistributor = await findDistributor({
    email: distributorDetails.email,
    distributorRegistrationNumber: distributorDetails.distributorRegistrationNumber,
  });

  // 2. If the distributor exists, throw an error
  if (existingDistributor) {
    throw {
      reason: "Distributor with the given email or registration number already exists",
      statusCode: 400,
    };
  }

  // 3. If the distributor does not exist, create a new distributor
  const newDistributor = await createDistributor({
    distributorName: distributorDetails.distributorName,
    distributorAddress: distributorDetails.distributorAddress,
    contactPersonName: distributorDetails.distributorContactPerson,
    contactNumber: distributorDetails.distributorContactNumber,
    email: distributorDetails.distributorEmail,
    password:distributorDetails.distributorPassword,
    distributorRegNumber: distributorDetails.distributorRegNo,
    gstNumber: distributorDetails.distributorGstNo,
    productsRequiringEthanol: distributorDetails.productsRequiringEthanol,
    monthlyEthanolRequirement: distributorDetails.monthlyEthanolRequirement,
    preferredEthanolType: distributorDetails.preferredEthanolType,
    licensesAndCompliance: distributorDetails.licenses,
    numberOfExistingFactories: distributorDetails.existingFactories,
    
  });

  if (!newDistributor) {
    throw {
      reason: "Something went wrong, cannot create distributor",
      statusCode: 500,
    };
  }

  // 4. Return the details of the created distributor
  return newDistributor;
}

module.exports = {
  registerDistributor,
};
