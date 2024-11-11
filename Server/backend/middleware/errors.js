
const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    const error = { ...err }; // Create a copy of the err object

    error.statusCode = err.statusCode || 500;
    error.message = err.message || "Internal Server Error";

    // Wrong MongoDB id error
    if (error.name === "CastError") {
        const message = `Resource not found. Invalid ${error.path}`;
        return res.status(400).json({
            success: false,
            error: message
        });
    }

    // Mongoose duplicate key error
    if (error.code === 11000) {
        const message = `Duplicate ${Object.keys(error.keyValue)} entered`;
        return res.status(400).json({
            success: false,
            error: message
        });
    }

    // Wrong JSON web token error 
    if (error.name === "JsonWebTokenError") {
        const message = `JSON web token is invalid. Try again!`;
        return res.status(400).json({
            success: false,
            error: message
        });
    }

    // Expired JSON web token error 
    if (error.name === "TokenExpiredError") {
        const message = `JSON web token is expired. Try again!`;
        return res.status(400).json({
            success: false,
            error: message
        });
    }

    res.status(error.statusCode).json({
        success: false,
        error: error.message
    });
};
