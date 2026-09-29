import axios from "axios";
import toast from "react-hot-toast";
import {
  normalizeApiBaseUrl,
  normalizeApiRequestPath,
} from "./apiRoutes";

// ======================================
// Axios Instance
// ======================================

const api = axios.create({

  baseURL:
    normalizeApiBaseUrl(import.meta.env.VITE_API_URL),

  timeout: 15000,

});

if (!import.meta.env.VITE_API_URL) {
  console.warn(
    "VITE_API_URL is not set. API calls will use relative URLs."
  );
}

// ======================================
// Request Interceptor
// ======================================

api.interceptors.request.use(

  (config) => {

    config.url =
      normalizeApiRequestPath(config.url);

    const token =
      localStorage.getItem("token");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  },

  (error) => {

    return Promise.reject(error);

  }

);

// ======================================
// Response Interceptor
// ======================================

api.interceptors.response.use(

  (response) => response,

  (error) => {

    // ---------------------------
    // No Internet
    // ---------------------------

    if (!error.response) {

      toast.error(
        "Unable to connect to the server."
      );

      return Promise.reject(error);

    }

    const status = error.response.status;

    // ---------------------------
    // Unauthorized
    // ---------------------------

    if (status === 401) {

      localStorage.removeItem("token");

      if (
        window.location.pathname !== "/login"
      ) {

        toast.error(
          "Session expired. Please login again."
        );

        window.location.href = "/login";

      }

    }

    // ---------------------------
    // Forbidden
    // ---------------------------

    else if (status === 403) {

      toast.error(
        "You are not authorized."
      );

    }

    

    return Promise.reject(error);

  }

);

export default api;