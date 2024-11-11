
import './App.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './src/Integartion/index.js';
import Context from './src/Integartion/context.js';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './src/Integartion/userSlice.js';

function App() {
  const dispatch = useDispatch()

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(SummaryApi.SignUp.url, {
        method: SummaryApi.SignUp.method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include'  
      });
  
      const data = await response.json();
      if (data.success) {
        dispatch(setUserDetails(data.data));
      } else {
        console.error('Error fetching user details:', data.message);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
 
  

  useEffect(()=>{
    fetchUserDetails();

  },[])
  return (
    <>
      <Context.Provider value={{
          fetchUserDetails,

      }}>
        <ToastContainer 
          position='top-center'
        />
        
        {/* <Header/> */}
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet/>
        </main>
        {/* <Footer/> */}
      </Context.Provider>
    </>
  );
}

export default App;
