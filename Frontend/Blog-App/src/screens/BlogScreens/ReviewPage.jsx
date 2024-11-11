import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/v1/reviews');
        setReviews(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError('Error fetching reviews');
        setReviews([]);
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const newReview = { name, rating, comment };
      const response = await axios.post('/api/v1/reviews', newReview);
      setReviews([...reviews, response.data]);
      setSuccessMessage('Review submitted successfully!');
      setName('');
      setRating(5);
      setComment('');
    } catch (err) {
      setError('Error submitting review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen py-8 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">User Reviews</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

      {/* Reviews List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Array.isArray(reviews) && reviews.map((review) => (
          <div key={review._id} className="bg-blue-100 shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold text-blue-700">{review.name}</h2>
            <p className="text-yellow-500 font-semibold">Rating: {review.rating} / 5</p>
            <p className="text-gray-700 mt-2">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* New Review Form */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto text-center border border-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Leave a Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="rating" className="block text-gray-700">Rating</label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="block text-gray-700">Comment</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewPage;
