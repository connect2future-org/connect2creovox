import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import React from "react";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) navigate("/");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-center px-16 xl:px-24 relative overflow-hidden"
           style={{ background: "linear-gradient(135deg,#ec4899 0%,#db2777 50%,#be185d 100%)" }}>
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />
        <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="relative z-10">
          <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-4">Connect2Creovox</h1>
          <p className="text-white/80 text-lg mb-10 leading-relaxed">Creative-Tech Studio. Bold Branding. Robust Engineering.</p>
          <ul className="space-y-3">
            {["Branding & Visibility","Website Development","ERP / CRM Solutions","Digital Marketing","Advertising Campaigns"].map(item => (
              <li key={item} className="flex items-center gap-3 text-white/90 text-sm">
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Right panel */}
      <div className="flex items-center justify-center px-6 py-16 bg-white">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-ink mb-2">Welcome Back</h2>
          <p className="text-ink-muted mb-10 text-sm">Sign in to continue your journey.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Email</label>
              <div className="input-group">
                <FaEnvelope className="input-group-icon text-sm" />
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="input input-icon" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink mb-2">Password</label>
              <div className="input-group">
                <FaLock className="input-group-icon text-sm" />
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                  className="input input-icon" placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary w-full justify-center py-4 mt-2 text-base">
              {loading ? "Signing In…" : <><span>Sign In</span> <FaArrowRight /></>}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-ink-muted">
            Don't have an account?{" "}
            <Link to="/register" className="text-brand-500 font-semibold hover:text-brand-600 transition-colors">Create Account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;