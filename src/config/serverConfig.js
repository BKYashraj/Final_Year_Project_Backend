const dotenv = require('dotenv')
dotenv.config()  // This line read .env file line by line

// Here we are exporting all the env variables that project uses
module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY
}