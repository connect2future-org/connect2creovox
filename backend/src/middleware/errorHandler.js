// =========================================
// Global Error Handler Middleware
// =========================================

const errorHandler = (err, req, res, next) => {

    console.error("================================");
    console.error("ERROR:", err);
    console.error("================================");

    let statusCode = err.statusCode || 500;

    let message = err.message || "Internal Server Error";

    // ==========================================
    // Invalid MongoDB ObjectId
    // ==========================================

    if (err.name === "CastError") {

        statusCode = 404;

        message = "Requested resource not found.";

    }

    // ==========================================
    // Duplicate MongoDB Key
    // ==========================================

    if (err.code === 11000) {

        const field = Object.keys(err.keyValue)[0];

        statusCode = 409;

        message = `${field} already exists.`;

    }

    // ==========================================
    // Mongoose Validation Error
    // ==========================================

    if (err.name === "ValidationError") {

        statusCode = 400;

        message = Object.values(err.errors)
            .map((item) => item.message)
            .join(", ");

    }

    // ==========================================
    // JWT Invalid
    // ==========================================

    if (err.name === "JsonWebTokenError") {

        statusCode = 401;

        message = "Invalid authentication token.";

    }

    // ==========================================
    // JWT Expired
    // ==========================================

    if (err.name === "TokenExpiredError") {

        statusCode = 401;

        message = "Session expired. Please login again.";

    }

    // ==========================================
    // Multer Upload Error
    // ==========================================

    if (err.name === "MulterError") {

        statusCode = 400;

        message = err.message;

    }

    // ==========================================
    // Payload Too Large
    // ==========================================

    if (err.status === 413) {

        statusCode = 413;

        message = "Uploaded file is too large.";

    }

    // ==========================================
    // Final Response
    // ==========================================

    return res.status(statusCode).json({

        success: false,

        message,

        ...(process.env.NODE_ENV === "development" && {

            stack: err.stack

        })

    });

};

module.exports = errorHandler;