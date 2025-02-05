const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const factorySchema = new mongoose.Schema({
    factoryName: {
        type: String,
        required: [true, "Factory Name is required"],
        minlength: [2, "Factory name must be at least 2 characters long"],
        maxlength: [100, "Factory name should be less than or equal to 100 characters"],
        trim: true
    },
    factoryAddress: {
        type: String,
        required: [true, "Factory Address is required"],
        maxlength: [255, "Factory address should be less than or equal to 255 characters"],
        trim: true
    },
    contactPersonName: {
        type: String,
        required: [true, "Contact Person Name is required"],
        minlength: [2, "Contact Person Name must be at least 2 characters long"],
        maxlength: [50, "Contact Person Name should be less than or equal to 50 characters"],
        trim: true
    },
    contactNumber: {
        type: String,
        required: [true, "Contact Number is required"],
        trim: true,
        maxlength: [10, "Contact number should be of length 10"],
        minlength: [10, "Contact number should be of length 10"],
        unique: [true, "Contact number is already in use"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is already in use"],
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password should be provided"],
        minlength: [6, "Password should be minimum 6 character long"]
    },
    factoryRegNumber: {
        type: String,
        required: [true, "Factory Registration Number is required"],
        unique: [true, "Factory Registration Number is already in use"],
        trim: true
    },
    gstNumber: {
        type: String,
        required: [true, "GST Number is required"],
        unique: [true, "GST Number is already in use"],
        trim: true
    },
    targetProduction: {
        type: Number,
        required: [true, "Target Production for the current year (in tons) is required"]
    },
    previousYearProduction: {
        type: Number,
        required: [true, "Previous Year Production (in tons) is required"]
    },
    storageCapacity: {
        type: Number,
        required: [true, "Storage Capacity (in tons) is required"]
    },
    numberOfExistingFarmers: {
        type: Number,
        required: [true, "Number of Existing Farmers is required"]
    },
    typesOfCropsUsed: {
        type: [String], // Array to store multiple crop types
        validate: {
            validator: function (crops) {
                const allowedCrops = [
                    "Sugarcane",
                    "Maize",
                    "Sorghum",
                    "Wheat",
                    "Barley",
                    "Corn",
                    "Banana Pseudo Stem"
                ];
                return crops.every(crop => allowedCrops.includes(crop)); // Validate each selected crop
            },
            message: "Invalid crop type selected. Choose from: Sugarcane, Maize, Sorghum, Wheat, Barley, Corn, Banana Pseudo Stem."
        },
        required: [true, "At least one crop type must be selected"]
    },    
    subsidyOrIncentiveSchemes: {
        type: String,
        required: [true, "Subsidy or Incentive Schemes for Farmers are required"],
        trim: true
    }
}, {
    timestamps: true
});

factorySchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

const Factory = mongoose.model("Factory", factorySchema); // collection
module.exports = Factory;
