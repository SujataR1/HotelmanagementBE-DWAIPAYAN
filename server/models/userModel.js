const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const phoneSchema = new mongoose.Schema({
    countryCode: { type: String, required: true },
    number: { type: String, required: true }
});

const addressSchema = new mongoose.Schema({
    line1: { type: String, required: true },
    line2: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true }
});

const preferenceSchema = new mongoose.Schema({
    language: { type: String, required: true },
    currency: { type: String, required: true },
    smokingRoom: { type: Boolean, required: true }
});

const emergencyContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    phone: phoneSchema
});

const userSchema = new mongoose.Schema({
    userId: { type: String, default: uuidv4, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {type: String,required: true,unique: true,lowercase: true,trim: true,index: true},
    phone: phoneSchema,
    password: { type: String, required: true },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["MALE", "FEMALE", "OTHER"] },
    address: addressSchema,
    preferences: preferenceSchema,
    corporateBooking: {
        companyName: { type: String },
        gstNumber: { type: String }
    },
    emergencyContact: emergencyContactSchema,
    accessibility: {
        specialAssistanceRequired: { type: Boolean },
        assistanceDetails: { type: String }
    },
    roleType: { type: String, enum: ["ADMIN", "CUSTOMER", "STAFF"], default: "CUSTOMER" }
}, { timestamps: true });

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
