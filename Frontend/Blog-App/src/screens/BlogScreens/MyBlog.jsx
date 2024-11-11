import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyBlog = () => {
  const [blogs, setBlogs] = useState([]); // Ensure blogs is initialized as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/v1/user/blogs'); // Adjust API endpoint as necessary
        
        // Log the response to check structure
        console.log("API Response:", response.data);

        // Ensure response data is an array, or handle accordingly
        setBlogs(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError('Error fetching blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">My Blogs</h1>
      
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/blog')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Create New Blog
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-500">You have no blogs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={blog.images[0]?.url || '/default-image.jpg'}
                alt={blog.title}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-4">{blog.description}</p>
                <Link
                  to={`/editblog/${blog._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Edit Blog
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlog;
