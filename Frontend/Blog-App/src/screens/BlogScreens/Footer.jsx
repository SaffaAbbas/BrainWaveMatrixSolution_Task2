
import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <section  id="contact" className='absolute mt-6 w-full bg-black text-white flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-4 px-10 py-14 lg:px-20 lg:py-28'>
      <div className='max-sm:flex-col font-semibold flex flex-col justify-center items-start gap-2 w-full lg:w-[40%] ml-12'>
        <h1 className='text-purple-500 font-bold text-4xl'>Skillup Hub</h1>
        <p className='text-lg text-gray-300'> Welcome to Digital Learning, your destination for premium services. We offer a curated selection of courses, jobs, and wellness products to help you look and feel your best.</p>
        <div className='flex justify-center items-center gap-4 mt-7' id='logos'>
          <span className='bg-black p-2 rounded-full cursor-pointer hover:bg-red-600'><FiFacebook /></span>
          <p className='-ml-5'>Facebook</p> 
          <span className='bg-black p-2 rounded-full cursor-pointer hover:bg-red-600'><FiTwitter /></span>
          <p className='-ml-5'>Twitter</p>
          <span className='bg-black p-2 rounded-full cursor-pointer hover:bg-red-600'><FiInstagram /></span>
          <p className='-ml-5'>Instagram</p>
        </div>
      </div>

      <div className='font-semibold flex flex-col justify-center items-start lg:items-center w-full lg:w-[20%] gap-1'>
        <ul className='flex flex-col justify-center items-center gap-3'>
          <h1 className='text-xl font-bold text-purple-500'>Services</h1>
          <li className='text-gray-300 cursor-pointer hover:bg-red-600 hover:text-white'>Services</li>
          <li className='text-gray-300 cursor-pointer hover:bg-red-600 hover:text-white'>About Us</li>
          <li className='text-gray-300 cursor-pointer hover:bg-red-600 hover:text-white'>Teams</li>
          <li className='text-gray-300 cursor-pointer hover:bg-red-600 hover:text-white'>Blogs</li>
        </ul>
      </div>

      <div className='max-sm:flex-col font-semibold flex flex-col justify-center items-start lg:items-center w-full lg:w-[20%] gap-1'>
        <ul className='max-sm:flex-col flex flex-col justify-center items-center gap-3'>
          <h1 className='max-sm:flex-col text-xl font-bold text-purple-500'>Contact Details</h1>
          <li className='max-sm:flex-col max-md:flex-col text-gray-300 cursor-pointer hover:bg-red-600 hover:text-white'>skillupsupport@gamil
            .com</li>
          <li className='max-md:flex-col text-gray-300 cursor-pointer hover:bg-red-600 hover:text-white'>+1 (51) 519877636</li>
        </ul>
      </div>
    
      <div className='flex flex-col max-sm:flex-col gap-2 bottom-10 sm-pt-10 border-t-[1px] mt-10 max-sm:mt-[1] lg:flex-row justify-end lg:items-end mt-4 max-md:flex-row gap-1 lg:flex justify-end items-center flex-col relative lg:absolute bottom-10 text-gap-2 left-50 w-5/6 border-t border-gray-300 mt-8 ml-6'> 
        <p className='mr-auto mr-20 flex flex-col max-sm:flex-col hover:text-white hover:bg-red-600 relative font-semibold'>DSCODE 2023 © All rights reserved</p><br></br>
        <p className='md-absolute flex flex-col max-sm:flex-col hover:bg-red-600 hover:text-white relative font-semibold'>Terms & Condition</p><br></br> 
        <p className='flex flex-col max-sm:flex-col hover:bg-red-600 hover:text-white relative font-semibold'>Privacy Policy</p>
      </div>
    </section>
  );
};

export default Footer;
