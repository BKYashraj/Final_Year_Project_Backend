// Load environment variables
require('dotenv').config();
const abi = require('../blockchain/contractABI.json');

const { ethers } = require('ethers');

// Environment variables
const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;


// ABI of the smart contract
const contractABI = abi.abi;

// Connect to the Ethereum network
const provider = new ethers.JsonRpcProvider(SEPOLIA_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);

// Function to automate block creation
async function createBlock(data) {
    try {
        const tx = await contract.createTransaction(data);
        console.log(`Transaction sent: ${tx.hash}`);

        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);

        return receipt;
    } catch (error) {
        console.error("Error creating block:", error);
        throw error;
    }
}

// Export the createBlock function
module.exports = { createBlock };
