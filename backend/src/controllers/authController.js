const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// ======================================
// Generate JWT
// ======================================

const generateToken = (id) => {

    return jwt.sign(

        { id },

        process.env.JWT_SECRET,

        {
            expiresIn:
                process.env.JWT_EXPIRE || "7d"
        }

    );

};

// ======================================
// Validation Helpers
// ======================================

const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phoneRegex =
    /^[6-9]\d{9}$/;

const sanitize = (value) =>

    typeof value === "string"
        ? value.trim()
        : "";

// ======================================
// Register User
// ======================================

exports.register = async (req, res) => {

    try {

        let {

            name,
            email,
            password,
            phone,
            company

        } = req.body;

        name = sanitize(name);
        email = sanitize(email).toLowerCase();
        password = sanitize(password);
        phone = sanitize(phone);
        company = sanitize(company);

        // -------------------------
        // Required Fields
        // -------------------------

        if (!name || !email || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "Name, Email and Password are required."

            });

        }

        // -------------------------
        // Name Validation
        // -------------------------

        if (name.length < 3 || name.length > 50) {

            return res.status(400).json({

                success: false,

                message:
                    "Name should be between 3 and 50 characters."

            });

        }

        // -------------------------
        // Email Validation
        // -------------------------

        if (!emailRegex.test(email)) {

            return res.status(400).json({

                success: false,

                message:
                    "Please enter a valid email address."

            });

        }

        // -------------------------
        // Password Validation
        // -------------------------

        if (password.length < 6) {

            return res.status(400).json({

                success: false,

                message:
                    "Password should contain at least 6 characters."

            });

        }

        // -------------------------
        // Phone Validation
        // -------------------------

        if (phone && !phoneRegex.test(phone)) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid mobile number."

            });

        }

        // -------------------------
        // Existing User
        // -------------------------

        const existingUser =
            await User.findOne({ email });

        if (existingUser) {

            return res.status(409).json({

                success: false,

                message:
                    "Email is already registered."

            });

        }

        // -------------------------
        // Create User
        // -------------------------

        const user = new User({

            name,
            email,
            password,
            phone,
            company,
            isVerified: false

        });

        // -------------------------
        // Verification Token
        // -------------------------

        const verificationToken =
            user.getVerificationToken();

        await user.save();

        // -------------------------
        // Verification URL
        // -------------------------

        const verifyURL =

            `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

        // -------------------------
        // Email Template
        // -------------------------

        const html = `

        <div style="font-family:Arial;padding:30px">

            <h2>Welcome to Connect2Creovox 🎉</h2>

            <p>Hello ${user.name},</p>

            <p>

                Thank you for registering.

                Please verify your email by clicking
                the button below.

            </p>

            <a

                href="${verifyURL}"

                style="

                background:#db2777;
                color:white;
                padding:14px 30px;
                text-decoration:none;
                border-radius:8px;
                display:inline-block;
                margin-top:20px;

                "

            >

                Verify My Email

            </a>

            <p style="margin-top:25px">

                This verification link expires
                in 24 hours.

            </p>

            <p>

                Connect2Creovox Team

            </p>

        </div>

        `;

        // -------------------------
        // Send Email
        // -------------------------

        await sendEmail({

            email: user.email,

            subject:
                "Verify your Connect2Creovox Account",

            html

        });

        // -------------------------
        // Success
        // -------------------------

        return res.status(201).json({

            success: true,

            message:

                "Registration successful. Please verify your email before logging in."

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

};
// ================================
// Login User
// POST /api/auth/login
// ================================

// ======================================
// Login User
// POST /api/auth/login
// ======================================

exports.login = async (req, res) => {

    try {

        let {

            email,
            password

        } = req.body;

        email = sanitize(email).toLowerCase();
        password = sanitize(password);

        // -------------------------
        // Required Fields
        // -------------------------

        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "Email and Password are required."

            });

        }

        // -------------------------
        // Email Validation
        // -------------------------

        if (!emailRegex.test(email)) {

            return res.status(400).json({

                success: false,

                message:
                    "Please enter a valid email address."

            });

        }

        // -------------------------
        // Find User
        // -------------------------

        const user =
            await User.findOne({

                email

            }).select("+password");

        if (!user) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password."

            });

        }

        // -------------------------
        // Email Verification Check
        // -------------------------

        if (!user.isVerified) {

            return res.status(403).json({

                success: false,

                message:
                    "Please verify your email before logging in."

            });

        }

        // -------------------------
        // Password Check
        // -------------------------

        const isMatch =
            await user.comparePassword(password);

        if (!isMatch) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password."

            });

        }

        // -------------------------
        // Generate Token
        // -------------------------

        const token =
            generateToken(user._id);

        return res.status(200).json({

            success: true,

            message:
                "Login successful.",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role,

                phone: user.phone,

                company: user.company,

                isVerified: user.isVerified

            }

        });

    }

    catch (error) {

        console.error(
            "Login Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Internal server error."

        });

    }

};
// ======================================
// Verify Email
// GET /api/auth/verify-email/:token
// ======================================

exports.verifyEmail = async (req, res) => {

    try {

        const hashedToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const user = await User.findOne({

            verificationToken: hashedToken,

            verificationTokenExpire: {

                $gt: Date.now()

            }

        });

        if (!user) {

            return res.status(400).json({

                success: false,

                message:
                    "Verification link is invalid or has expired."

            });

        }

        user.isVerified = true;

        user.verificationToken = undefined;

        user.verificationTokenExpire = undefined;

        await user.save();

        return res.status(200).json({

            success: true,

            message:
                "Email verified successfully. You can now login."

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message:
                "Internal server error."

        });

    }

};


// ======================================
// Resend Verification Email
// POST /api/auth/resend-verification
// ======================================

exports.resendVerification = async (req, res) => {

    try {

        let { email } = req.body;

        email = sanitize(email).toLowerCase();

        if (!emailRegex.test(email)) {

            return res.status(400).json({

                success: false,

                message:
                    "Please enter a valid email."

            });

        }

        const user = await User.findOne({

            email

        });

        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found."

            });

        }

        if (user.isVerified) {

            return res.status(400).json({

                success: false,

                message:
                    "This email is already verified."

            });

        }

        const verificationToken =
            user.getVerificationToken();

        await user.save();

        const verifyURL =

            `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

        const html = `

        <div style="font-family:Arial;padding:30px">

            <h2>Verify your Connect2Creovox Account</h2>

            <p>Hello ${user.name},</p>

            <p>

                Click below to verify your email.

            </p>

            <a

                href="${verifyURL}"

                style="

                    background:#db2777;

                    color:white;

                    padding:14px 30px;

                    border-radius:8px;

                    text-decoration:none;

                    display:inline-block;

                "

            >

                Verify Email

            </a>

        </div>

        `;

        await sendEmail({

            email: user.email,

            subject:
                "Verify your Connect2Creovox Account",

            html

        });

        return res.status(200).json({

            success: true,

            message:
                "Verification email sent successfully."

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message:
                "Internal server error."

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