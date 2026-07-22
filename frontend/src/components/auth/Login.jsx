import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import AuthBrandPanel from "./AuthBrandPanel";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};
    if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;
    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @media (max-height: 800px) {
          .auth-grid {
            min-height: auto !important;
          }
        }
      `}</style>
      <div
        className="auth-grid grid lg:grid-cols-2 pt-16 lg:pt-20 lg:min-h-screen"
        style={{ background: "linear-gradient(135deg,#ec4899 0%,#db2777 50%,#be185d 100%)" }}
      >
        <AuthBrandPanel
          title="Welcome Back"
          subtitle={
            <>
              Continue building premium digital experiences with Connect2Creovox.<br />
              <span className="text-white/60 text-base block mt-2">
                Creative Solutions. Powerful Technology. Exceptional Results.
              </span>
              <span className="text-white/50 text-sm block mt-1">
                Helping businesses grow through branding, web development, software solutions, and digital innovation.
              </span>
            </>
          }
        />

        {/* Right panel – align top on small screens, center on desktop */}
        <div className="flex items-start justify-center lg:items-center bg-white px-6 py-8 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-500 mb-8">Sign in to continue.</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-semibold text-sm">Email</label>
                <div className="input-group">
                  <FaEnvelope className="input-group-icon" />
                  <input
                    type="email"
                    className="input input-icon"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="font-semibold text-sm">Password</label>
                <div className="input-group">
                  <FaLock className="input-group-icon" />
                  <input
                    type="password"
                    className="input input-icon"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full justify-center py-4 mt-2 text-base"
              >
                {loading ? "Signing In..." : <>Sign In <FaArrowRight /></>}
              </button>
            </form>
            <p className="text-center mt-8 text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-pink-600 font-semibold hover:text-pink-700 transition-colors">
                Create Account
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;