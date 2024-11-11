import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import blog3 from "../assets/images/blog3.png"; 
import SummaryApi from '../Integartion/index.js';
import { toast } from "react-toastify";
import axios from 'axios'; 

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      try {
        const formData = new FormData();
        for (const key in data) {
          formData.append(key, data[key]);
        }

        const dataResponse = await fetch(SummaryApi.SignUp.url, {
          method: SummaryApi.SignUp.method,
          body: formData,
        });
        const dataApi = await dataResponse.json();
        if (dataResponse.ok) {
          toast.success(dataApi.message);
          navigate("/login");
        } else {
          toast.error(dataApi.message || "An error occurred");
        }
      } catch (error) {
        console.error("Error during signup:", error);
        toast.error("An error occurred during signup");
      }
    } else {
      toast.error("Please check password and confirm password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white shadow-lg rounded-lg flex w-2/3 border border-gray-300 overflow-hidden">
        
        {/* Left Section */}
        <div className="w-1/2 p-10">
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Blog App</h1>
            <p className="text-xl font-medium text-gray-800 mb-6">Sign Up to Design Your Blog</p>
            <img
              src={blog3}
              alt="Blog Illustration"
              className="mt-6 rounded-lg shadow-md w-full"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 bg-gray-50 p-10 rounded-r-lg flex flex-col justify-between border-l border-gray-300">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Account</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              
              <div className="space-y-2">
                <label className="block text-gray-800">Full Name:</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  name="fullName"
                  value={data.fullName}
                  onChange={handleOnChange}
                  className="w-full p-3 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-800">Email:</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="w-full p-3 rounded-lg bg-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-800">Password:</label>
                <div className="flex items-center bg-gray-200 p-3 rounded-lg shadow-md focus-within:ring-2 focus-within:ring-blue-600">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    name="password"
                    value={data.password}
                    onChange={handleOnChange}
                    className="w-full outline-none bg-transparent text-gray-800"
                  />
                  <div className="cursor-pointer text-xl text-gray-600" onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-800">Confirm Password:</label>
                <div className="flex items-center bg-gray-200 p-3 rounded-lg shadow-md focus-within:ring-2 focus-within:ring-blue-600">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={handleOnChange}
                    className="w-full outline-none bg-transparent text-gray-800"
                  />
                  <div className="cursor-pointer text-xl text-gray-600" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition duration-200"
              >
                Sign Up
              </button>
            </form>
          </div>

          <p className="text-center mt-4 text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

