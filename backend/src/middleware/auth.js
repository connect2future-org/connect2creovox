const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ======================================
// Protect Routes Middleware
// ======================================

exports.protect = async (req, res, next) => {

    try {

        let token;

        // ----------------------------------
        // Get Token
        // ----------------------------------

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")
        ) {

            token = req.headers.authorization.split(" ")[1];

        }

        // ----------------------------------
        // Token Missing
        // ----------------------------------

        if (!token) {

            return res.status(401).json({

                success: false,

                message: "Access denied. Please login."

            });

        }

        // ----------------------------------
        // Verify JWT
        // ----------------------------------

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // ----------------------------------
        // Check User Exists
        // ----------------------------------

const user = await User.findById(decoded.id);

        if (!user) {

            return res.status(401).json({

                success: false,

                message: "User no longer exists."

            });

        }

        req.user = user;

        next();

    }

    catch (error) {

        console.error(
            "Authentication Error:",
            error.message
        );

        // ------------------------------
        // Expired Token
        // ------------------------------

        if (error.name === "TokenExpiredError") {

            return res.status(401).json({

                success: false,

                message: "Session expired. Please login again."

            });

        }

        // ------------------------------
        // Invalid Token
        // ------------------------------

        if (error.name === "JsonWebTokenError") {

            return res.status(401).json({

                success: false,

                message: "Invalid authentication token."

            });

        }

        return res.status(500).json({

            success: false,

            message: "Authentication failed."

        });

    }

};

// ======================================
// Admin Authorization Middleware
// ======================================

exports.authorize = (...roles) => {

    return (req, res, next) => {

        if (!req.user) {

            return res.status(401).json({

                success: false,

                message: "Authentication required."

            });

        }

        if (!roles.includes(req.user.role)) {

            return res.status(403).json({

                success: false,

                message:
                    "You are not authorized to access this resource."

            });

        }

        next();

    };

};