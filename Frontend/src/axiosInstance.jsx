import axios from 'axios';

const apiUrl =  'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');   // get the token from local storage
  const userEmail = localStorage.getItem('userEmail');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  //add it to auth header of outgoing req
  }
  if (userEmail) {
    config.data = {
      ...config.data,
      email: userEmail
    };
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;