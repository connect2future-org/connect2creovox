import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../utils/api";
import toast from "react-hot-toast";
import { FaArrowRight, FaUpload } from "react-icons/fa";

const BookService = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serviceName: id,
    companyName: "",
    clientName: "",
    email: "",
    phone: "",
    budget: "",
    description: "",
  });

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const removeFile = (index) => {

  setFiles((prev) =>
    prev.filter((_, i) => i !== index)
  );

};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleFileChange = (e) => {

  const selectedFiles = [...e.target.files];

  if (selectedFiles.length > 5) {

    toast.error(
      "You can upload a maximum of 5 files."
    );

    return;

  }

const allowedExtensions = [

  "jpg",

  "jpeg",

  "pdf",

  "doc",

  "docx",

  "txt"

];

  for (const file of selectedFiles) {

    const ext =
      file.name
        .split(".")
        .pop()
        .toLowerCase();

    if (!allowedExtensions.includes(ext)) {

      toast.error(

        `${file.name} is not a supported file type.`

      );

      return;

    }

    if (

      file.size >

      10 * 1024 * 1024

    ) {

      toast.error(

        `${file.name} exceeds the 10 MB limit.`

      );

      return;

    }

  }

  setFiles(selectedFiles);

};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (formData.clientName.trim().length < 3) {
      toast.error("Please enter a valid client name.");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!formData.budget) {
      toast.error("Please select a budget.");
      return;
    }

    if (formData.description.trim().length < 10) {
      toast.error("Description should contain at least 10 characters.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      files.forEach((file) => {

        data.append("images", file);

      });

      await api.post("/api/bookings/create", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
  "🎉 Your project request has been submitted successfully. Our team will contact you shortly."
);

      navigate("/user-dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Booking failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "input";
  const labelCls = "block text-sm font-semibold text-ink mb-2";

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: "#faf6f0" }}>
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

          <div className="text-center mb-10">
            <span className="section-eyebrow">Book Service</span>
            <h1 className="section-title mt-4">Submit Your Request</h1>
            <p className="text-ink-muted mt-3 text-sm">Fill in the details and we'll get back to you within 24 hours.</p>
          </div>

          <form onSubmit={handleSubmit} className="card p-8 sm:p-10 space-y-5">

            <div>
              <label className={labelCls}>Service</label>
              <input type="text" name="serviceName" value={formData.serviceName} readOnly className={`${inputCls} bg-gray-50 cursor-not-allowed`} />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Company Name</label>
                <input type="text" name="companyName" placeholder="Your company" onChange={handleChange} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Your Name</label>
                <input type="text" name="clientName" placeholder="Full name" onChange={handleChange} className={inputCls} required />
              </div>
              <div>
                <label className={labelCls}>Email</label>
                <input type="email" name="email" placeholder="you@example.com" onChange={handleChange} className={inputCls} required />
              </div>
              <div>
                <label className={labelCls}>Phone</label>
                <input type="text" name="phone" placeholder="+91 XXXXX XXXXX" onChange={handleChange} className={inputCls} required />
              </div>
            </div>

            <div>
              <label className={labelCls}>Budget</label>
              <select name="budget" onChange={handleChange} className={inputCls}>
                <option value="">Select your budget</option>
                {["Under ₹10K","₹10K – ₹50K","₹50K – ₹1L","₹1L+"].map(o=><option key={o}>{o}</option>)}
              </select>
            </div>

            <div>
              <label className={labelCls}>Project Description</label>
              <textarea name="description" rows="5" onChange={handleChange} className={inputCls} placeholder="Describe your project goals and requirements..." required />
            </div>

            <div>
              <label className={labelCls}>Project Reference Files (Optional)</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center hover:border-brand-300 transition-colors">

              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-50 flex items-center justify-center">

                <FaUpload className="text-brand-500 text-2xl" />

              </div>

              <p className="text-ink-muted text-sm mb-2">

              Upload JPG, PDF, DOC/DOCX or TXT files.

              Maximum 5 files.

              Maximum 10 MB each.

              </p>

              <input

              type="file"

              multiple

              accept=".jpg,.jpeg,.pdf,.doc,.docx,.txt"

              onChange={handleFileChange}

              className="hidden"

              id="file-upload"

              />

              <label

              htmlFor="file-upload"

              className="btn btn-ghost text-sm px-4 py-2 cursor-pointer"

              >

              Browse Files

              </label>
                {files.length > 0 && (

  <div className="mt-5 space-y-3">

    {files.map((file, index) => (

      <div
        key={index}
        className="flex items-center justify-between rounded-xl border bg-gray-50 px-4 py-3"
      >

        <div>

          <p className="font-medium text-sm break-all">

            {file.name}

          </p>

          <p className="text-xs text-gray-500">

            {(file.size / 1024).toFixed(1)} KB

          </p>

        </div>

        <button
          type="button"
          onClick={() => removeFile(index)}
          className="text-red-500 hover:text-red-700 text-sm font-semibold"
        >

          Remove

        </button>

      </div>

    ))}

  </div>

)}


              </div>
                
              </div>
           

            <button type="submit" disabled={loading}
              className="btn btn-primary w-full justify-center py-4 text-base">
              {loading ? "⏳ Submitting Your Request..." : <>Submit Request <FaArrowRight /></>}
            </button>

          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BookService;