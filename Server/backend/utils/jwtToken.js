const userModels = require("../models/userModels.js");

const sendToken = (res,user, message, statusCode) => {
  const token = user.getJWTToken();
  // Options for cookies
  const options = {
    
      expires: new Date(Date.now() + 30 * 24 * 3600000), // Set the cookie expiration time to 30 days 
      httpOnly: true,
      secure: true,
      // sameSite: 'strict'
  };

  // Set the "token" cookie in header
  // Send the JSON response

  res.status(statusCode || 200).cookie('token', token, options).json({
      success: true,
      user,
      token,
      message: message || "Success"
  });
};
 module.exports = sendToken;
