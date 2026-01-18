import axios from "axios";

const URL = import.meta.env.VITE_BASE_URL_BACKEND;

const axiosInstance = axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Basic response / error logging
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;