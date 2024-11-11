
import React from "react";
import { Link } from "react-router-dom";
import log from "../images//log.png"
const Header = () => {


  return (
    <header className="absolute top-0 left-0 w-full p-4">
      <div className="flex justify-between items-center">
        <img src={log} className="w-36 h-36  rounded-full"  loading="lazy" alt="Optimized" />
        <nav className="flex gap-6">
          <a href="/" className="text-white hover:text-gray-300">Home</a>
          <a href="#about" className="text-white hover:text-gray-300">About</a>
          <a href="#contact" className="text-white hover:text-gray-300">Contact</a>
          <a href="#team" className="text-white hover:text-gray-300">Portfolio</a>
          <a href="#blog" className="text-white hover:text-gray-300">Blog</a>
        </nav>
        <div className="flex space-x-2">
          <Link to={"/signup"}>
        <button className="px-4 py-2 bg-purple-500 text-white rounded-md">Sign Up</button>
        </Link>
        <Link to={"/login"}>
        <button className="px-4 py-2 bg-purple-500 text-white rounded-md">Sign In</button>
        </Link>
      </div>
      </div>
    </header>

  );
};

export default Header;
