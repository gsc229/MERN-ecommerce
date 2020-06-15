import axios from 'axios';
import {API} from '../config'
const axiosWithAuth = () => {
  const jwt = JSON.parse(localStorage.getItem('jwt'));
  
  console.log('BASE URL: ', API)
  return axios.create({
    baseURL: API,
    headers: {
      Authorization: jwt ? `Bearer ${jwt.token}` : '',
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    
    responseType: 'json'
  });
};

export default axiosWithAuth;