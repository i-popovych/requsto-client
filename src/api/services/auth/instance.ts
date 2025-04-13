import axios from 'axios';

export const BASE_URL = 'http://localhost:8080/v1';

export const $authAPI = axios.create({
  baseURL: BASE_URL,
});
