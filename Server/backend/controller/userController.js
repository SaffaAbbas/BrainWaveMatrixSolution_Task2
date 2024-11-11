
const userModels = require("../models/userModels.js");

const bcrypt=require("bcrypt");
// const catchAsyncError = require('../middleware/catchAsyncError.js');
const { ErrorHandler } = require("../utils/errorHandler.js");
const sendToken = require("../utils/jwtToken.js");
const getResetPasswordToken = require("../models/userModels.js")
const { isAuthenticatedUser } = require("../middleware/auth.js");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require('crypto');
const mongoose = require('mongoose');
const catchAsyncError = require("../middleware/catchAsyncError.js");
const register = async (req, res, next) => {
    try {
        const { name, email, password  ,confirmPassword,} = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please provide all required fields" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        // const file = req.file;
        // console.log(file);
        // const dataUri = getDataUri(file); 
        // const result = await cloudinary.uploader.upload(dataUri.content);

        const user = await userModels.create({
            name,
            email,
            password,
            confirmPassword,
            // avatar: {
            //     public_id: result.public_id,
            //     url: result.secure_url
            // }
        });
        
        const token = user.getJWTToken();

        res.status(201).json({
            success: true,
            token,
            user
        });
    } catch (error) {
        next(error);
    }
};

//LOGIN 

const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter all fields", 420));
    }

    const user = await userModels.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Incorrect email or password", 401));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return next(new ErrorHandler("Incorrect email or password", 400));
    }

    const token = user.getJWTToken();

    sendToken(res, user, `Welcome back!,${user.name}`, 200);
});

//GET ALL USERS

const getAllUsers =  catchAsyncError(async (req, res, next) => {
    try {
        const user = await userModels.find();
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});


//LOGOUT USER

const logout = catchAsyncError(async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "Logged Out Successfully",
    });
   
});



//DEACTIVATE USER

const deactivateUser = catchAsyncError(async (req, res) => {
    const { userId } = req.params; 
  
    console.log(`Attempting to deactivate user with ID: ${userId}`); 

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format',
      });
    }
  

    const user = await userModels.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }
    user.isActive = false;
    await user.save();
  
    res.status(200).json({
      success: true,
      message: 'User has been deactivated successfully',
    });
  });


// Profile

const getMyProfile = catchAsyncError(async (req, res, next) => {
    if (!req.user) {
        return next(new ErrorHandler("Not Logged In", 401));
    }

    const user = await userModels.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
        message: "User profile retrieved successfully",
    });
});


//update password

const changePassword = catchAsyncError(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return next(new ErrorHandler("Please Enter all fields", 400));
    }
  
    const user = await userModels.findById(req.user._id).select("+password");
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) return next(new ErrorHandler("Incorrect Old Password", 400));
  
    // Hash the new password before saving
    user.password = await bcrypt.hash(newPassword, 10); // Adjust cost factor as needed
  
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password changed Successfully",
    });
  });


  //verify Email

  const verifyEmail = catchAsyncError(async (req, res, next) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({
            success: false,
            message: "Please provide both email and OTP."
        });
    }

    const user = await userModels.findOne({ email });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found."
        });
    }

    // Check if the OTP matches and is still valid
    if (user.resetPasswordToken !== otp) {
        return res.status(400).json({
            success: false,
            message: "Invalid OTP."
        });
    }

    if (user.resetPasswordExpire < Date.now()) {
        return res.status(400).json({
            success: false,
            message: "OTP has expired."
        });
    }

    // OTP is valid, proceed with verification
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.isVerified = true;  // Optionally set a verified flag
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Email verified successfully."
    });
});

  

  //update profile
const updateProfile = catchAsyncError(async (req, res, next) => {
    const {name,email}=req.body;
    const user=await userModels.findById(req.user._id);
    if(name) user.name=name;
    if(email) user.email=email;
    await user.save();
    res.status(200).json({
        success: true,
        message:"profile changed Successfully",
      });
    });

   
    //FORGET PASSWORD

    const forgetPassword = catchAsyncError(async (req, res, next) => {
        const { email } = req.body;
        console.log("email is", email);
    
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Please provide an email address."
            });
        }
    
        const user = await userModels.findOne({ email });
    
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }
    
        // Generate a random 4-character OTP
        const otp = Math.random().toString(36).substring(2, 6).toUpperCase();
    
        // Save the OTP and its expiration time in the user's document
        user.resetPasswordToken = otp;
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
        await user.save({ validateBeforeSave: false });
    
        const message = `
            <p><strong>Subject:</strong> Password Reset OTP</p>
            <p>Dear ${user.name},</p>
            <p>We have received a request to reset your password for your ${user.name} account.</p>
            <p>Your OTP for password reset is: <strong>${otp}</strong></p>
            <p>Please enter this OTP to verify your email and reset your password.</p>
            <p>If you did not initiate this request, please ignore this email. Your account is secure and no changes will be made.</p>
            <p>Best regards,<br>The Online Makeup Team</p>
        `;
    
        try {
            await sendEmail({
                email: user.email,
                subject: "Password Reset OTP",
                message,
            });
    
            res.status(200).json({
                success: true,
                message: "OTP sent to your email successfully."
            });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
    
            return next(new ErrorHandler('Error sending email', 500));
        }
    });
    
  
