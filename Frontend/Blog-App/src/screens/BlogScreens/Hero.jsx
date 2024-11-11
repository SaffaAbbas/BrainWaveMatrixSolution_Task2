import React, { useState, useEffect } from 'react';
import Header from './export/header.jsx';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageUrls] = useState([
    'https://www.novonordisk.co.in/content/dam/nncorp/language-masters/en/careers/images/job-ads/2020/Comms-and-Corpo-Affairs_General2.jpg',
    'https://th.bing.com/th/id/OIP.xnbiQnTYo_p0kTqp72ll-gHaDI?rs=1&pid=ImgDetMain',
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [imageUrls]);

  const handleScrollLeft = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  const handleScrollRight = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  return (
    <section className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${imageUrls[imageIndex]})` }}>
      <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold">SkillUp Creative Blog Solutions</h1>
          <p className="mt-4 text-lg">We help you grow your brand in the digital world</p>
          <Link to={"/blog"}>
          <button className="mt-8 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg">Create Blog</button>
          </Link>
        </div>
      </div>
<Header/>

      <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between">
        <button onClick={handleScrollLeft} className="text-white hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12L15.75 4.5" />
          </svg>
        </button>
        <button onClick={handleScrollRight} className="text-white hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 19.5L15.75 12L8.25 4.5" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;
