const Blog=require("../models/blogModels.js");

// Add a review to a specific blog
const addReview = async (req, res) => {
  try {
    const { reviewerName, rating, comment } = req.body;
    const blog = await Blog.findById(req.params.blogId);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const newReview = {
      reviewerName,
      rating,
      comment,
      reviewDate: Date.now()
    };

    blog.reviews.push(newReview);
    await blog.save();

    res.status(201).json({ message: "Review added successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error });
  }
};

// Update a specific review in a blog
const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const blog = await Blog.findById(req.params.blogId);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const review = blog.reviews.id(req.params.reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // Update review fields if provided
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    review.reviewDate = Date.now(); // Update review date to current date

    await blog.save();

    res.status(200).json({ message: "Review updated successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Failed to update review", error });
  }
};

// Delete a specific review from a blog
const deleteReview = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const review = blog.reviews.id(req.params.reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    review.remove();
    await blog.save();

    res.status(200).json({ message: "Review deleted successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review", error });
  }
};

module.exports = {
  addReview,
  updateReview,
  deleteReview
};
