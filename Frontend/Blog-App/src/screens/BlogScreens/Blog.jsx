import React, { useRef } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { blogPosts } from './export/data.js'; // Ensure this is correctly exported in data.js
import ScrollButton from "./export/ScrollButton.jsx"; // Ensure proper export in ScrollButton.js
const colors = ['bg-orange-300', 'bg-blue-300', 'bg-green-300'];

const Blog = () => {
  const scrollRef = useRef(null); // Create a ref for the scrolling container

  return (
    <section id="blog" className="py-14 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Our Latest Blogs</h2>
        
        {/* Blog Cards Section */}
        <div
          ref={scrollRef} // Attach the ref to the scrolling container
          className="flex overflow-x-auto scrollbar-hidden space-x-8"
          id="blogScrollContainer"
          style={{ scrollbarWidth: 'none' }} // Hide scrollbar for Firefox
        >
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-lg ${colors[index % colors.length]} min-w-[300px] max-w-[300px] transition-transform transform hover:scale-105`}
            >
              <div className='flex justify-center items-center gap-2 mb-2'>
                <span className='p-2 rounded-full cursor-pointer hover:bg-red-600 flex-shrink-0'>
                  <FaCalendarAlt />
                </span>
                <p className='whitespace-nowrap'>{post.date}</p>
              </div>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <div className="flex items-center mb-2">
                <div className="border-t border-white-900 flex-grow"></div>
                <a href="/" className="text-blue-600 hover:underline ml-4">
                  Read More <i className="fas fa-angle-right ml-2"></i>
                </a>
              </div>

              <img
                src={post.image}
                alt={post.title}
                className="mb-2 w-full h-36 object-cover rounded-lg"
                loading="lazy" 
              />
              <p className="text-gray-900 mb-2">{post.description}</p>
            </div>
          ))}
        </div>

        {/* Pass the scrollRef to the ScrollButton */}
        <ScrollButton scrollRef={scrollRef} />
      </div>
    </section>
  );
};

export default Blog;
