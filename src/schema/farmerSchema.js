const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const farmerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full Name is required"],
        minlength: [5, "Full name must be at least 5 characters long"],
        lowercase: true,
        trim: true,
        maxlength: [40, "Full name should be less than or equal to 40 characters"]
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true
    },
    mobileNumber: {
        type: String,
        trim: true,
        minlength: [10, "Phone number should be 10 digits"],
        maxlength: [10, "Phone number should be 10 digits"],
        unique: [true, "Phone number is already in use"],
        required: [true, "Phone number is required"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is required"],
        unique: [true, "Email is already in use"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password should be at least 6 characters long"]
    },
    aadharNumber: {
        type: String,
        required: [true, "Aadhar Number is required"],
        unique: [true, "Aadhar Number already exists"],
        match: [/^\d{12}$/, "Aadhar Number must be exactly 12 digits"]
    },
    farmerId: {
        type: String,
        required: [true, "Farmer ID (Krishi Card, PM-Kisan Registration Number, etc.) is required"],
        unique: true,
        trim: true
    },
    gatNo: {
        type: String,
        required: [true, "Gat No (Land/Plot Number) is required"],
        trim: true
    },
    production: {
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
                return crops.every(crop => allowedCrops.includes(crop)); // Ensure all crops are valid
            },
            message: "Invalid crop type selected. Choose from: Sugarcane, Maize, Sorghum, Wheat, Barley, Corn, Banana Pseudo Stem."
        },
        required: [true, "At least one production crop type is required"]
    },    
    state: {
        type: String,
        required: [true, "State is required"],
        trim: true
    },
    district: {
        type: String,
        required: [true, "District is required"],
        trim: true
    },
    totalLandArea: {
        type: Number,
        required: [true, "Total Land Area (in Acres) is required"],
        min: [0.1, "Land area must be at least 0.1 acres"]
    },
    role: {
        type: String,
        enum: ["Farmer"," Factory","Distributers","ADMIN1"],
        default: "USER"
    },
}, {
    timestamps: true
});

// Hash password before saving to the database
farmerSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

const Farmer = mongoose.model("Farmer", farmerSchema); // Collection
module.exports = Farmer;
