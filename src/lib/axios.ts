import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized - but only redirect if NOT already on signin page
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Only redirect if this is an authenticated request failure (token expired)
      // Don't redirect if it's a login attempt failure (wrong credentials)
      const isLoginAttempt = originalRequest.url?.includes("/auth/login");

      if (!isLoginAttempt) {
        // Clear tokens and redirect to login
        Cookies.remove("accessToken");
        Cookies.remove("user");
        window.location.href = "/signin";
      }

      return Promise.reject(error);
    }

    // Handle network errors
    if (!error.response) {
      console.error("Network error:", error.message);
      return Promise.reject(
        new Error("Network error. Please check your connection.")
      );
    }

    // Return error with message from backend
    const errorMessage = error.response?.data?.message || "An error occurred";
    return Promise.reject({
      status: error.response?.status,
      message: errorMessage,
      data: error.response?.data,
      response: error.response, // Include response for status code checking
    });
  }
);

export default axiosInstance;
