
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
reviewerName: { 
    type: String,
    required: true
 },
rating: {
   type: Number,
   required: true,
   min: 1,
   max: 5 },
  comment: { type: String,
  required: true 
},
  reviewDate: { 
  type: Date,
  default: Date.now
 }
   
});

module.exports = mongoose.model("review", reviewSchema);