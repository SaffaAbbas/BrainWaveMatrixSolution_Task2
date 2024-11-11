import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import GoBackButton from '../componenets/GoBackButton';
import { FiEdit } from 'react-icons/fi'; 
import EditBlog from './BlogScreens/EditBlog';
import { Link } from 'react-router-dom';


const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    setImages(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('author', author);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const response = await axios.post('/api/v1/createBlog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Blog created:', response.data);
      setTitle('');
      setDescription('');
      setAuthor('');
      setImages([]);
      navigate('/myBlog');
    } catch (err) {
      console.error('Error creating blog:', err);
      setError('An error occurred while creating the blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <main className="w-full max-w-lg p-8">
        <div className="flex items-center justify-start mb-4">
          <GoBackButton className="mr-4 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-800 text-center flex-1">Create a Blog Post</h1>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex items-center">
              <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
              <FiEdit className="ml-2 text-gray-500 cursor-pointer" />
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4 flex items-center">
              <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
              <FiEdit className="ml-2 text-gray-500 cursor-pointer" />
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              />
            </div>

            <div className="mb-4 flex items-center">
              <label className="block text-gray-700 mb-2" htmlFor="author">Author</label>
              <FiEdit className="ml-2 text-gray-500 cursor-pointer" />
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="images">Upload Images</label>
              <input
                type="file"
                id="images"
                onChange={handleImageUpload}
                multiple
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="mt-2 flex flex-wrap">
                {Array.from(images).map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="w-20 h-20 object-cover rounded mt-2 mr-2 border border-gray-200"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Blog Post'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default BlogForm;
