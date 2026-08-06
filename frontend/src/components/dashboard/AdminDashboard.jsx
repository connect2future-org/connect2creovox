import { useEffect, useState } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";

import {
  FaUsers,
  FaProjectDiagram,
  FaCheckCircle,
  FaClock,
  FaFileUpload,
  FaFileAlt,
  FaSyncAlt,
  FaSearch,
  FaEye,
  FaDownload,
  FaFilePdf,
  FaFileWord,
  FaFileImage,
  FaTrash,
} from "react-icons/fa";


const BASE_URL =
  (import.meta.env.VITE_API_URL || "")
    .trim()
    .replace(/\/$/, "");



const AdminDashboard = () => {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchBookings();
  }, []);

  // ===========================
  // Fetch All Bookings
  // ===========================

  const fetchBookings = async () => {

    try {

      setLoading(true);

      const response =
        await api.get("/api/bookings/all");

      setBookings(
        response.data.bookings || []
      );

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Unable to fetch bookings."

      );

    } finally {

      setLoading(false);

    }

  };

  // ===========================
  // Update Booking Status
  // ===========================

  const updateStatus = async (
    bookingId,
    status
  ) => {

    const confirmed = window.confirm(

      `Change booking status to "${status}"?`

    );

    if (!confirmed) return;

    try {

      await api.put(

        `/api/bookings/status/${bookingId}`,

        { status }

      );

      toast.success("Status Updated");

      fetchBookings();

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Unable to update status."

      );

    }

  };

  // ===========================
  // Update Admin Notes
  // ===========================

  const updateNotes = async (
    bookingId,
    notes
  ) => {

    try {

      await api.put(

        `/api/bookings/notes/${bookingId}`,

        {

          adminNotes: notes

        }

      );

      toast.success("Notes Saved");

      fetchBookings();

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Unable to save notes."

      );

    }

  };

  // ===========================
  // Upload Deliverables
  // ===========================

  const uploadFile = async (
    bookingId,
    file
  ) => {

    if (!file) return;

    const confirmUpload = window.confirm(

      `Upload "${file.name}"?`

    );

    if (!confirmUpload) return;

const allowedTypes = [
  "image/jpeg",

  "application/pdf",

  "application/msword",

  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  "text/plain"
];

    if (!allowedTypes.includes(file.type)) {

  toast.error(
  "Only JPG, PDF, DOC, DOCX and TXT files are allowed."
);

      return;

    }

    if (

      file.size >

      10 * 1024 * 1024

    ) {

      toast.error(

        "Maximum file size is 10 MB."

      );

      return;

    }

    try {

      const formData =
        new FormData();

      formData.append(

        "file",

        file

      );

      await api.post(

        `/api/bookings/upload-file/${bookingId}`,

        formData,

        {

          headers: {

            "Content-Type":

              "multipart/form-data"

          }

        }

      );

      toast.success(

      `${file.name} uploaded successfully.`

      );

      fetchBookings();

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Upload failed."

      );

    }

  };
// ===========================
// File Helpers
// ===========================


const getIcon = (file) => {

switch ((file.extension || "").toLowerCase()) {

case "pdf":

return <FaFilePdf className="text-red-500"/>;

case "doc":

case "docx":

return <FaFileWord className="text-blue-600"/>;

case "jpg":

case "jpeg":

case "png":

return <FaFileImage className="text-pink-500"/>;

case "txt":

return <FaFileAlt className="text-gray-600 text-7xl"/>;

default:

return <FaFileAlt className="text-gray-500"/>;

}

};

const isImage = (file) => {

  return file.resourceType === "image";

};
const viewFile = (file) => {

  window.open(

    file.url,

    "_blank",

    "noopener,noreferrer"

  );

};


const downloadFile = (bookingId, fileId) => {

  window.location.href =
    `${BASE_URL}/api/bookings/file/download/${bookingId}/${fileId}`;

};

// ======================================
// Reference File Helpers
// ======================================
const canPreviewReference = (file) => {

return [

"jpg",

"jpeg",

"png",

"gif",

"webp",

"pdf"

].includes(

(file.extension || "").toLowerCase()

);

};


