import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import {
  FaUser,
  FaProjectDiagram,
  FaClipboardList,
  FaCheckCircle,
  FaDownload,
  FaArrowRight,
  FaClock,
  FaEye,
  FaFileAlt,
  FaFilePdf,
  FaFileWord,
  FaFileImage,
  FaFileText
} from "react-icons/fa";

const statusBadge = (status) => {
  const m = {
    Completed:     "badge-green",
    "In Progress": "badge-blue",
    Reviewing:     "badge-yellow",
    "Proposal Sent":"badge-purple",
    Rejected:      "badge-red",
    Pending:       "badge-pink",
  };
  return m[status] || "badge-gray";
};
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/bookings/my-bookings")
      .then(r => setBookings(r.data.bookings || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
 // ===============================
// File Helpers
// ===============================

const getExtension = (fileName="") =>
fileName.split(".").pop().toLowerCase();

switch (ext) {

  case "pdf":
    return <FaFilePdf className="text-red-500" />;

  case "doc":
  case "docx":
    return <FaFileWord className="text-blue-600" />;

  case "jpg":
  case "jpeg":
    return <FaFileImage className="text-pink-500" />;

  case "txt":
    return <FaFileText className="text-gray-600" />;

  default:
    return <FaFileAlt className="text-gray-500" />;

}

const isImage = (file) => {

  const ext = file
    .split(".")
    .pop()
    .toLowerCase();

  return [

    "jpg",
    "jpeg"

  ].includes(ext);

};


const viewFile=(file)=>{

window.open(

`${BASE_URL}/uploads/project-files/${file.filePath}`,

"_blank"

);

};


// ======================================
// Reference File Helpers
// ======================================

const getReferenceFileExtension = (file = "") => {

  return file
    .split(".")
    .pop()
    .toLowerCase();

};
const displayFileName = (name = "") => {

  return name.replace(/^\d+-/, "");

};

const isReferenceImage = (file = "") => {

  return [

    "jpg",

    "jpeg"

  ].includes(

    getReferenceFileExtension(file)

  );

};

const canPreviewReference = (file = "") => {

  return [

    "jpg",

    "jpeg",

    "pdf",

    "txt"

  ].includes(

    getReferenceFileExtension(file)

  );

};

const openReferenceFile = (file) => {

  window.open(

    `${BASE_URL}/uploads/booking-images/${displayFileName(file)}`,

    "_blank"

  );

};

const downloadReferenceFile = (file) => {

  const link = document.createElement("a");

  link.href =
    `${BASE_URL}/uploads/booking-images/${displayFileName(file)}`;

  link.download = file;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

};


// ===============================
// Can Preview File?
// ===============================

const canPreview = (fileName = "") => {

  const ext = fileName
    .split(".")
    .pop()
    .toLowerCase();

  return [

    "pdf",

    "jpg",

    "jpeg",

    "png",

    "gif",

    "webp",

    "txt"

  ].includes(ext);

};


const downloadFile=(file)=>{

const link=document.createElement("a");

link.href=

`${BASE_URL}/uploads/project-files/${file.filePath}`;

link.download=file.fileName;

document.body.appendChild(link);

link.click();

document.body.removeChild(link);

};



  const stats = [
    { icon: <FaClipboardList />,  label: "Total Requests",   value: bookings.length,                                                              color: "from-brand-500 to-pink-400" , description:"All submitted requests"},
    { icon: <FaProjectDiagram />, label: "Active Projects",  value: bookings.filter(b=>["Reviewing","Proposal Sent","In Progress"].includes(b.status)).length, color: "from-sky-500 to-cyan-400" , description:"Currently in progress"},
    { icon: <FaCheckCircle />,    label: "Completed",        value: bookings.filter(b=>b.status==="Completed").length,                              color: "from-teal-500 to-emerald-400" , description:"Successfully delivered"},
    { icon: <FaClock />,          label: "Pending",          value: bookings.filter(b=>b.status==="Pending").length,                                color: "from-amber-500 to-orange-400", description:"Awaiting review"},
  ];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf6f0]">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-ink-muted text-sm">Loading your dashboard…</p>
      </div>
    </div>
  );

  return (
    <div className="pt-24 pb-20 min-h-screen" style={{ background: "#faf6f0" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="section-title">
            Welcome, <span className="gradient-text">{user?.name || "User"}</span>
          </h1>
          <p className="text-ink-muted mt-2">Track your projects and service requests.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="stat-card">
              <div className={`stat-icon bg-gradient-to-br ${s.color} text-white`}>{s.icon}</div>
              <p className="text-3xl font-extrabold text-ink">{s.value}</p>
              <p className="text-ink-muted text-sm mt-1">{s.label}</p>
              <p className="text-xs text-gray-500 mt-2">

              {s.description}

              </p>
            </motion.div>
          ))}
        </div>

        {/* Bookings */}
        <div className="card p-7 sm:p-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-ink">My Service Requests</h2>
            <Link to="/services" className="btn btn-ghost text-sm px-4 py-2">Browse Services <FaArrowRight /></Link>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-300 text-3xl flex items-center justify-center mx-auto mb-4">◆</div>
              <p className="font-semibold text-ink mb-2">No requests yet</p>
              <p className="text-ink-muted text-sm mb-6">Browse our services and submit your first request.</p>
              <Link to="/services" className="btn btn-primary">Explore Services <FaArrowRight /></Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div key={b._id} className="border border-gray-100 hover:border-brand-200 rounded-2xl p-5 sm:p-6 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    <div>
                      <h4 className="font-bold text-ink">{b.serviceName}</h4>
                      <p className="text-ink-muted text-sm mt-1">{b.description}</p>
                      {
  b.referenceImages?.length > 0 && (

    <div className="mt-6">

      <h4 className="font-semibold text-lg mb-4">

        Reference Files

      </h4>

      <div className="grid md:grid-cols-2 gap-4">

        {

          b.referenceImages.map((file,index)=>(

            <div
              key={index}
              className="border rounded-xl bg-gray-50 p-4 flex flex-col gap-4"
            >

              {/* Preview */}

              {

                isReferenceImage(file)

                ?

                (

                  <img

                    src={`${BASE_URL}/uploads/booking-images/${file}`}

                    alt={file}

                    className="w-full h-48 rounded-lg border bg-white object-contain hover:scale-105 transition"

                  />

                )

                :

                (

                  <div className="h-48 rounded-lg border bg-white flex items-center justify-center">

                    {

                      file.toLowerCase().endsWith(".pdf")

                      ?

                      <FaFilePdf className="text-red-500 text-7xl"/>

                      :

                      file.toLowerCase().endsWith(".txt")

                      ?

                      <FaFileText className="text-blue-500 text-7xl"/>

                      :

                      file.toLowerCase().endsWith(".doc")

                      ||

                      file.toLowerCase().endsWith(".docx")

                      ?

                      <FaFileWord className="text-blue-700 text-7xl"/>

                      :

                      <FaFileAlt className="text-gray-500 text-7xl"/>

                    }

                  </div>

                )

              }

              {/* File Name */}

              <div>

                <p className="font-semibold break-all">

                  {file}

                </p>

              </div>

              {/* Buttons */}

              <div className="flex gap-3">

                {

                  canPreviewReference(file)

                  &&

                  (

                    <button

                      onClick={() => openReferenceFile(file)}

                      className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"

                    >

                      <FaEye/>

                      View

                    </button>

                  )

                }

                <button

                  onClick={() => downloadReferenceFile(file)}

                  className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"

                >

                  <FaDownload/>

                  Download

                </button>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  )

}
                    </div>
                    <span className={`badge ${statusBadge(b.status)} shrink-0`}>{b.status}</span>
                  </div>

                  {b.adminNotes && (
                    <div className="mt-4 p-4 bg-brand-50 rounded-xl border border-brand-100">
                      <p className="text-brand-600 font-semibold text-xs uppercase tracking-wide mb-1">Admin Update</p>
                      <p className="text-ink-muted text-sm">{b.adminNotes}</p>
                    </div>
                  )}
                  

                {b.projectFiles?.length>0 && (

<div className="mt-6">

<h4 className="font-semibold mb-4">

Project Deliverables

</h4>

<div className="space-y-3">

    {b.projectFiles.map((file,index)=>(

    <div
    key={index}
    className="flex flex-col md:flex-row md:items-center md:justify-between border rounded-xl p-4 bg-gray-50"
    >

    <div className="flex items-center gap-3">

    {getFileIcon(file.fileName)}

    <div>

    <p className="font-medium">

    {displayFileName(file.fileName)}

    </p>

    <p className="text-xs text-gray-500">

    {file.mimeType || "Document"}

    </p>
    <p className="text-xs text-gray-400 mt-1">

    Uploaded{" "}

    {new Date(file.uploadedAt).toLocaleDateString("en-IN")}

    </p>

    </div>

    </div>

<div className="flex gap-3 mt-3 md:mt-0">

{canPreview(file.fileName) && (

<button

onClick={() => viewFile(file)}

className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2"

>

<FaEye />

View

</button>

)}

<button

onClick={() => downloadFile(file)}

className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 flex items-center gap-2"

>

<FaDownload />

Download

</button>

</div>

    </div>

    ))}

</div>

</div>

)}

                  <p className="mt-4 text-xs text-ink-subtle">Submitted {new Date(b.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" })}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;