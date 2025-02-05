const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRY } = require("../config/serverConfig");

// Import repositories for different user roles
const { findFarmer } = require("../repositories/farmerRepository");
const { findFactory } = require("../repositories/factoryRepository");
const { findDistributor } = require("../repositories/distributorRepository");

// Function to find user dynamically based on role
async function findUser(authDetails) {
  const email = authDetails.email;

  // Check in each collection
  let user = await findFarmer({ email });
  if (user) return { user, role: "Farmer" };

  user = await findFactory({ email });
  if (user) return { user, role: "Ethanol Producing Factory" };

  user = await findDistributor({ email });
  if (user) return { user, role: "Distributor" };

  return null; // User not found in any collection
}

// Generic Login Function for All Users
async function loginUser(authDetails) {
  const { email, password } = authDetails;

  // Find user from any of the collections
  const userData = await findUser({ email });
  if (!userData) {
    throw {
      statusCode: 404,
      message: "User does not exist",
    };
  }

  const { user, role } = userData;

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
      id: user.id,
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
      name: user.firstName || user.factoryName || user.distributorName, // Dynamic name field
    },
  };
}

module.exports = {
  loginUser,
};
