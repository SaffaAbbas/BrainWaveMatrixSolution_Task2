import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import GoBackButton from '../../componenets/GoBackButton';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/v1/blogs/${id}`);
        const { title, description, author, images } = response.data;
        setTitle(title);
        setDescription(description);
        setAuthor(author);
        setImages(images || []); // Ensure images is an array
      } catch (err) {
        console.error(err);
        setError('Error fetching blog details');
      }
    };
    fetchBlog();
  }, [id]);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const uploadedImages = Array.from(files).map((file) => ({
      public_id: '',
      url: URL.createObjectURL(file),
    }));
    setImages(uploadedImages);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.put(`/api/v1/blogs/${id}`, {
        title,
        description,
        author,
        images,
      });
      console.log('Blog updated:', response.data);
      navigate('/blogs');
    } catch (err) {
      console.error(err);
      setError('Error updating blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <main className="w-full max-w-lg p-8">
        <div className="flex items-center justify-start mb-4">
          <GoBackButton className="mr-4 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-800 text-center flex-1">Edit Blog Post</h1>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="author">Author</label>
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
                {images && images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
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
              {loading ? 'Updating...' : 'Update Blog Post'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditBlog;