const openReferenceFile = (file) => {

  window.open(

    file.url,

    "_blank",

    "noopener,noreferrer"

  );

};
const downloadReferenceFile = async (bookingId, file) => {

  try {

    const response = await api.get(

      `/api/bookings/reference/download/${bookingId}/${encodeURIComponent(file.originalName)}`,

      {

        responseType: "blob"

      }

    );

    const blob = new Blob([response.data]);

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = file.originalName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);

  }

  catch (err) {

    console.error(err);

    toast.error("Download failed.");

  }

};
  // ===========================
  // Search Filter
  // ===========================

  const filteredBookings =
    bookings.filter((booking) => {

      const keyword =
        search.toLowerCase();
if (

statusFilter !== "All" &&

booking.status !== statusFilter

){

return false;

}
return (

booking.clientName
?.toLowerCase()
.includes(keyword)

||

booking.companyName
?.toLowerCase()
.includes(keyword)

||

booking.serviceName
?.toLowerCase()
.includes(keyword)

||

booking.email
?.toLowerCase()
.includes(keyword)

||

booking.phone
  ?.toString()
  .includes(keyword.trim())

);

    });

  // ===========================
  // Statistics
  // ===========================

  const totalRequests =
    bookings.length;

  const pendingRequests =
    bookings.filter(

      (b) => b.status === "Pending"

    ).length;

  const activeProjects =
    bookings.filter(

      (b) =>

        b.status === "Reviewing" ||

        b.status === "Proposal Sent" ||

        b.status === "In Progress"

    ).length;

  const completedProjects =
    bookings.filter(

      (b) =>

        b.status === "Completed"

    ).length;

  // ===========================
  // Loading Screen
  // ===========================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-pink-300 border-t-pink-600 rounded-full animate-spin mx-auto"></div>

          <p className="mt-5 text-gray-500">

            Loading bookings and project data...

          </p>

        </div>

      </div>

    );

  }
  return (

<div className="pt-28 pb-20 bg-[#fffaf5] min-h-screen">

  <div className="max-w-7xl mx-auto px-6">

    {/* ===========================
        Header
    =========================== */}

    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10">

      <div>

        <h1 className="text-5xl font-bold text-gray-800">

          Admin Dashboard

        </h1>

        <p className="text-gray-500 mt-3">

          Manage bookings, deliverables, project updates and client communication.

        </p>

      </div>

      <button

        onClick={fetchBookings}

        className="btn btn-outline mt-5 lg:mt-0 flex items-center gap-2"

      >

        <FaSyncAlt />

        Reload Bookings

      </button>

    </div>

    {/* ===========================
        Dashboard Cards
    =========================== */}

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

      <div className="service-card text-center">

        <FaUsers className="mx-auto text-4xl text-pink-500 mb-4" />

        <h3 className="font-bold text-xl">

          Total Requests

        </h3>

        <p className="text-3xl font-bold mt-3">

          {totalRequests}

        </p>
        <p className="text-sm text-gray-500 mt-2">
    All service requests
</p>

      </div>

      <div className="service-card text-center">

        <FaClock className="mx-auto text-4xl text-yellow-500 mb-4" />

        <h3 className="font-bold text-xl">

          Pending

        </h3>

        <p className="text-3xl font-bold mt-3">

          {pendingRequests}

        </p>
        <p className="text-sm text-gray-500 mt-2">
    Awaiting review
</p>

      </div>

      <div className="service-card text-center">

        <FaProjectDiagram className="mx-auto text-4xl text-blue-500 mb-4" />

        <h3 className="font-bold text-xl">

          Active Projects

        </h3>

        <p className="text-3xl font-bold mt-3">

          {activeProjects}

        </p>
        <p className="text-sm text-gray-500 mt-2">
    Currently in progress
</p>

      </div>

      <div className="service-card text-center">

        <FaCheckCircle className="mx-auto text-4xl text-green-500 mb-4" />

        <h3 className="font-bold text-xl">

          Completed

        </h3>

        <p className="text-3xl font-bold mt-3">

          {completedProjects}

        </p>
        <p className="text-sm text-gray-500 mt-2">
  Successfully delivered
</p>

      </div>

    </div>

    {/* ===========================
        Client Requests
    =========================== */}

    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <h2 className="text-2xl font-bold">

          Client Requests

        </h2>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="border rounded-xl px-4 py-3"
  >

    <option>All</option>

    <option>Pending</option>

    <option>Reviewing</option>

    <option>Proposal Sent</option>

    <option>In Progress</option>

    <option>Completed</option>

    <option>Rejected</option>

  </select>

  <div className="relative lg:w-96">

    <FaSearch className="absolute left-4 top-4 text-gray-400" />

    <input
      type="text"
      placeholder="Search by client, company, email, phone or service..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full border rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-pink-300"
    />

  </div>

</div>

      </div>

      {

      filteredBookings.length===0 ?

      (

      <div className="text-center py-20">

        <FaUsers className="mx-auto text-6xl text-pink-200 mb-5"/>

        <h2 className="text-2xl font-bold text-gray-700">

          Client bookings will appear here once users submit their first request.

        </h2>

        <p className="text-gray-500 mt-3">

          No client requests have been submitted yet.

Once users book a service, their requests will appear here.

        </p>

      </div>

      )

      :

      (

      <div className="space-y-8">
        {filteredBookings.map((booking) => (

  <div
    key={booking._id}
    className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
  >

    {/* ======================
        Header
    ====================== */}

    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-5">

      <div>

        <h3 className="text-2xl font-bold text-gray-800">
          {booking.serviceName}
        </h3>

        <p className="text-gray-600 mt-2">
          <strong>Client:</strong> {booking.clientName}
        </p>

        <p className="text-gray-500">
          {booking.email}
        </p>

        <p className="text-gray-500">
          {booking.phone}
        </p>

      </div>

      <select
        value={booking.status}
        onChange={(e) =>
          updateStatus(
            booking._id,
            e.target.value
          )
        }
        className={`border rounded-xl px-4 py-2 font-semibold

        ${booking.status==="Completed"
        ? "bg-green-100 text-green-700"

        : booking.status==="Rejected"

        ? "bg-red-100 text-red-700"

        : booking.status==="Pending"

        ? "bg-yellow-100 text-yellow-700"

        : "bg-blue-100 text-blue-700"
        }

        `}
      >

        <option>Pending</option>

        <option>Reviewing</option>

        <option>Proposal Sent</option>

        <option>In Progress</option>

        <option>Completed</option>

        <option>Rejected</option>

      </select>

    </div>

    {/* ======================
        Description
    ====================== */}

    <div className="mt-6">

      <h4 className="font-semibold text-lg mb-2">
        Project Description
      </h4>

      <p className="text-gray-600 leading-7">
        {booking.description}
      </p>
      {
  booking.referenceImages?.length > 0 && (

    <div className="mt-6">

      <h4 className="font-semibold text-lg mb-4">

        Reference Files

      </h4>

      <div className="grid md:grid-cols-2 gap-4">

        {

          booking.referenceImages.map((file,index)=>(

            <div
              key={index}
              className="border rounded-xl bg-gray-50 p-4 flex flex-col gap-4"
            >

              {/* Preview */}

              {

                file.resourceType === "image" &&
                file.extension !== "pdf"

                ?

                (

                  <img

                    src={file.url}

                    alt={file.originalName}

                    className="w-full h-48 rounded-lg border object-contain bg-white hover:scale-105 transition"

                  />

                )

                :

                (

                  <div className="h-48 flex items-center justify-center bg-white rounded-lg border">

                  {

                  file.extension==="pdf"

                  ?

                  <FaFilePdf className="text-red-500 text-7xl"/>

                  :

                  file.extension==="doc"||

                  file.extension==="docx"

                  ?

                  <FaFileWord className="text-blue-600 text-7xl"/>

                  :

                  file.extension==="txt"

                  ?

                  <FaFileAlt className="text-gray-600 text-7xl"/>

                  :

                  <FaFileAlt className="text-gray-400 text-7xl"/>

                  }

                  </div>

                )

              }

              {/* File Name */}

              <div>

                <p className="font-semibold break-all">

                  {file.originalName}

                </p>

              </div>

              {/* Buttons */}

              <div className="flex gap-3">

                  {
                    (
                      canPreviewReference(file)
                    ) && (

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

                  onClick={() =>

                    downloadReferenceFile(

                    booking._id,

                    file

                    )

                    }

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

    {/* ======================
        Admin Notes
    ====================== */}

    <div className="mt-6">

      <label className="font-semibold block mb-3">

        Admin Notes

      </label>

        <div>

  <textarea
    defaultValue={booking.adminNotes || ""}
    maxLength={1000}
    onBlur={(e) =>
      updateNotes(
        booking._id,
        e.target.value
      )
    }
    rows={4}
    className="w-full border rounded-xl p-4"
    placeholder="Write internal notes..."
  />

<p className="text-xs text-gray-500 mt-2">
  Maximum 1000 characters
</p>

</div>

    </div>

    {/* ======================
        Upload Deliverables
    ====================== */}

    <div className="mt-6">

      <label className="font-semibold flex items-center gap-2 mb-3">

        <FaFileUpload />

        Upload Deliverables

      </label>

      <input

        type="file"
          accept=".jpg,.jpeg,.pdf,.doc,.docx,.txt"
        onChange={(e)=>

          uploadFile(

            booking._id,

            e.target.files[0]

          )

        }

        className="border rounded-xl p-3 w-full"

      />
      <p className="text-xs text-gray-500 mt-2">
  Allowed formats: JPG, PDF, DOC/DOCX, TXT • Maximum 10 MB
</p>

    </div>

    {/* ======================
        Uploaded Files
    ====================== */}

{
booking.projectFiles?.length > 0 && (

<div className="mt-6">

<h4 className="font-semibold mb-4">

Uploaded Files

</h4>

<div className="grid md:grid-cols-2 gap-4">

{booking.projectFiles.map((file,index)=>(

<div
key={index}
className="flex flex-col lg:flex-row lg:items-center lg:justify-between border rounded-xl p-4 bg-gray-50"
>

<div className="flex items-center gap-3">

{getIcon(file)}

<div>

<p className="font-medium">

{file.originalName}

</p>

<div>

<p className="text-xs text-gray-500">

{file.extension.toUpperCase()}

•

{(file.size/1024).toFixed(1)} KB

</p>

  <p className="text-xs text-gray-400 mt-1">

    Uploaded{" "}
    {file.uploadedAt
      ? new Date(file.uploadedAt).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "Unknown"}

  </p>

</div>

</div>

</div>

<div className="flex gap-3 mt-3 lg:mt-0">

<button
onClick={()=>viewFile(file)}
className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2"
>

<FaEye />

View

</button>

<button
  onClick={() => downloadFile(booking._id, file._id)}
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

)
}

        

      

      

    

 

  </div>

))}

      </div>

      )}

    </div>

  </div>

</div>

);

};

export default AdminDashboard;