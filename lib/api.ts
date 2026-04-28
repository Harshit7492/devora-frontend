import axios from "axios";

import { API_BASE_URL } from "@/config/constants";
import { useAuthStore } from "@/store/auth.store";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: true, // sends HttpOnly cookie on every request
});

api.interceptors.request.use((config) => {
  // Also attach Bearer token as fallback for clients where cookies may not work
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      useAuthStore.getState().clearSession();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  },
);
