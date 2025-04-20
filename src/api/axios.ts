import axios from "axios";

import { authStorage } from "../packages/localStorage/authStorage";
import { Token } from "./services/auth/libs/types/Token.type";

export const BASE_URL = import.meta.env.VITE_BASE_API_URL as string;

const $baseAPI = axios.create({
  baseURL: BASE_URL,
});

$baseAPI.interceptors.request.use((config) => {
  const token = authStorage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: Token | null = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

$baseAPI.interceptors.response.use(
  async (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("persist:root");
    }

    return Promise.reject(error);
  }
);

export default $baseAPI;
