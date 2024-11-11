
const express = require("express");
const { isAuthenticatedUser, } = require("../middleware/auth");
const { addReview, updateReview, deleteReview } = require("../controller/reviewController");

const router = express.Router();
router.route('/addReview').get(isAuthenticatedUser,addReview );
router.route('/updateReview').get(isAuthenticatedUser,  updateReview);
router.route('/delteReview').get(isAuthenticatedUser, deleteReview);

module.exports = router;
