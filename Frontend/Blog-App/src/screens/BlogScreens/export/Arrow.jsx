// src/components/Arrow.js

import React from 'react';

const Arrow = ({ direction, onClick }) => {
  const isLeft = direction === 'left';

  return (
    <div
      onClick={onClick}
      className={`${
        isLeft ? 'left-4' : 'right-4'
      } absolute top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full cursor-pointer shadow-md hover:bg-gray-300 transition`}
    >
      {isLeft ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-gray-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-gray-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      )}
    </div>
  );
};

export default Arrow;
