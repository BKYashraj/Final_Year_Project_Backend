const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRY } = require("../config/serverConfig");

// Import repositories for different user roles
const { findFarmer } = require("../repositories/farmerRepository");
const { findFactory } = require("../repositories/factoryRepository");
const { findDistributor } = require("../repositories/distributorRepository");

// Function to find user dynamically based on role
async function findUser(authDetails) {
  const { email, role } = authDetails; // Accept role as part of authDetails
  console.log(role);
  // Check based on the provided role
  if (role === "Farmer") {
    const user = await findFarmer({ email });
    if (user) return { user, role: "Farmer" };
  } 
  else if (role === "Ethanol Producing Factory") {
    const user = await findFactory({ email });
    console.log("reach here");
    if (user) return { user, role: "Ethanol Producing Factory" };
  } 
  else if (role === "Distributors") {
    const user = await findDistributor({ email });
    if (user) return { user, role: "Distributors" };
  }

  return null; // User not found
}

// Generic Login Function for All Users
async function loginUser(authDetails) {
  const { email, password, role } = authDetails;

  // Find user from any of the collections
  console.log("authDetails",email);
  const userData = await findUser({ email, role });
  console.log(userData);
  if (!userData) {
    throw {
      statusCode: 404,
      message: "User does not exist",
    };
  }

  const { user } = userData;

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw {
      statusCode: 401,
      message: "Invalid Password",
    };
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      email: user.email,
      id: user._id,
      role: role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );

  return {
    token,
    userRole: role,
    userData: {
      email: user.email,
      id: user._id,
      name: user.firstName || user.factoryName || user.distributorName, // Dynamic name field
    },
  };
}

module.exports = {
  loginUser,
};
