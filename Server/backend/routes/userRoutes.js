
const express = require("express");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth.js");
const { getMyProfile, changePassword, updateProfile, forgetPassword, resetPassword, register, getAllUsers, checkUserStatus, deactivateUser, verifyEmail } = require("../controller/userController.js");
const router = express.Router();
const multipleUpload = require("../middleware/multer.js");
const login = require("../controller/userController.js").login;
const logout = require("../controller/userController.js").logout;
router.route("/login").post( login);
router.route("/verifyEmail").post(verifyEmail);
router.route("/resetPassword").post(isAuthenticatedUser,resetPassword);
router.route("/logout").get(logout);
router.route("/users").post(register);
router.route("/profile").get(isAuthenticatedUser,getMyProfile);
router.route("/changePassword").put(isAuthenticatedUser,changePassword);
router.route("/updateProfile").put(isAuthenticatedUser,updateProfile);
router.route("/forgetPassword").post(forgetPassword);
router.route("/getAllUsers").get(getAllUsers);
router.get('/user/status/:userId', isAuthenticatedUser, checkUserStatus);
router.route('/delete/:userId').get(isAuthenticatedUser, authorizeRoles('admin'),deactivateUser);


module.exports = router;