//RESET PASSWORD

    const resetPassword = catchAsyncError(async (req, res, next) => {
        const { password, confirmPassword } = req.body;
    
        if (!password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Please provide both password and confirm password."
            });
        }
    
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password do not match."
            });
        }
    
        const user = req.user; // Ensure this is correctly set
    
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }
    
        // Hash the password
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
    
        await user.save({ validateBeforeSave: false });
    
        res.status(200).json({
            success: true,
            message: "Password has been reset successfully."
        });
    });
    

//CHECK USER STATUS

    const checkUserStatus = catchAsyncError(async (req, res, next) => {
        const requestedUserId = req.params.userId; // ID from request parameters
        const loggedInUserId = req.user.id; // Assuming this is the logged-in user's ID
    
        if (!requestedUserId) {
            return next(new ErrorHandler("User ID is required", 400));
        }
    
        if (requestedUserId !== loggedInUserId) {
            return res.status(403).json({
                success: false,
                message: "You can only check the status of your own account",
            });
        }
    
        const user = await userModels.findById(loggedInUserId);
    
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }
    
        // Check if the isActive field exists and has a value
        const isActive = user.isActive !== undefined ? user.isActive : false;
    
        res.status(200).json({
            success: true,
            message: isActive ? "Your account is active" : "Your account is not active",
        });
    });
    
    
   
    
    
  

    module.exports = {
        register,
        login,
        logout,
        getMyProfile,
        changePassword,
        updateProfile,
        forgetPassword,
    resetPassword,
        sendToken,
        getAllUsers,
        checkUserStatus,
        deactivateUser,
        verifyEmail

       
    };








    // const placeOrder = async (req, res) => {
    //     try {
    //         const { userId, orderItems, shippingInfo, totalPrice, orderStatus } = req.body;
    
    //         // Validate inputs
    //         if (!userId || !orderItems || !shippingInfo || !totalPrice) {
    //             return res.status(400).json({ message: 'All fields are required.' });
    //         }
    
    //         // Find the user
    //         const user = await userModels.findById(userId);
    //         if (!user) {
    //             return res.status(404).json({ message: 'User not found.' });
    //         }
    
    //         // Create the order
    //         const order = new Order({
    //             user: userId,
    //             orderItems,
    //             shippingInfo,
    //             totalPrice,
    //             orderStatus,
    //             paidAt: null // or set it to the current date if payment has been made
    //         });
    
    //         // Save the order to the database
    //         await order.save();
    
    //         // Send response
    //         res.status(201).json({
    //             message: 'Order placed successfully.',
    //             order
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: 'Server error. Please try again later.' });
    //     }
    // };
    
    // // Get all orders for a user
    // const getUserOrders = async (req, res) => {
    //     try {
    //         const { userId } = req.params;
    
    //         // Find the user
    //         const user = await userModels.findById(userId);
    //         if (!user) {
    //             return res.status(404).json({ message: 'User not found.' });
    //         }
    
    //         // Find orders for the user
    //         const orders = await Order.find({ user: userId });
    
    //         // Send response
    //         res.status(200).json({
    //             orders
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: 'Server error. Please try again later.' });
    //     }
    // };



























 // forget Password
//    const forgetPassword = catchAsyncError(async (req, res, next) => {
//     try {
//       // 1. Extract email from request body
//       const { email } = req.body;
  
//       // 2. Find user by email
//       const user = await userModels.findOne({ email });
  
//       // 3. Handle user not found case
//       if (!user) {
//         return next(new ErrorHandler("User not Found", 400));
//       }
  
//       // 4. Generate reset token synchronously (assuming it's a simple string)
//       const resetToken = user.getResetPasswordToken(); // Assuming getResetPasswordToken synchronously generates a token
  
//       // 5. Construct password reset URL (assuming FRONTEND_URL is a valid environment variable)
//       const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
  
//       // 6. Create informative message (avoid unnecessary complexity)
//       const message = `A password reset link has been sent to your email address: ${email}. If you did not request a password reset, please ignore this email.`;
  
//       // 7. Send email using sendEmail function (assuming it's already implemented)
//       await sendEmail(user.email, "Reset Password", message);
  
