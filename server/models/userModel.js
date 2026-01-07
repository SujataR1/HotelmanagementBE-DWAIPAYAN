const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
{
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Phoneno: {
        type: Number,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    RoleType: {
        type: String,
        required: true,
        enum: ["ADMIN", "CUSTOMER", "STAFF"],
    },
},
{
    timestamps: true
}
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) return next();
    this.Password = await bcrypt.hash(this.Password, 12);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.Password);
};

module.exports = mongoose.model("User", userSchema);
