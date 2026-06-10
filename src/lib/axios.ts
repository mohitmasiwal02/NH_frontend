import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { store } from './store';
import { setTokens, logout } from './store/slices/authSlice';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Unauthenticated instance — for login, refresh, public routes
export const publicAxios = axios.create({ baseURL: BASE_URL });

// Authenticated instance — attaches Bearer token and handles refresh
export const authAxios = axios.create({ baseURL: BASE_URL });

authAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: { resolve: (v: unknown) => void; reject: (e: unknown) => void }[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve(token);
  });
  failedQueue = [];
};

authAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return authAxios(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = store.getState().auth.refreshToken;
    if (!refreshToken) {
      store.dispatch(logout());
      isRefreshing = false;
      return Promise.reject(error);
    }

    try {
      const { data } = await publicAxios.post('/auth/refresh', { refreshToken });
      store.dispatch(setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken }));
      processQueue(null, data.accessToken);
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return authAxios(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError as AxiosError, null);
      store.dispatch(logout());
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