//       // 8. Send success response
//       res.status(200).json({
//         success: true,
//         message: `A password reset link has been sent to your email address: ${email}.`,
//       });
//     } catch (error) {
//       // 9. Handle errors gracefully
//       console.error(error);
//       res.status(500).json({
//         success: false,
//         message: "Error sending password reset email.",
//       });
//     }
//   });
    
    
    // const newUserData = {
    //     name: req.body.name,
    //     email: req.body.email,
    //   };
    
    //   if (req.body.avatar !== "") {
    //     const user = await User.findById(req.user.id);
    
    //     const imageId = user.avatar.public_id;
    
    //     await cloudinary.v2.uploader.destroy(imageId);
    
    //     const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //       folder: "avatars",
    //       width: 150,
    //       crop: "scale",
    //     });
    
    //     newUserData.avatar = {
    //       public_id: myCloud.public_id,
    //       url: myCloud.secure_url,
    //     };
    //   }
    
    //   const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    //     new: true,
    //     runValidators: true,
    //     useFindAndModify: false,
    //   });
    




// const changePassword = catchAsyncError(async (req, res, next) => { 
//     const {oldPassword,newPassword}=req.body;
//     if(!oldPassword || !newPassword)
//         return next(new ErrorHandler("please Enter all fields",400));
//     const user = await userModels.findById(req.user._id).select("+password");
//     const isMatch =await user.comparePassword(oldPassword);
//     if(!isMatch) return next(new ErrorHandler("Incorrect Old Password",400));
//     user.password=newPassword;
//     await user.save();
//     res.status(200).json({
//         success:true,
//         message:"Password change Successfully"
//     });
// });

// //forgot password
// exports.forgetPassword = catchAsncError(async (req, res, next) => {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//         return next(new ErrorHandler("User not Found", 404));
//     }
//     //get reset Password token
//     const resetToken =  user.getResetPasswordToken() ;
    
    
//     await user.save({ validateBeforeSave: false });
   

//     const resetPasswordURL = `${req.protocol}://localhost:3000/password/reset/${resetToken}`;


//     const message = `<p><strong>Subject:</strong> Password Reset Request</p>
//     <br>
//     <p>Dear ${user.name},</p>
//     <br>
//     <p>We have received a request to reset your password for your ${user.name} account.
//     To proceed with the password reset, Please click on the following link:</p>
//     <a href="${resetPasswordURL}">Reset Password</a>
//     <br>
//     <p>If you did not initiate this request, please ignore this email. Your account is <strong>Secure</strong>, and no changes will be made.</p>
//     <br>
//     <p>Please note that the password reset link is only valid for a limited time for security reasons
//     If you need further assistance or have any questions, please don't hesitate to contact our support team at Gmail account abdulhameeed000650@gmail.com.</p>
//     <br>
//     <p>Best regards,<br>The DubEase Team</p>`;
   
    
//     try {
//         await sendEmail({
//             email: user.email,
//             subject: "Password Reset Request",
//             message,
//         });
      
   
//     res.status(200).json({
//         success: true,
//         message: `Email send to Your account successfully`,
//     });
   
//     }
//     catch (error) {
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpire = undefined;
//         await user.save({ validateBeforeSave: false });
//         return next(new ErrorHandler(error.stack, 500));
        
//     }
// });

// //reset password

// //update password
// exports.updateUserPassword = catchAsncError(async (req, res, next) => { 
//     const user = await User.findById(req.user.id).select("+password");
    
//     const isOldPasswordMatched = await bcrypt.compare(req.body.oldPassword,user.password);
//     if (!isOldPasswordMatched) {
//         return next(new ErrorHandler("Old Password is incorrect", 401));

//     }
//     if (req.body.newPassword !== req.body.confirmPassword) {
//         return next(new ErrorHandler("Passwords Does not match", 401));

//     }
//     user.password = req.body.newPassword
//     await user.save();
//     sendToken(user, 200, res);

    
    
// })
// //update profile
// exports.updateProfile = catchAsncError(async (req, res, next) => {
//     const newUserData = {
//         name: req.body.name,
//         email: req.body.email,
//       };
    
//       if (req.body.avatar !== "") {
//         const user = await User.findById(req.user.id);
    
//         const imageId = user.avatar.public_id;
    
//         await cloudinary.v2.uploader.destroy(imageId);
    
//         const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
//           folder: "avatars",
//           width: 150,
//           crop: "scale",
//         });
    
//         newUserData.avatar = {
//           public_id: myCloud.public_id,
//           url: myCloud.secure_url,
//         };
//       }
    
//       const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false,
//       });
    
//       res.status(200).json({
//         success: true,
//       });
//     });



