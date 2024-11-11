
const jwt= require("jsonwebtoken")
const User = require('../models/userModels.js');
const { ErrorHandler } = require('../utils/errorHandler.js');
const catchAsyncError = require('./catchAsyncError.js');

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    try {
        // Retrieve token from cookies
        const token = req.cookies.token;

        // Check if token is present
        if (!token) {
            console.log('No token found');
            return next(new ErrorHandler('Not Logged In', 401));
        }

        // Verify token
        const decodedData = jwt.verify(token, process.env.JWT_SECRETKEY);
        console.log('Decoded token:', decodedData);
        
        // Fetch user by ID from token
        req.user = await User.findById(decodedData._id).select('-password'); // Exclude password from the user object

        // Check if user exists
        if (!req.user) {
            console.log('User not found');
            return next(new ErrorHandler('User not found', 404));
        }

        next();
    } catch (err) {
        next(err);
    }
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // Check if the user's role is authorized
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403));
        }
        next();
    };
};
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModels.js');
// const { ErrorHandler } = require('../utils/errorHandler.js');
// const catchAsyncError = require('./catchAsyncError.js');

// exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
//     try {
//         // Retrieve token from cookies
//         const token = req.cookies.token;

//         // Check if token is present
//         if (!token) {
//             console.log('No token found');
//             return next(new ErrorHandler('Not Logged In', 401));
//         }

//         // Verify token
//         let decodedData;
//         try {
//             decodedData = jwt.verify(token, process.env.JWT_SECRETKEY);
//         } catch (error) {
//             // Handle token expiration specifically
//             if (error.name === 'TokenExpiredError') {
//                 return next(new ErrorHandler('Token expired, please log in again', 401));
//             }
//             return next(new ErrorHandler('Invalid token, please log in', 401));
//         }

//         console.log('Decoded token:', decodedData);

//         // Fetch user by ID from token
//         req.user = await User.findById(decodedData._id).select('-password'); // Exclude password from the user object

//         // Check if user exists
//         if (!req.user) {
//             console.log('User not found');
//             return next(new ErrorHandler('User not found', 404));
//         }

//         next();
//     } catch (err) {
//         console.error('Error in isAuthenticatedUser middleware:', err);
//         next(err);
//     }
// });

// exports.authorizeRoles = (...roles) => {
//     return (req, res, next) => {
//         // Check if the user's role is authorized
//         if (!roles.includes(req.user.role)) {
//             return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403));
//         }
//         next();
//     };
// };
