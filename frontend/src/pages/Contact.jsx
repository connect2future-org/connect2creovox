import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../utils/api";

const Contact = () => {

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({

    service: "",

    budget: "",

    timeline: "",

    name: "",

    email: "",

    phone: "",

    company: "",

    requirements: "",

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

    setErrors({

      ...errors,

      [e.target.name]: "",

    });

  };

  // ==========================
  // Validation
  // ==========================

  const validateForm = () => {

    const newErrors = {};

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex =
      /^[6-9]\d{9}$/;

    if (!formData.service)

      newErrors.service =
        "Please select a service.";

    if (!formData.budget)

      newErrors.budget =
        "Please select your budget.";

    if (!formData.timeline)

      newErrors.timeline =
        "Please select timeline.";

    if (formData.name.trim().length < 3)

      newErrors.name =
        "Name must contain at least 3 characters.";

    if (!emailRegex.test(formData.email))

      newErrors.email =
        "Please enter a valid email.";

    if (!phoneRegex.test(formData.phone))

      newErrors.phone =
        "Enter a valid 10-digit mobile number.";

    if (formData.requirements.trim().length < 10)

      newErrors.requirements =
        "Minimum 10 characters required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  // ==========================
  // Submit Form
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    try {

      setLoading(true);

      const response = await api.post(

        "/api/messages",

        formData

      );

      toast.success(

        response.data.message ||

          "Consultation request submitted successfully."

      );

      setFormData({

        service: "",

        budget: "",

        timeline: "",

        name: "",

        email: "",

        phone: "",

        company: "",

        requirements: "",

      });

      setErrors({});

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

          "Unable to submit request."

      );

    }

    finally {

      setLoading(false);

    }

  };

  const inputCls = "input";

  const labelCls =
    "block text-sm font-semibold text-ink mb-2";

  const contactItems = [

    {

      icon: <FaPhone />,

      label: "Phone",

      items: [

        "+91 80889 80347",

        "+91 70194 36720",

      ],

      links: [

        "tel:+918088980347",

        "tel:+917019436720",

      ],

    },

    {

      icon: <FaEnvelope />,

      label: "Email",

      items: [

        "hr@connect2future.com",

        "Support@connect2future.com",

      ],

      links: [

        "mailto:hr@connect2future.com",

        "mailto:Support@connect2future.com",

      ],

    },

    {

      icon: <FaMapMarkerAlt />,

      label: "Address",

      items: [

        "Mysuru, Karnataka, India",

      ],

      links: [null],

    },

  ];

  return (

    <div className="pt-20 bg-white">

      <section className="section">

        <div className="max-w-7xl mx-auto px-5 sm:px-8">

          <motion.div

            initial={{ opacity: 0, y: 30 }}

            animate={{ opacity: 1, y: 0 }}

            className="text-center mb-16"

          >

            <span className="section-eyebrow">

              Contact Us

            </span>

            <h1 className="section-title mt-5">

              Tell Us What{" "}

              <span className="gradient-text">

                You Need

              </span>

            </h1>

            <p className="section-subtitle mx-auto mt-5">

              From branding and websites to ERP,

              CRM, software and digital marketing,

              we're here to help grow your business.

            </p>

          </motion.div>

          <div className="grid lg:grid-cols-3 gap-10">

            {/* Left Section */}

            <div className="flex flex-col gap-5">
                            {/* Why Choose Us */}

              <div className="card p-7">

                <h3 className="font-bold text-ink text-lg mb-5">

                  Why Connect2Creovox?

                </h3>

                <ul className="space-y-3">

                  {[
                    "End-to-End Execution",
                    "Branding + Technology",
                    "Dedicated Support",
                    "Custom Business Solutions",
                    "Pan India Reach",
                  ].map((item) => (

                    <li

                      key={item}

                      className="flex items-center gap-3 text-sm text-ink-muted"

                    >

                      <span className="w-5 h-5 rounded-full bg-brand-50 flex items-center justify-center shrink-0">

                        <FaArrowRight className="text-brand-500 text-[9px]" />

                      </span>

                      {item}

                    </li>

                  ))}

                </ul>

              </div>

              {/* Contact Cards */}

              {contactItems.map((card, index) => (

                <div

                  key={index}

                  className="card p-6"

                >

                  <div className="flex items-center gap-3 mb-3">

                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500">

                      {card.icon}

                    </div>

                    <h4 className="font-semibold">

                      {card.label}

                    </h4>

                  </div>

                  {card.items.map((item, i) => (

                    card.links[i] ? (

                      <a

                        key={i}

                        href={card.links[i]}

                        className="block text-ink-muted hover:text-brand-500 transition-colors mt-2"

                      >

                        {item}

                      </a>

                    ) : (

                      <p

                        key={i}

                        className="text-ink-muted mt-2"

                      >

                        {item}

                      </p>

                    )

                  ))}

                </div>

              ))}

              {/* WhatsApp */}

              <a

                href="https://wa.me/917019436720"

                target="_blank"

                rel="noopener noreferrer"

                className="btn justify-center text-white py-4"

                style={{

                  background: "#25D366",

                  borderRadius: "14px",

                }}

              >

                <FaWhatsapp className="mr-2 text-lg" />

                Chat on WhatsApp

              </a>

            </div>

            {/* Contact Form */}

            <div className="lg:col-span-2">

              <motion.form

                onSubmit={handleSubmit}

                initial={{ opacity: 0, x: 30 }}

                animate={{ opacity: 1, x: 0 }}

                transition={{ delay: 0.2 }}

                className="card p-8 sm:p-10"

              >

                <h3 className="text-xl font-bold mb-8">

                  Tell Us About Your Project

                </h3>

                <div className="grid md:grid-cols-2 gap-6">

                  {/* Service */}

                  <div>

                    <label className={labelCls}>

                      Service Required

                    </label>

                    <select

                      required

                      name="service"

                      value={formData.service}

                      onChange={handleChange}

                      className={inputCls}

                    >

                      <option value="">

                        Choose Service

                      </option>

                      {[
                        "Branding & Visibility",
                        "Website Development",
                        "Digital Marketing",
                        "ERP Solution",
                        "CRM Solution",
                        "Mobile App",
                        "Advertising",
                      ].map((item) => (

                        <option key={item}>

                          {item}

                        </option>

                      ))}

                    </select>

                    {errors.service && (

                      <p className="text-red-500 text-xs mt-1">

                        {errors.service}

                      </p>

                    )}

                  </div>

                  {/* Budget */}

                  <div>

                    <label className={labelCls}>

                      Budget

                    </label>

                    <select

                      required

                      name="budget"

                      value={formData.budget}

                      onChange={handleChange}

                      className={inputCls}

                    >

                      <option value="">

                        Choose Budget

                      </option>

                      {[
                        "Under ₹10K",
                        "₹10K – ₹50K",
                        "₹50K – ₹1L",
                        "₹1L+",
                      ].map((item) => (

                        <option key={item}>

                          {item}

                        </option>

                      ))}

                    </select>

                    {errors.budget && (

                      <p className="text-red-500 text-xs mt-1">

                        {errors.budget}

                      </p>

                    )}

                  </div>

                  {/* Timeline */}

                  <div>

                    <label className={labelCls}>

                      Timeline

                    </label>

                    <select

                      required

                      name="timeline"

                      value={formData.timeline}

                      onChange={handleChange}

                      className={inputCls}

                    >

                      <option value="">

                        Select Timeline

                      </option>

                      {[
                      "ASAP",
                      "1 Week",
                      "2 Weeks",
                      "1 Month",
                      "Flexible",
                    ].map((item) => (

                        <option key={item}>

                          {item}

                        </option>

                      ))}

                    </select>

                    {errors.timeline && (

                      <p className="text-red-500 text-xs mt-1">

                        {errors.timeline}

                      </p>

                    )}

                  </div>

                  {/* Company */}

                  <div>

                    <label className={labelCls}>

                      Company Name

                    </label>

                    <input

                      type="text"

                      name="company"

                      value={formData.company}

                      onChange={handleChange}

                      className={inputCls}

                      placeholder="Your Company"

                    />

                  </div>
                                    {/* Full Name */}

                  <div>

                    <label className={labelCls}>

                      Full Name

                    </label>

                    <input

                      type="text"

                      required

                      name="name"

                      value={formData.name}

                      onChange={handleChange}

                      className={inputCls}

                      placeholder="Your Name"

                    />

                    {errors.name && (

                      <p className="text-red-500 text-xs mt-1">

                        {errors.name}

                      </p>

                    )}

                  </div>

                  {/* Email */}

                  <div>

                    <label className={labelCls}>

                      Email Address

                    </label>

                    <input

                      type="email"

                      required

                      name="email"

                      value={formData.email}

                      onChange={handleChange}

                      className={inputCls}

                      placeholder="you@company.com"

                    />

                    {errors.email && (

                      <p className="text-red-500 text-xs mt-1">

                        {errors.email}

                      </p>

                    )}

                  </div>

                </div>

                {/* Phone */}

                <div className="mt-6">

                  <label className={labelCls}>

                    Phone Number

                  </label>

                  <input

                    type="text"

                    required

                    name="phone"

                    value={formData.phone}

                    onChange={handleChange}

                    className={inputCls}

                    placeholder="9876543210"

                  />

                  {errors.phone && (

                    <p className="text-red-500 text-xs mt-1">

                      {errors.phone}

                    </p>

                  )}

                </div>

                {/* Requirements */}

                <div className="mt-6">

                  <label className={labelCls}>

                    Project Requirements

                  </label>

                  <textarea

                    rows="5"

                    required

                    name="requirements"

                    value={formData.requirements}

                    onChange={handleChange}

                    className={inputCls}

                    placeholder="Describe your project, goals and requirements..."

                  />

                  {errors.requirements && (

                    <p className="text-red-500 text-xs mt-1">

                      {errors.requirements}

                    </p>

                  )}

                </div>

                {/* Submit */}

                <button

                  type="submit"

                  disabled={loading}

                  className="btn btn-primary mt-8 px-10 py-4 text-base w-full justify-center"

                >

                  {loading ? (

                    "Submitting..."

                  ) : (

                    <>

                      Submit Request

                      <FaArrowRight />

                    </>

                  )}

                </button>

              </motion.form>

            </div>

          </div>

        </div>

      </section>

    </div>

  );

};

export default Contact;