import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ service:"", budget:"", timeline:"", name:"", email:"", phone:"", company:"", requirements:"" });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); if(!validateForm()) return; toast.success("Consultation Request Submitted! We'll contact you within 24 hours."); };

  const inputCls = "input";
  const labelCls = "block text-sm font-semibold text-ink mb-2";

  const contactItems = [
    { icon: <FaPhone />,       label: "Phone",   items: ["+91 80889 80347", "+91 70194 36720"], links: ["tel:+918088980347","tel:+917019436720"] },
    { icon: <FaEnvelope />,    label: "Email",   items: ["Docs@connect2future.com","Support@connect2future.com"], links: ["mailto:Docs@connect2future.com","mailto:Support@connect2future.com"] },
    { icon: <FaMapMarkerAlt />,label: "Address", items: ["Mysuru, Karnataka, India"], links: [null] },
  ];
  const [errors,setErrors]=useState({});
  const validateForm=()=>{

      const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const phoneRegex=/^[6-9]\d{9}$/;

      const errors={};

      if(!formData.service)
      errors.service="Select service";

      if(!formData.budget)
      errors.budget="Select budget";

      if(!formData.timeline)
      errors.timeline="Select timeline";

      if(formData.name.trim().length<3)
      errors.name="Invalid name";

      if(!emailRegex.test(formData.email))
      errors.email="Invalid email";

      if(!phoneRegex.test(formData.phone))
      errors.phone="Invalid phone";

      if(formData.requirements.trim().length<10)
      errors.requirements="Minimum 10 characters";

      setErrors(errors);

      return Object.keys(errors).length===0;

      }

  return (
    <div className="pt-20 bg-white">
      <section className="section">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <span className="section-eyebrow">Contact Us</span>
            <h1 className="section-title mt-5">
              Tell Us What{" "}
              <span className="gradient-text">You Need</span>
            </h1>
            <p className="section-subtitle mx-auto mt-5">
              From branding and marketing to websites, ERP solutions and custom software —
              let's build something extraordinary together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-10">

            {/* Sidebar */}
            <div className="flex flex-col gap-5">

              {/* Why card */}
              <div className="card p-7">
                <h3 className="font-bold text-ink text-lg mb-5">Why Connect2Creovox?</h3>
                <ul className="space-y-3">
                  {["End-to-End Execution","Branding + Technology","Dedicated Support","Custom Business Solutions","Pan India Reach"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-ink-muted">
                      <span className="w-5 h-5 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                        <FaArrowRight className="text-brand-500 text-[9px]" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact info */}
              {contactItems.map((c, i) => (
                <div key={i} className="card p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500">{c.icon}</div>
                    <p className="font-semibold text-ink text-sm">{c.label}</p>
                  </div>
                  {c.items.map((item, j) => (
                    c.links[j] ? (
                      <a key={j} href={c.links[j]} className="block text-ink-muted text-sm hover:text-brand-500 transition-colors mt-1">{item}</a>
                    ) : (
                      <p key={j} className="text-ink-muted text-sm mt-1">{item}</p>
                    )
                  ))}
                </div>
              ))}

              {/* WhatsApp */}
              <a href="https://wa.me/917019436720"
                 target="_blank" rel="noopener noreferrer"
                 className="btn text-white text-sm py-3.5 justify-center gap-3"
                 style={{ background: "#25D366", borderRadius: "14px" }}>
                <FaWhatsapp className="text-xl" /> Chat on WhatsApp
              </a>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                className="card p-8 sm:p-10"
              >
                <h3 className="font-bold text-ink text-xl mb-7">Tell Us About Your Project</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls}>Service Required</label>
                    <select name="service" value={formData.service} onChange={handleChange} className={inputCls}>
                      <option value="">Choose Service</option>
                      {["Branding & Visibility","Website Development","Digital Marketing","ERP Solution","CRM Solution","Mobile App","Advertising"].map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Budget</label>
                    <select name="budget" value={formData.budget} onChange={handleChange} className={inputCls}>
                      <option value="">Choose Budget</option>
                      {["Under ₹10K","₹10K – ₹50K","₹50K – ₹1L","₹1L+"].map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Timeline</label>
                    <select name="timeline" value={formData.timeline} onChange={handleChange} className={inputCls}>
                      <option value="">Select Timeline</option>
                      {["Immediate","Within 1 Month","Within 3 Months","Flexible"].map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Company Name</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} className={inputCls} placeholder="Your Company" />
                  </div>
                  <div>
                    <label className={labelCls}>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputCls} placeholder="Your Name" />
                  </div>
                  <div>
                    <label className={labelCls}>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputCls} placeholder="you@company.com" />
                  </div>
                </div>

                <div className="mt-6">
                  <label className={labelCls}>Phone Number</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} className={inputCls} placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="mt-6">
                  <label className={labelCls}>Project Requirements</label>
                  <textarea rows="5" name="requirements" value={formData.requirements} onChange={handleChange} className={inputCls} placeholder="Describe your project, goals and any specific requirements..." />
                </div>

                <button type="submit" className="btn btn-primary mt-8 px-10 py-4 text-base">
                  Submit Request <FaArrowRight />
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