import axios from "axios";
import toast from "react-hot-toast";

// ======================================
// Axios Instance
// ======================================

const api = axios.create({

  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000",

  timeout: 15000,

  headers: {

    "Content-Type": "application/json",

  },

});

// ======================================
// Request Interceptor
// ======================================

api.interceptors.request.use(

  (config) => {

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

    // ---------------------------
    // Validation Error
    // ---------------------------

    else if (status === 400) {

      toast.error(

        error.response.data.message ||

        "Invalid request."

      );

    }

    // ---------------------------
    // Server Error
    // ---------------------------

    else if (status >= 500) {

      toast.error(

        "Server error. Please try again later."

      );

    }

    return Promise.reject(error);

  }

);

export default api;