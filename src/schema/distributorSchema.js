const mongoose = require('mongoose');

const distributorSchema = new mongoose.Schema({
    distributorName: {
        type: String,
        required: [true, "Distributor Name is required"],
        minlength: [2, "Distributor Name must be at least 2 characters long"],
        maxlength: [100, "Distributor Name should be less than or equal to 100 characters"],
        trim: true
    },
    distributorAddress: {
        type: String,
        required: [true, "Distributor Address is required"],
        maxlength: [255, "Distributor Address should be less than or equal to 255 characters"],
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
        maxlength: [10, "Contact Number should be of length 10"],
        minlength: [10, "Contact Number should be of length 10"],
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
    distributorRegNumber: {
        type: String,
        required: [true, "Distributor Registration Number is required"],
        unique: [true, "Distributor Registration Number is already in use"],
        trim: true
    },
    gstNumber: {
        type: String,
        required: [true, "GST Number is required"],
        unique: [true, "GST Number is already in use"],
        trim: true
    },
    productsRequiringEthanol: {
        type: [String], // Array to store products like 'Petroleum', 'Pharmaceuticals', etc.
        required: [true, "Products Requiring Ethanol are required"]
    },
    monthlyEthanolRequirement: {
        type: Number,
        required: [true, "Monthly Ethanol Requirement is required"]
    },
    preferredEthanolType: {
        type: [String], // Array to store products like 'Petroleum', 'Pharmaceuticals', etc.
        required: [true, "Products Requiring Ethanol are required"]
    },
    licensesAndCompliance: {
        exciseLicense: { type: Boolean, required: [true, "Excise License status is required"] },
        pollutionControlLicense: { type: Boolean, required: [true, "Pollution Control License status is required"] },
        otherLicenses: { type: String, trim: true }
    },
    numberOfExistingFactories: {
        type: Number,
        required: [true, "Number of Existing Factories is required"]
    },
}, {
    timestamps: true
});

distributorSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

const Distributor = mongoose.model("Distributor", distributorSchema); // collection
module.exports = Distributor;
