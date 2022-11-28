import axios from 'axios';
import REACT_APP_API_URL from '../constants/api';

const instance = axios.create({
  baseURL: REACT_APP_API_URL,
});

export const setHeaders = (AUTH_TOKEN: string) => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;
};

export default instance;
