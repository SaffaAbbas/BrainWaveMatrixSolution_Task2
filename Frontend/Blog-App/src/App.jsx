
import React from "react"
import { Link, useNavigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";

const App=() => {
  return (
   <div className='bg-green-500'>
    <Outlet>
    <p className="text-center mt-4 text-gray-700">
                        Don't have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
    </Outlet>
     
   </div>
  )
}

export default App
