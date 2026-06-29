import { createContext, useState, useEffect } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // ============================
  // Load User on Refresh
  // ============================

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {

      fetchUser(token);

    } else {

      setLoading(false);

    }

  }, []);

  // ============================
  // Fetch Logged-in User
  // ============================

  const fetchUser = async (token) => {

    try {

      const response = await api.get("/api/auth/me", {

        headers: {

          Authorization: `Bearer ${token}`

        }

      });

      // Backend returns {success,user}

      setUser(response.data.user);

    }

    catch (error) {

      console.error(error);

      localStorage.removeItem("token");

      setUser(null);

    }

    finally {

      setLoading(false);

    }

  };

  // ============================
  // Login
  // ============================

  const login = async (email, password) => {

    try {

      const response = await api.post("/api/auth/login", {

        email: email.trim(),

        password

      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      setUser(user);

      toast.success("Login Successful");

      return true;

    }

    catch (error) {
      throw error;

    }

  };

  // ============================
  // Register
  // ============================

  const register = async (userData) => {

    try {

      const response = await api.post(

        "/api/auth/register",

        {

          ...userData,

          name: userData.name.trim(),

          email: userData.email.trim().toLowerCase(),

          phone: userData.phone?.trim() || ""

        }

      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      setUser(user);

      toast.success("Registration Successful");

      return true;

    }

    catch (error) {

      console.error(error);

      toast.error(

        error.response?.data?.message ||

        "Registration Failed"

      );

      return false;

    }

  };

  // ============================
  // Logout
  // ============================

  const logout = () => {

    localStorage.removeItem("token");

    setUser(null);

    toast.success("Logged out successfully.");

  };

  // ============================
  // Refresh Current User
  // ============================

  const refreshUser = async () => {

    const token = localStorage.getItem("token");

    if (!token) return;

    await fetchUser(token);

  };

  // ============================
  // Context Values
  // ============================

  const value = {

    user,

    loading,

    login,

    register,

    logout,

    refreshUser,

    setUser

  };

  return (

    <AuthContext.Provider value={value}>

      {children}

    </AuthContext.Provider>

  );

};