const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const farmerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        minlength: [5, "First name must be atleast 5 character long"],
        lowercase: true,
        trim: true, // if the user gives extra spaces then it will automatically remove it
        maxlength: [20, "First name should be less than or equal to 20 characters"]
    },
    lastName: {
        type: String,
        required: [true, "First Name is required"],
        minlength: [5, "First name must be atleast 5 character long"],
        lowercase: true,
        trim: true, // if the user gives extra spaces then it will automatically remove it
        maxlength: [20, "First name should be less than or equal to 20 characters"]
    },
    mobileNumber: {
        type: String,
        trim: true,
        maxlength: [10, "Phone number should be of length 10"],
        minlength: [10, "Phone number should be of length 10"],
        unique: [true, "Phone number is already in use"],
        required: [true, "Phone number should be provided"]
    },
    
    email: {
        type: String,
        trim: true,
        required: [true, "Email should be provoided"],
        unique: [true, "Email is already in use"],
        match:  [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password should be provided"],
        minlength: [6, "Password should be minimum 6 character long"]
    },
    role: {
        type: String,
        enum: ["Farmer","Ethanol Producing Factory","ADMIN"],
        default: "USER"
    },
    // address: {
    //     type: String
    // }
}, {
    timestamps: true
});

farmerSchema.pre('save', async function () {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
});

const Farmer = mongoose.model("Farmer", farmerSchema); // collection
module.exports = Farmer;