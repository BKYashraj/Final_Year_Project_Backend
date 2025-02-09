const express = require('express');
const Razorpay = require('razorpay');
const Payment = require("../schema/paymentSchema");
const Transaction = require("../schema/transactionSchema");
const Farmer = require("../schema/farmerSchema");
const crypto = require('crypto');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const paymentRouter = express.Router();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

// Predefined Razorpay Test Fund Account ID
const TEST_FUND_ACCOUNT_ID = "fa_JYnsQb2WTPb1Pz";
const TEST_ACCOUNT_NUMBER = "2323230076543210"; // Razorpay Test Account Number

// ROUTE 1: Get Payment Details
paymentRouter.get('/get-payment', async (req, res) => {
    res.json("Payment Details");
});

// ROUTE 2: Create Order API
paymentRouter.post('/order', async (req, res) => {
    const { amount, factoryId, farmerId } = req.body;

    try {
        const options = {
            amount: Number(amount * 100), // Convert to paisa
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        razorpayInstance.orders.create(options, async (error, order) => {
            if (error) {
                return res.status(500).json({ message: "Something Went Wrong!" });
            }

            const transaction = new Transaction({
                factoryId,
                farmerId,
                amount,
                status: "pending",
                paymentId: order.id,
            });

            await transaction.save();
            res.status(200).json({ data: order });
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

// ROUTE 3: Verify Payment & Automate Payout
paymentRouter.post('/verify', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, farmerId, factoryId } = req.body;

    try {
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (expectedSign !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid Signature" });
        }

        const payment = new Payment({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            farmerId,
            factoryId
        });

        await payment.save();


        const transaction = await Transaction.findOne({ paymentId: razorpay_order_id });
        if (transaction) {
            transaction.status = "paid";
            await transaction.save();

            // Automate Payout
            await processPayout(transaction);
        }

        res.json({ message: "Payment Verified & Payout Initiated" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

// Create Fund Account for Farmer
async function createFundAccount(farmer) {
    if (process.env.RAZORPAY_KEY_ID.startsWith("rzp_test_")) {
        console.log("🛑 Skipping Fund Account Creation in Test Mode...");
        return TEST_FUND_ACCOUNT_ID;
    }

    const payload = {
        contact: {
            name: farmer.fullName,
            email: farmer.email || "noemail@example.com",
            contact: farmer.mobileNumber || "0000000000",
            type: "vendor"
        },
        account_type: "bank_account",
        bank_account: {
            name: farmer.fullName,
            account_number: farmer.bankAccount,
            ifsc: farmer.ifsc
        }
    };

    try {
        const response = await axios.post("https://api.razorpay.com/v1/fund_accounts", payload, {
            auth: {
                username: process.env.RAZORPAY_KEY_ID,
                password: process.env.RAZORPAY_SECRET
            }
        });

        console.log("✅ Fund Account Created:", response.data);
        return response.data.id; // Store this ID for future payouts
    } catch (error) {
        console.error("❌ Error Creating Fund Account:", error.response?.data || error.message);
        return null;
    }
}

// Process Payout
async function processPayout(transaction) {
    try {
        const farmer = await Farmer.findOne({ _id: transaction.farmerId });

        if (!farmer) {
            console.error("❌ Farmer not found");
            return;
        }

        // Use test fund account in test mode
        let fundAccountId = process.env.RAZORPAY_KEY_ID.startsWith("rzp_test_") 
            ? TEST_FUND_ACCOUNT_ID
            : farmer.fundAccountId;

        if (!fundAccountId) {
            console.log("Creating a new Fund Account for farmer...");
            fundAccountId = await createFundAccount(farmer);

            if (!fundAccountId) {
                console.error("❌ Failed to create Fund Account. Cannot proceed with payout.");
                return;
            }

            // Store fundAccountId in farmer document
            await Farmer.findByIdAndUpdate(farmer._id, { fundAccountId });
        }

        // Use a predefined test Razorpay account number in test mode
        const accountNumber = process.env.RAZORPAY_KEY_ID.startsWith("rzp_test_") 
            ? TEST_ACCOUNT_NUMBER
            : process.env.COMPANY_ACCOUNT_NUMBER;

        // Construct the payout payload
        const payoutPayload = {
            account_number: accountNumber,
            fund_account_id: fundAccountId,
            amount: transaction.amount * 100,
            currency: "INR",
            mode: "IMPS",
            purpose: "payout",
            queue_if_low_balance: true,
            reference_id: `payout_${Date.now()}`,
            narration: "Payment to farmer",
        };

        // Send payout request
        const response = await axios.post(
            "https://api.razorpay.com/v1/payouts",
            payoutPayload,
            {
                auth: {
                    username: process.env.RAZORPAY_KEY_ID,
                    password: process.env.RAZORPAY_SECRET,
                },
            }
        );

        // Update transaction status
        await Transaction.findByIdAndUpdate(transaction._id, { status: "paid" });

        console.log("✅ Payout Successful:", response.data);
    } catch (err) {
        console.error("❌ Payout Error:", err.response?.data || err.message);
    }
}

module.exports = paymentRouter;
