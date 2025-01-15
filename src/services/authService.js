const { findFarmer } = require("../repositories/farmerRepository");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRY } = require("../config/serverConfig");
async function loginUser(authDetails) {
  
  const email = authDetails.email;
  const plainPassword = authDetails.password;
  // 1. We need to check if the user with this email already exists or not
  const user = await findFarmer({ email });
  if (!user) {
    throw {
      statusCode: 404,
      message: "User does not exist",
    };
  }
  // 2. If the user is found we need to compare plianIncomingPassword with hashed Password
  const isPasswordValid = await bcrypt.compare(plainPassword, user.password);
  if (!isPasswordValid) {
    throw {
      statusCode: 401,
      message: "Invalid Password",
    };
  }
  const userRole = user.role ? user.role : "Farmer";
  // 3. If the password is valid, then we need to return the user object
  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      role: userRole,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );
  console.log("Token is ",token);
  return {
    token,
    userRole,
    userData: {
      email: user.email,
      firstName: user.firstName,
    },
  };
}
module.exports = {
  loginUser,
};