import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Login = () => {

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  // ==========================
  // Validate Form
  // ==========================

  const validateLogin = () => {

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const newErrors = {};

    if (!emailRegex.test(email)) {

      newErrors.email =
        "Enter a valid email address";

    }

    if (password.length < 6) {

      newErrors.password =
        "Password must contain at least 6 characters";

    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  // ==========================
  // Login
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateLogin()) return;

    setLoading(true);

    try {

      const success =
        await login(email, password);

        if (success) {

            navigate("/");

        }

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Login failed."

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left Section */}

      <div

        className="hidden lg:flex flex-col justify-center px-16 xl:px-24 relative overflow-hidden"

        style={{

          background:

            "linear-gradient(135deg,#ec4899 0%,#db2777 50%,#be185d 100%)",

        }}

      >

        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-white/10" />

        <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-white/10" />

        <motion.div

          initial={{ opacity: 0, x: -40 }}

          animate={{ opacity: 1, x: 0 }}

          transition={{ duration: 0.6 }}

        >

          <h1 className="text-5xl font-extrabold text-white mb-4">

            Connect2Creovox

          </h1>

          <p className="text-white/80 text-lg">

            Creative-Tech Studio.

            <br />

            Bold Branding.

            <br />

            Robust Engineering.

          </p>

        </motion.div>

      </div>

      {/* Right Section */}

      <div className="flex items-center justify-center bg-white px-6 py-16">

        <motion.div

          initial={{ opacity: 0, y: 30 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6 }}

          className="w-full max-w-md"

        >

          <h2 className="text-3xl font-bold mb-2">

            Welcome Back

          </h2>

          <p className="text-gray-500 mb-8">

            Sign in to continue.

          </p>

          <form

            onSubmit={handleSubmit}

            className="space-y-5"

          >

            {/* Email */}

            <div>

              <label className="font-semibold text-sm">

                Email

              </label>

              <div className="input-group">

                <FaEnvelope className="input-group-icon" />

                <input

                  type="email"

                  className="input input-icon"

                  placeholder="you@example.com"

                  value={email}

                  onChange={(e) =>

                    setEmail(e.target.value)

                  }

                />

              </div>

              {errors.email && (

                <p className="text-red-500 text-xs mt-1">

                  {errors.email}

                </p>

              )}

            </div>

            {/* Password */}

            <div>

              <label className="font-semibold text-sm">

                Password

              </label>

              <div className="input-group">

                <FaLock className="input-group-icon" />

                <input

                  type="password"

                  className="input input-icon"

                  placeholder="••••••••"

                  value={password}

                  onChange={(e) =>

                    setPassword(e.target.value)

                  }

                />

              </div>

              {errors.password && (

                <p className="text-red-500 text-xs mt-1">

                  {errors.password}

                </p>

              )}

            </div>
                        <button

              type="submit"

              disabled={loading}

              className="btn btn-primary w-full justify-center py-4 mt-2 text-base"

            >

              {loading ? (

                "Signing In..."

              ) : (

                <>

                  Sign In

                  <FaArrowRight />

                </>

              )}

            </button>

          </form>

          <p className="text-center mt-8 text-sm text-gray-500">

            Don't have an account?{" "}

            <Link

              to="/register"

              className="text-pink-600 font-semibold hover:text-pink-700 transition-colors"

            >

              Create Account

            </Link>

          </p>

        </motion.div>

      </div>

    </div>

  );

};

export default Login;