import { useEffect, useState } from "react";
import api from "../../utils/api";

import {
FaUsers,
FaProjectDiagram,
FaCheckCircle,
FaClock,
FaFileUpload,
FaFileAlt
} from "react-icons/fa";

const AdminDashboard = () => {

const [bookings, setBookings] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
fetchBookings();
}, []);

const fetchBookings = async () => {
try {


  const response =
    await api.get("/api/bookings/all");

  setBookings(
    response.data.bookings || []
  );

} catch (error) {

  console.log(error);

} finally {

  setLoading(false);

}


};

const updateStatus = async (
bookingId,
status
) => {


try {

  await api.put(
    `/api/bookings/status/${bookingId}`,
    { status }
  );

  fetchBookings();

} catch (error) {

  console.log(error);

}


};

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

  fetchBookings();

} catch (error) {

  console.log(error);

}


};

const uploadFile = async (
bookingId,
file
) => {


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

  fetchBookings();

} catch (error) {

  console.log(error);

}


};

const totalRequests =
bookings.length;

const pendingRequests =
bookings.filter(
b => b.status === "Pending"
).length;

const activeProjects =
bookings.filter(
b =>
b.status === "Reviewing" ||
b.status === "Proposal Sent" ||
b.status === "In Progress"
).length;

const completedProjects =
bookings.filter(
b => b.status === "Completed"
).length;

if (loading) {


return (
  <div className="min-h-screen flex items-center justify-center">
    Loading Dashboard...
  </div>
);


}

return (


<div className="pt-28 pb-20 bg-[#fffaf5] min-h-screen">

  <div className="max-w-7xl mx-auto px-6">

    <div className="mb-10">

      <h1 className="text-5xl font-bold">
        Admin Dashboard
      </h1>

      <p className="text-gray-500 mt-3">
        Manage all client projects and requests.
      </p>

    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

      <div className="service-card text-center">
        <FaUsers className="mx-auto text-4xl text-pink-500 mb-4" />
        <h3 className="font-bold text-xl">
          Total Requests
        </h3>
        <p>{totalRequests}</p>
      </div>

      <div className="service-card text-center">
        <FaClock className="mx-auto text-4xl text-yellow-500 mb-4" />
        <h3 className="font-bold text-xl">
          Pending
        </h3>
        <p>{pendingRequests}</p>
      </div>

      <div className="service-card text-center">
        <FaProjectDiagram className="mx-auto text-4xl text-blue-500 mb-4" />
        <h3 className="font-bold text-xl">
          Active
        </h3>
        <p>{activeProjects}</p>
      </div>

      <div className="service-card text-center">
        <FaCheckCircle className="mx-auto text-4xl text-green-500 mb-4" />
        <h3 className="font-bold text-xl">
          Completed
        </h3>
        <p>{completedProjects}</p>
      </div>

    </div>

    <div className="bg-white rounded-3xl p-8 shadow-lg">

      <h2 className="text-2xl font-bold mb-8">
        Client Requests
      </h2>

      <div className="space-y-8">

        {bookings.map((booking) => (

          <div
            key={booking._id}
            className="border rounded-2xl p-6"
          >

            <div className="flex justify-between items-start">

              <div>

                <h3 className="font-bold text-xl">
                  {booking.serviceName}
                </h3>

                <p className="text-gray-600 mt-2">
                  {booking.clientName}
                </p>

                <p className="text-gray-500 text-sm">
                  {booking.email}
                </p>

                <p className="text-gray-500 text-sm">
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
                className="border rounded-xl px-3 py-2"
              >
                <option>Pending</option>
                <option>Reviewing</option>
                <option>Proposal Sent</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Rejected</option>
              </select>

            </div>

            <div className="mt-5">

              <p className="font-semibold">
                Project Description
              </p>

              <p className="text-gray-600 mt-2">
                {booking.description}
              </p>

            </div>

            <div className="mt-5">

              <label className="font-semibold block mb-2">
                Admin Notes
              </label>

              <textarea
                defaultValue={
                  booking.adminNotes || ""
                }
                onBlur={(e) =>
                  updateNotes(
                    booking._id,
                    e.target.value
                  )
                }
                rows="4"
                className="w-full border rounded-xl p-3"
                placeholder="Write notes for client..."
              />

            </div>

            <div className="mt-5">

              <label className="font-semibold flex items-center gap-2 mb-3">
                <FaFileUpload />
                Upload Deliverables
              </label>

              <input
                type="file"
                onChange={(e) =>
                  uploadFile(
                    booking._id,
                    e.target.files[0]
                  )
                }
                className="border rounded-xl p-2"
              />

            </div>

            {booking.projectFiles?.length > 0 && (

              <div className="mt-5">

                <h4 className="font-semibold mb-3">
                  Uploaded Files
                </h4>

                <div className="space-y-2">

                  {booking.projectFiles.map(
                    (file, index) => (

                      <a
                        key={index}
                        href={`http://localhost:5000/uploads/project-files/${file.filePath}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
                      >
                        <FaFileAlt />
                        {file.fileName}
                      </a>

                    )
                  )}

                </div>

              </div>

            )}

            {booking.referenceImages?.length > 0 && (

              <div className="mt-5">

                <p className="font-semibold mb-3">
                  Reference Images
                </p>

                <div className="flex flex-wrap gap-3">

                  {booking.referenceImages.map(
                    (img, index) => (

                      <img
                        key={index}
                        src={`http://localhost:5000/uploads/${img}`}
                        alt=""
                        className="w-24 h-24 object-cover rounded-xl border"
                      />

                    )
                  )}

                </div>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>

  </div>

</div>


);

};

export default AdminDashboard;
