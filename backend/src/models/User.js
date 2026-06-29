const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    minlength: [3, "Name must contain at least 3 characters"],
    maxlength: [50, "Name cannot exceed 50 characters"]
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Please provide a valid email"
]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false,
},

verificationToken: {
    type: String,
},

verificationTokenExpire: {
    type: Date,
},
  phone: {
    type: String,
    trim: true,
    match: [/^[6-9]\d{9}$/, "Please enter a valid mobile number"]
},

company: {
    type: String,
    trim: true,
    maxlength: [100, "Company name cannot exceed 100 characters"]
},
createdAt: {
    type: Date,
    default: Date.now
  }
}, 
{
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.getVerificationToken = function () {

    const verificationToken =
        crypto.randomBytes(32).toString("hex");

    this.verificationToken =
        crypto
            .createHash("sha256")
            .update(verificationToken)
            .digest("hex");

    this.verificationTokenExpire =
        Date.now() + 24 * 60 * 60 * 1000;

    return verificationToken;

};


module.exports = mongoose.model('User', userSchema);