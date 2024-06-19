import axios from 'axios';
import { DEV_API_URL } from '../config/config';
import { Alert } from './AlertService';

axios.interceptors.request.use(function (config) {
  config.baseURL = DEV_API_URL;
  return config;
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.message === 'Network Error') {
      if (error.message === 'Network Error') {
        Alert('error', 'Db Connection Error');
      }
    }
    return Promise.reject(error);
  }
);

const exportedObject = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};

export default exportedObject;
