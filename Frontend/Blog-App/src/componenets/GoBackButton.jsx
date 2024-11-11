import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md'; // Importing a back arrow icon

const GoBackButton = ({ className }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <button
      onClick={handleGoBack}
      className={`flex items-center p-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-200 ${className}`}
    >
      <MdArrowBack className="h-5 w-5 mr-2" /> {/* Using React icon here */}
      Go Back
    </button>
  );
};

export default GoBackButton;
