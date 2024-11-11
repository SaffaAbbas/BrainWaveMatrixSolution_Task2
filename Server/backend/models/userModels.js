
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt"); // Use bcryptjs for better compatibility
const jwt=require("jsonwebtoken")
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed more than 30 characters"],
        minLength: [4, "Name cannot be less than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        select: false,
        minLength: [8, "Password cannot be less than 8 characters"]
    },
    confirmPassword: {
        type: String,
        required: [true, "Please Enter Your Confirm Password"],
        select: false,
        minLength: [8, "Confirm Password cannot be less than 8 characters"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    isActive: { type: Boolean, default: true },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});


userSchema.pre("save", async function (next) {
    // Check if password or confirmPassword is modified
    if (this.isModified("password")) {
        // Validate password and confirmPassword match if `confirmPassword` exists
        if (this.confirmPassword && this.password !== this.confirmPassword) {
            return next(new Error("Passwords do not match"));
        }

        // Hash the password
        this.password = await bcrypt.hash(this.password, 10);

        // Remove confirmPassword from the document
        this.confirmPassword = undefined;
    }
    next();
});

// Method to generate JWT token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRETKEY, {
        expiresIn: '30d' // Default to 1 hour if not specified
    });
};



// Method to compare password
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Method to generate reset password token
userSchema.methods.getResetPasswordToken = function () {
    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash the reset token using SHA-256
    const hash = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Save hashed token to user document and return the original token
    this.resetPasswordToken = hash;
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes

    return resetToken;
};

module.exports = mongoose.model("user", userSchema);
