const catchAsyncError = require("../middleware/catchAsyncError.js");
const Blog = require("../models/blogModels.js")
const getDataUri = require("../utils/cloudinary.js"); // Helper for handling image uploads to Cloudinary
const cloudinary = require("cloudinary").v2;
const fs = require("fs");



const createBlog = catchAsyncError(async (req, res, next) => {
  try {
    // Destructure required fields from req.body
    const { title, description, author } = req.body;
    console.log("req.body:", req.body);

    // Validate input
    if (!title || !description || !author) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: title, description, and author.",
      });
    }

    const images = [];

    // Handle image uploads
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const fileUri = getDataUri(file); // Convert each file to Data URI
        const cloudinaryResult = await cloudinary.uploader.upload(fileUri.content);
        return {
          public_id: cloudinaryResult.public_id,
          url: cloudinaryResult.secure_url,
        };
      });

      // Wait for all uploads to finish
      images.push(...await Promise.all(uploadPromises));
    }

    // Create new blog post
    const newBlog = await Blog.create({
      title,
      description,
      author,
      images,
    });

    // Respond with success message and new blog data
    res.status(201).json({
      success: true,
      message: "Blog created successfully.",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Error while creating blog:", error); // Log the error for debugging
    next(error); // Call the error handling middleware
  }
});



const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve blogs", error });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve blog", error });
  }
};



const updateBlog = catchAsyncError(async (req, res, next) => {
  try {
    const { title, description, author } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Update the blog properties
    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.author = author || blog.author;

    const images = [];

    // Handle image uploads
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const fileUri = getDataUri(file);
        const cloudinaryResult = await cloudinary.uploader.upload(fileUri.content);
        return {
          public_id: cloudinaryResult.public_id,
          url: cloudinaryResult.secure_url,
        };
      });

      // Wait for all uploads to finish
      images.push(...await Promise.all(uploadPromises));
    }

    // Update the images array if new images are provided
    if (images.length > 0) {
      blog.images = images;
    }

    await blog.save();
    res.status(200).json({
      success: true,
      message: "Blog updated successfully.",
      blog,
    });
  } catch (error) {
    console.error("Error while updating blog:", error); // Log the error for debugging
    next(error); // Call the error handling middleware
  }
});


const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete blog", error });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
};
