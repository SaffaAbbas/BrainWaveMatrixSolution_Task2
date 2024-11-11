
const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { createBlog, updateBlog, deleteBlog, getBlogById, getAllBlogs } = require("../controller/blogController");
const multipleUpload = require("../middleware/multer");

const router = express.Router();
router.route('/createBlog').post( multipleUpload,isAuthenticatedUser, createBlog);
router.route('/updateBlog/:id').put(multipleUpload,isAuthenticatedUser,  updateBlog);
router.route('/deleteBlog/:id').delete(isAuthenticatedUser, deleteBlog);
router.route('/getBlogById/:id').get(isAuthenticatedUser, getBlogById);
router.route("/getAllBlog").get(isAuthenticatedUser,getAllBlogs);

module.exports = router;