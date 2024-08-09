import axios from 'axios';

export const fetchMenuList = async () => {
  const response = await axios.get('http://localhost:3001/menu');
  return response.data;
};