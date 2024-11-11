import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ScrollButton = ({ scrollRef }) => {
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200; // Customize this value to control scroll distance
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else if (direction === "right") {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    } else {
      console.error("scrollRef is undefined or not properly passed.");
    }
  };

  return (
    <div className="flex justify-center space-x-4 mt-6">
      <button
        onClick={() => scroll("left")}
        className="p-2 bg-gray-500 rounded-full text-white hover:bg-purple-800 shadow-lg"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={() => scroll("right")}
        className="p-2 bg-gray-500 rounded-full text-white hover:bg-purple-800 shadow-lg"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ScrollButton;
