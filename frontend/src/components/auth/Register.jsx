import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import toast from "react-hot-toast";
import React from "react";
import { motion } from "framer-motion";

const Register = () => {
  const [formData, setFormData] = useState({ name:"", email:"", password:"", confirmPassword:"" });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return toast.error("Passwords do not match");
    const { confirmPassword, ...data } = formData;
    const success = await register(data);
    if (success) navigate("/");
  };

  const fields = [
    { name:"name", type:"text", label:"Full Name", icon:<FaUser />, placeholder:"Your full name" },
    { name:"email", type:"email", label:"Email", icon:<FaEnvelope />, placeholder:"you@example.com" },
    { name:"password", type:"password", label:"Password", icon:<FaLock />, placeholder:"Min. 8 characters" },
    { name:"confirmPassword", type:"password", label:"Confirm Password", icon:<FaLock />, placeholder:"Repeat password" },
  ];

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center px-16 xl:px-24 relative overflow-hidden"
           style={{ background: "linear-gradient(135deg,#be185d 0%,#db2777 50%,#ec4899 100%)" }}>
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-white/10 pointer-events-none" />
        <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} className="relative z-10">
          <h1 className="text-4xl xl:text-5xl font-extrabold text-white mb-4">Join Connect2Creovox</h1>
          <p className="text-white/80 text-lg mb-10">Become part of our creative-tech ecosystem.</p>
          <ul className="space-y-3">
            {["Track your projects","Get admin updates","Download deliverables","Direct communication","Manage your requests"].map(item => (
              <li key={item} className="flex items-center gap-3 text-white/90 text-sm">
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="flex items-center justify-center px-6 py-16 bg-white">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-ink mb-2">Create Account</h2>
          <p className="text-ink-muted mb-10 text-sm">Start your journey with Connect2Creovox.</p>
          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map(f => (
              <div key={f.name}>
                <label className="block text-sm font-semibold text-ink mb-2">{f.label}</label>
                <div className="input-group">
                  <span className="input-group-icon text-sm">{f.icon}</span>
                  <input type={f.type} name={f.name} required value={formData[f.name]} onChange={handleChange} className="input input-icon" placeholder={f.placeholder} />
                </div>
              </div>
            ))}
            <button type="submit" className="btn btn-primary w-full justify-center py-4 mt-2 text-base">
              Create Account <FaArrowRight />
            </button>
          </form>
          <p className="text-center mt-8 text-sm text-ink-muted">
            Already have an account?{" "}
            <Link to="/login" className="text-brand-500 font-semibold hover:text-brand-600 transition-colors">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;