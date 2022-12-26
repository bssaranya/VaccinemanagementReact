import axios from 'axios';

export const jsonInstance = axios.create({
  baseURL: 'http://localhost:5000/',
});
