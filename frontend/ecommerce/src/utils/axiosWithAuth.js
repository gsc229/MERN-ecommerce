import axios from 'axios';
import {API} from '../config'
const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  console.log('BASE URL: ', API)
  return axios.create({
    baseURL: API,
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: 'application/json'
    }
  });
};

export default axiosWithAuth;