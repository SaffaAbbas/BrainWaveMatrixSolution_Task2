
import { useDispatch } from 'react-redux';
import setUserDetails from './userSlice'; 
import axios from 'axios';
import SummaryApi from '.';

const useFetchAllUsers = () => {
  const dispatch = useDispatch();

  const fetchAllUsers = async () => {
    try {
      const response = await axios({
        url: SummaryApi.Dashboard.url,
        method: SummaryApi.Dashboard.method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true, 
      });

      const data = response.data; 
      console.log(data); 
  
      if (response.status === 200 && data.success && Array.isArray(data.data)) {
        dispatch(setUserDetails(data.data));
        return data.data; 
      } else {
        console.error('Error fetching user details:', data.message || 'Unknown error');
        return []; 
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      return []; 
    }
  };

  return fetchAllUsers; 
};

export default useFetchAllUsers;
