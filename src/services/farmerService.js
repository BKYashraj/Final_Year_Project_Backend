const { findFarmer, createFarmer } = require("../repositories/farmerRepository");

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
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    mobileNumber: userDetails.mobileNumber,
    role: userDetails.role,
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

module.exports = {
  registerFarmer,
}