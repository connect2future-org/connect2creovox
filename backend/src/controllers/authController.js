const User = require("../models/User");
const jwt = require("jsonwebtoken");

// ================================
// Generate JWT Token
// ================================
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    }
  );
};

// ================================
// Validation Helpers
// ================================

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phoneRegex =
  /^[6-9]\d{9}$/;

const sanitize = (value) =>
  typeof value === "string"
    ? value.trim()
    : "";

// ================================
// Register User
// POST /api/auth/register
// ================================

exports.register = async (req, res) => {
  try {

    let {
      name,
      email,
      password,
      phone,
      company,
    } = req.body;

    // ------------------------
    // Sanitize Inputs
    // ------------------------

    name = sanitize(name);
    email = sanitize(email).toLowerCase();
    password = sanitize(password);
    phone = sanitize(phone);
    company = sanitize(company);

    // ------------------------
    // Required Fields
    // ------------------------

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Name, Email and Password are required.",
      });
    }

    // ------------------------
    // Name Validation
    // ------------------------

    if (name.length < 3) {
      return res.status(400).json({
        success: false,
        message:
          "Name must contain at least 3 characters.",
      });
    }

    if (name.length > 50) {
      return res.status(400).json({
        success: false,
        message:
          "Name cannot exceed 50 characters.",
      });
    }

    // ------------------------
    // Email Validation
    // ------------------------

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid email address.",
      });
    }

    // ------------------------
    // Password Validation
    // ------------------------

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters.",
      });
    }

    if (password.length > 30) {
      return res.status(400).json({
        success: false,
        message:
          "Password cannot exceed 30 characters.",
      });
    }

    // ------------------------
    // Phone Validation
    // ------------------------

    if (
      phone &&
      !phoneRegex.test(phone)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid 10-digit mobile number.",
      });
    }

    // ------------------------
    // Company Validation
    // ------------------------

    if (
      company &&
      company.length > 100
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Company name is too long.",
      });
    }

    // ------------------------
    // Existing User
    // ------------------------

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "User already exists with this email.",
      });
    }

    // ------------------------
    // Create User
    // ------------------------

    const user =
      await User.create({
        name,
        email,
        password,
        phone,
        company,
      });

    const token =
      generateToken(user._id);

    return res.status(201).json({
      success: true,
      message:
        "Registration successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        company: user.company,
      },
    });

  } catch (error) {

    console.error(
      "Register Error:",
      error
    );

    if (
      error.name ===
      "ValidationError"
    ) {
      return res.status(400).json({
        success: false,
        message:
          Object.values(error.errors)
            .map(
              (err) => err.message
            )
            .join(", "),
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Internal server error.",
    });
  }
};
// ================================
// Login User
// POST /api/auth/login
// ================================

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    email = sanitize(email).toLowerCase();
    password = sanitize(password);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required.",
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address.",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        company: user.company,
      },
    });

  } catch (error) {

    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ================================
// Get Current User
// GET /api/auth/me
// ================================

exports.getMe = async (req, res) => {

  try {

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        company: user.company,
      },
    });

  } catch (error) {

    console.error("GetMe Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });

  }

};

// ================================
// Update Profile
// PUT /api/auth/update
// ================================

exports.updateProfile = async (req, res) => {

  try {

    let {
      name,
      phone,
      company,
    } = req.body;

    name = sanitize(name);
    phone = sanitize(phone);
    company = sanitize(company);

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (name) {

      if (name.length < 3) {
        return res.status(400).json({
          success: false,
          message: "Name must contain at least 3 characters.",
        });
      }

      if (name.length > 50) {
        return res.status(400).json({
          success: false,
          message: "Name cannot exceed 50 characters.",
        });
      }

      user.name = name;

    }

    if (phone) {

      if (!phoneRegex.test(phone)) {
        return res.status(400).json({
          success: false,
          message: "Invalid phone number.",
        });
      }

      user.phone = phone;

    }

    if (company) {

      if (company.length > 100) {
        return res.status(400).json({
          success: false,
          message: "Company name is too long.",
        });
      }

      user.company = company;

    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        company: user.company,
      },
    });

  } catch (error) {

    console.error("Update Profile Error:", error);

    if (error.name === "ValidationError") {

      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)
          .map((err) => err.message)
          .join(", "),
      });

    }

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });

  }

};