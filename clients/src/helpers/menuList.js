import axios from 'axios';

export const fetchMenuList = async () => {
  try {
    const response = await axios.get('http://localhost:3001/menu');
    return response.data;
  } catch (error) {
    console.error('Error fetching menu list:', error);
    throw error;  
  }
};