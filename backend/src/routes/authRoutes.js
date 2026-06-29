const express = require("express");

const router = express.Router();

const {

    register,
    login,
    getMe,
    updateProfile,
    verifyEmail,
    resendVerification

} = require("../controllers/authController");

const {

    protect

} = require("../middleware/auth");

// Public Routes

router.post("/register", register);

router.post("/login", login);

router.get(
    "/verify-email/:token",
    verifyEmail
);

router.post(
    "/resend-verification",
    resendVerification
);

// Protected Routes

router.get(
    "/me",
    protect,
    getMe
);

router.put(
    "/update",
    protect,
    updateProfile
);

module.exports = router;