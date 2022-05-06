import axios from 'axios';
import cookie from 'cookie';

const api = axios.create();
api.interceptors.request.use((config) => {
  const { csrftoken } = cookie.parse(document.cookie);
  console.log(csrftoken)
  if (csrftoken) {
    config.headers['X-CSRFTOKEN'] = csrftoken;
  }
  return config;
});

export default api;
