import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../../utils/api";

const Register = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    phone: "",

    password: "",

    confirmPassword: ""

  });

  // ==========================
  // Handle Input Change
  // ==========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value

    }));

    setErrors((prev) => ({

      ...prev,

      [name]: ""

    }));

  };

  // ==========================
  // Validate Form
  // ==========================

  const validateForm = () => {

    const newErrors = {};

    const emailRegex =

      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex =

      /^[6-9]\d{9}$/;

    if (!formData.name.trim()) {

      newErrors.name =

        "Name is required";

    }

    else if (formData.name.trim().length < 3) {

      newErrors.name =

        "Minimum 3 characters required";

    }

    if (!emailRegex.test(formData.email)) {

      newErrors.email =

        "Enter a valid email address";

    }

    if (

      formData.phone &&

      !phoneRegex.test(formData.phone)

    ) {

      newErrors.phone =

        "Enter a valid Indian mobile number";

    }

    if (formData.password.length < 6) {

      newErrors.password =

        "Password must contain at least 6 characters";

    }

    if (

      formData.password !==

      formData.confirmPassword

    ) {

      newErrors.confirmPassword =

        "Passwords do not match";

    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  // ==========================
  // Register User
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {

      const {

        confirmPassword,

        ...data

      } = formData;

      const response = await api.post(

        "/api/auth/register",

        data

      );

      toast.success(

        response.data.message ||

        "Registration Successful"

      );

      navigate("/login");

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Registration Failed."

      );

    }

    finally {

      setLoading(false);

    }

  };

  const fields = [

    {

      name: "name",

      type: "text",

      label: "Full Name",

      icon: <FaUser />,

      placeholder: "Your full name"

    },

    {

      name: "email",

      type: "email",

      label: "Email",

      icon: <FaEnvelope />,

      placeholder: "you@example.com"

    },

    {

      name: "phone",

      type: "text",

      label: "Phone Number",

      icon: <FaPhone />,

      placeholder: "9876543210"

    },

    {

      name: "password",

      type: "password",

      label: "Password",

      icon: <FaLock />,

      placeholder: "Minimum 6 characters"

    },

    {

      name: "confirmPassword",

      type: "password",

      label: "Confirm Password",

      icon: <FaLock />,

      placeholder: "Re-enter password"

    }

  ];

  return (

    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left Section */}

      <div

        className="hidden lg:flex flex-col justify-center px-16 xl:px-24 relative overflow-hidden"

        style={{

          background:

            "linear-gradient(135deg,#be185d 0%,#db2777 50%,#ec4899 100%)"

        }}

      >

        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-white/10 pointer-events-none" />

        <motion.div

          initial={{ opacity: 0, x: -30 }}

          animate={{ opacity: 1, x: 0 }}

          transition={{ duration: 0.6 }}

          className="relative z-10"

        >

          <h1 className="text-4xl xl:text-5xl font-extrabold text-white mb-4">

            Join Connect2Creovox

          </h1>

          <p className="text-white/80 text-lg mb-10">

            Become part of our creative-tech ecosystem.

          </p>

          <ul className="space-y-3">

            {[
              "Track your projects",
              "Get admin updates",
              "Download deliverables",
              "Direct communication",
              "Manage your requests"
            ].map((item) => (

              <li

                key={item}

                className="flex items-center gap-3 text-white/90 text-sm"

              >

                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">

                  ✓

                </span>

                {item}

              </li>

            ))}

          </ul>

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

            Create Account

          </h2>

          <p className="text-gray-500 mb-8">

            Start your journey with Connect2Creovox.

          </p>

          <form

            onSubmit={handleSubmit}

            className="space-y-5"

          >
                        {fields.map((field) => (

              <div key={field.name}>

                <label className="block text-sm font-semibold mb-2">

                  {field.label}

                </label>

                <div className="input-group">

                  <span className="input-group-icon text-sm">

                    {field.icon}

                  </span>

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

                {errors[field.name] && (

                  <p className="text-red-500 text-xs mt-1">

                    {errors[field.name]}

                  </p>

                )}

              </div>

            ))}

            <button

              type="submit"

              disabled={loading}

              className="btn btn-primary w-full justify-center py-4 mt-2 text-base"

            >

              {loading ? (

                "Creating Account..."

              ) : (

                <>

                  Create Account

                  <FaArrowRight />

                </>

              )}

            </button>

          </form>

          <p className="text-center mt-8 text-sm text-gray-500">

            Already have an account?{" "}

            <Link

              to="/login"

              className="text-pink-600 font-semibold hover:text-pink-700 transition-colors"

            >

              Sign In

            </Link>

          </p>

        </motion.div>

      </div>

    </div>

  );

};

export default Register;