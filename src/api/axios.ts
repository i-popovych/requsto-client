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
    const originalRequest = error.config;

    // if (error.response.status === 401 && !originalRequest._isRetry) {
    //   if (isRefreshing) {
    //     return new Promise<any>((resolve, reject) => {
    //       failedQueue.push({ resolve, reject });
    //     });
    //   }

    //   originalRequest._isRetry = true;
    //   isRefreshing = true;

    //   try {
    //     const { data } = await axios.get<Token>(`${BASE_URL}/refresh`, {
    //       withCredentials: true,
    //     });

    //     authStorage.setTokens(data.authorizationToken, data.refreshToken);
    //     originalRequest.headers.Authorization = 'Bearer ' + data.authorizationToken;
    //     processQueue(null, data);
    //     return await $baseAPI(originalRequest);
    //   } catch (e) {
    //     processQueue(e, null);
    //     alert('You are not authorized');
    //     return Promise.reject(e);
    //   } finally {
    //     isRefreshing = false;
    //   }
    // }

    return Promise.reject(error);
  }
);

export default $baseAPI;
