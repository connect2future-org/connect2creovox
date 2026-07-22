import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../../utils/api";
import AuthBrandPanel from "./AuthBrandPanel";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Minimum 3 characters required";
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid Indian mobile number";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const { confirmPassword, ...data } = formData;
      const response = await api.post("/api/auth/register", data);
      toast.success(response.data.message || "Registration Successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "name", type: "text", label: "Full Name", icon: <FaUser />, placeholder: "Your full name" },
    { name: "email", type: "email", label: "Email", icon: <FaEnvelope />, placeholder: "you@example.com" },
    { name: "phone", type: "text", label: "Phone Number", icon: <FaPhoneAlt />, placeholder: "9876543210" },
    { name: "password", type: "password", label: "Password", icon: <FaLock />, placeholder: "Minimum 6 characters" },
    { name: "confirmPassword", type: "password", label: "Confirm Password", icon: <FaLock />, placeholder: "Re-enter password" },
  ];

  return (
    <div
      className="min-h-screen grid lg:grid-cols-2 pt-20 pb-8"
      style={{ background: "linear-gradient(135deg,#be185d 0%,#db2777 50%,#ec4899 100%)" }}
    >
      {/* Register passes mascotBottom = -32 (moves mascot up) */}
      <AuthBrandPanel
        gradient="linear-gradient(135deg,#be185d 0%,#db2777 50%,#ec4899 100%)"
        title="Welcome to Connect2Creovox"
        subtitle="Create your account and unlock a smarter way to manage your digital projects."
        listItems={[
          "Track project progress",
          "Receive real-time updates",
          "Download deliverables",
          "Communicate directly with our team",
          "Manage bookings and services effortlessly",
        ]}
        mascotBottom={-32}
      />

      {/* Right panel – tightened spacing to fit viewport */}
      <div className="flex items-center justify-center bg-white px-6 py-5 lg:py-7">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-1">Create Account</h2>
          <p className="text-gray-500 mb-4">Start your journey with Connect2Creovox.</p>
          <form onSubmit={handleSubmit} className="space-y-3">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-semibold mb-1">{field.label}</label>
                <div className="input-group">
                  <span className="input-group-icon text-sm">{field.icon}</span>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="input input-icon"
                    required
                  />
                </div>
                {errors[field.name] && <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>}
              </div>
            ))}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full justify-center py-4 mt-1 text-base"
            >
              {loading ? "Creating Account..." : <>Create Account <FaArrowRight /></>}
            </button>
          </form>
          <p className="text-center mt-4 text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-600 font-semibold hover:text-pink-700 transition-colors">
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;