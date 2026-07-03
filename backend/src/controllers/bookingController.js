const path = require("path");
const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");
const Booking = require("../models/Booking");
const axios = require("axios");
const {

  cleanString,

  validateEmail,

  validatePhone,

  validateBudget

} = require("../utils/validation");

const validateObjectId = require("../utils/validateObjectId");
const Notification = require("../models/Notification");

// =======================================================
// Helpers
// =======================================================

const streamDownload = async (file, res) => {

    const response = await axios({

        url: file.url,

        method: "GET",

        responseType: "stream"

    });

    res.setHeader(

        "Content-Type",

        file.mimeType

    );

    res.setHeader(

        "Content-Disposition",

        `attachment; filename="${file.originalName}"`

    );

    response.data.pipe(res);

};




const createNotification = async (
  user,
  title,
  message
) => {

  try {

    await Notification.create({

      user,

      title,

      message

    });

  }

  catch (err) {

    console.error(
      "Notification Error:",
      err.message
    );

  }

};



const ADMIN_EMAIL = "c2creovox_admin@gmail.com"; // Replace with your admin email

const createAdminNotification = async (title, message) => {
  try {
    const User = require("../models/User");

    const admin = await User.findOne({
      email: ADMIN_EMAIL,
      role: "admin",
    });

    if (!admin) return;

    await Notification.create({
      user: admin._id,
      title,
      message,
    });
  } catch (err) {
    console.error("Admin Notification Error:", err.message);
  }
};



// =======================================================
// Upload Buffer to Cloudinary
// =======================================================

const uploadToCloudinary = (file) => {

  return new Promise((resolve, reject) => {

    const imageLikeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf"
];

const resourceType = imageLikeTypes.includes(file.mimetype)
  ? "image"
  : "raw";

    const uploadStream = cloudinary.uploader.upload_stream(

{
    folder: "booking-files",

    resource_type: resourceType,

    use_filename: true,

    unique_filename: false,

    filename_override: file.originalname,

    public_id:
        Date.now() +
        "-" +
        path.basename(
            file.originalname,
            path.extname(file.originalname)
        )
},

      (error, result) => {

        if (error) return reject(error);

        resolve(result);

      }

    );

    streamifier
      .createReadStream(file.buffer)
      .pipe(uploadStream);

  });

};
// =======================================================
// CREATE BOOKING
// =======================================================

exports.createBooking = async (req, res) => {

  try {
// ======================================
// Sanitize Inputs
// ======================================

req.body.serviceName = cleanString(req.body.serviceName);

req.body.companyName = cleanString(req.body.companyName);

req.body.clientName = cleanString(req.body.clientName);

req.body.email = cleanString(req.body.email);

req.body.phone = cleanString(req.body.phone);

req.body.budget = cleanString(req.body.budget);

req.body.description = cleanString(req.body.description);

// ======================================
// Validate Email
// ======================================

if (!validateEmail(req.body.email)) {

    return res.status(400).json({

        success: false,

        message: "Invalid email address."

    });

}

// ======================================
// Validate Phone
// ======================================

if (!validatePhone(req.body.phone)) {

    return res.status(400).json({

        success: false,

        message: "Invalid phone number."

    });

}

// ======================================
// Validate Budget
// ======================================

if (!validateBudget(req.body.budget)) {

    return res.status(400).json({

        success: false,

        message: "Invalid budget selected."

    });

}


if (process.env.NODE_ENV === "development") {
  console.log("========== BOOKING REQUEST ==========");
  console.log("BODY:", req.body);
  console.log("FILES:", req.files);
  console.log("=====================================");
}
 const serviceName = req.body.serviceName;

const companyName = req.body.companyName || "";

const clientName = req.body.clientName;

const email = req.body.email.toLowerCase();

const phone = req.body.phone;

const budget = req.body.budget || "";

const description = req.body.description;
  

    // =====================================
    // Uploaded Reference Images
    // =====================================
// =====================================
// Upload Reference Files to Cloudinary
// =====================================

const referenceImages = [];

if (req.files && req.files.length > 0) {

  for (const file of req.files) {

    const result = await uploadToCloudinary(file);

    const extension = path
      .extname(file.originalname)
      .replace(".", "")
      .toLowerCase();

    referenceImages.push({

      originalName: cleanString(file.originalname),

      displayName: cleanString(

        path.basename(

          file.originalname,

          path.extname(file.originalname)

        )

      ),

      extension,

      mimeType: file.mimetype,

      size: file.size,

      url: result.secure_url,

      publicId: result.public_id,

      resourceType: result.resource_type

    });

  }

}
  // =====================================
// Maximum Reference Files Check
// =====================================

if (referenceImages.length > 5) {

    return res.status(400).json({

        success: false,

        message: "Maximum 5 reference files are allowed."

    });

}

    // =====================================
    // Required Fields
    // =====================================

    if (

      !serviceName ||

      !clientName ||

      !email ||

      !phone ||

      !description

    ) {

      return res.status(400).json({

        success: false,

        message:
          "Please fill all required fields."

      });

    }
// =====================================
// Company & Client Name Validation
// =====================================

if (companyName.length > 100) {

  return res.status(400).json({

    success: false,

    message: "Company name is too long."

  });

}

if (clientName.length > 100) {

  return res.status(400).json({

    success: false,

    message: "Client name is too long."

  });

}
if (description.length > 3000) {

    return res.status(400).json({

        success:false,

        message:"Description is too long."

    });

}
    // =====================================
    // Create Booking
    // =====================================

    const booking =
      await Booking.create({

        user: req.user._id,

        serviceName,

        companyName,

        clientName,

        email,

        phone,

        budget,

        description,

        referenceImages,

        status: "Pending",

        adminNotes: "",

        projectFiles: []

      });

    // =====================================
    // Create Notification
    // =====================================

    await createNotification(

      booking.user,

      "Booking Submitted",

      `Your booking request for "${serviceName}" has been submitted successfully.`

    );
    await createAdminNotification(
  "New Booking Request",
  `${booking.clientName} submitted a new booking for "${booking.serviceName}".`
);

    return res.status(201).json({

      success: true,

      message:
        "Booking submitted successfully.",

      booking

    });

  }

  catch (error) {

    console.error(
      "Create Booking Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Internal server error."

    });

  }

};
// =======================================================
// GET MY BOOKINGS
// =======================================================

exports.getMyBookings = async (req, res) => {

  try {

    const bookings = await Booking.find({

      user: req.user._id

    })

      .sort({

        createdAt: -1

      })

      .select("-__v");

    return res.status(200).json({

      success: true,

      count: bookings.length,

      bookings

    });

  }

  catch (error) {

    console.error(

      "Get My Bookings Error:",

      error

    );

    return res.status(500).json({

      success: false,

      message: "Unable to fetch your bookings."

    });

  }

};

// =======================================================
// GET ALL BOOKINGS (ADMIN)
// =======================================================

exports.getAllBookings = async (req, res) => {

  try {
      const bookings = await Booking.find()

      .populate({

        path: "user",

        select: "name email role"

      })

      .select("-__v")

      .sort({

        createdAt: -1

      });

    return res.status(200).json({

      success: true,

      count: bookings.length,

      bookings

    });

  }

  catch (error) {

    console.error(

      "Get All Bookings Error:",

      error

    );

    return res.status(500).json({

      success: false,

      message: "Unable to fetch bookings."

    });

  }

};

// =======================================================
// GET SINGLE BOOKING
// =======================================================

exports.getBookingById = async (req, res) => {

  try {
    if (!validateObjectId(req.params.id)) {

    return res.status(400).json({

        success: false,

        message: "Invalid Booking ID."

    });

}
const booking = await Booking.findById(

      req.params.id

    )

      .populate({

        path: "user",

        select: "name email role"

      })

      .select("-__v");

    if (!booking) {

      return res.status(404).json({

        success: false,

        message: "Booking not found."

      });

    }

    return res.status(200).json({

      success: true,

      booking

    });

  }

  catch (error) {

    console.error(

      "Get Booking Error:",

      error

    );

    return res.status(500).json({

      success: false,

      message: "Unable to fetch booking."

    });

  }

};
// =======================================================
// UPDATE BOOKING STATUS (ADMIN)
// =======================================================

exports.updateStatus = async (req, res) => {

  try {
if (!validateObjectId(req.params.id)) {

    return res.status(400).json({

        success: false,

        message: "Invalid Booking ID."

    });

}
    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {

      return res.status(404).json({

        success: false,

        message: "Booking not found."

      });

    }

    const allowedStatus = [

      "Pending",

      "Reviewing",

      "Proposal Sent",

      "In Progress",

      "Completed",

      "Rejected"

    ];

const status =
  cleanString(req.body.status);

    if (!allowedStatus.includes(status)) {

      return res.status(400).json({

        success: false,

        message: "Invalid project status."

      });

    }

    booking.status = status;

    await booking.save();

    // ===============================
    // Notify User
    // ===============================

    await createNotification(

      booking.user,

      "Project Status Updated",

      `Your "${booking.serviceName}" request is now "${status}".`

    );

    return res.status(200).json({

      success: true,

      message:
        "Project status updated successfully.",

      booking

    });

  }

  catch (error) {

    console.error(

      "Update Status Error:",

      error

    );

    return res.status(500).json({

      success: false,

      message:
        "Unable to update booking status."

    });

  }

};

// =======================================================
// UPDATE ADMIN NOTES
// =======================================================

exports.updateAdminNotes = async (req, res) => {

  try {
    if (!validateObjectId(req.params.id)) {

    return res.status(400).json({

        success: false,

        message: "Invalid Booking ID."

    });

}
    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {

      return res.status(404).json({

        success: false,

        message:
          "Booking not found."

      });

    }

const notes =
  cleanString(req.body.adminNotes);
  if (!notes.trim()) {

    return res.status(400).json({

        success:false,

        message:"Admin notes cannot be empty."

    });

}
      if (notes.length > 1000) {
  return res.status(400).json({
    success: false,
    message: "Admin notes are too long."
  });
}

    booking.adminNotes = notes;

    await booking.save();

    // ===============================
    // Notify User
    // ===============================

    if (notes.length > 0) {

      await createNotification(

        booking.user,

        "Admin Updated Your Project",

        `New project notes have been added for "${booking.serviceName}".`

      );

    }

    return res.status(200).json({

      success: true,

      message:
        "Admin notes updated successfully.",

      booking

    });

  }

  catch (error) {

    console.error(

      "Update Notes Error:",

      error

    );

    return res.status(500).json({

      success: false,

      message:
        "Unable to update admin notes."

    });

  }

};
// =======================================================
// UPLOAD PROJECT FILE (ADMIN)
// =======================================================
// =======================================================
// UPLOAD PROJECT FILE (ADMIN)
// =======================================================

exports.uploadProjectFile = async (req, res) => {

  try {

    if (!validateObjectId(req.params.id)) {

      return res.status(400).json({

        success: false,

        message: "Invalid Booking ID."

      });

    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {

      return res.status(404).json({

        success: false,

        message: "Booking not found."

      });

    }

    if (!req.file) {

      return res.status(400).json({

        success: false,

        message: "Please select a file."

      });

    }

    if (req.file.size > 20 * 1024 * 1024) {

      return res.status(400).json({

        success: false,

        message: "Maximum file size is 20MB."

      });

    }

    if (booking.projectFiles.length >= 20) {

      return res.status(400).json({

        success: false,

        message: "Maximum project files reached."

      });

    }

    // ==========================================
    // Upload to Cloudinary
    // ==========================================

    const result = await uploadToCloudinary(req.file);

    const extension = path
      .extname(req.file.originalname)
      .replace(".", "")
      .toLowerCase();

    booking.projectFiles.push({

      originalName: cleanString(req.file.originalname),

      displayName: cleanString(

        path.basename(

          req.file.originalname,

          path.extname(req.file.originalname)

        )

      ),

      extension,

      mimeType: req.file.mimetype,

      size: req.file.size,

      url: result.secure_url,

      publicId: result.public_id,

      resourceType: result.resource_type,

      uploadedAt: new Date()

    });

    await booking.save();

    await createNotification(

      booking.user,

      "Project Deliverable Uploaded",

      `A new project file has been uploaded for "${booking.serviceName}".`

    );

    return res.status(200).json({

      success: true,

      message: "Project file uploaded successfully.",

      booking

    });

  }

  catch (error) {

    console.error("Upload Project File Error:", error);

    return res.status(500).json({

      success: false,

      message: "Unable to upload project file."

    });

  }

};
// =======================================================
// DELETE BOOKING
// =======================================================

exports.deleteBooking = async (req, res) => {

  try {
    if (!validateObjectId(req.params.id)) {

    return res.status(400).json({

        success: false,

        message: "Invalid Booking ID."

    });

}
    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {

      return res.status(404).json({

        success: false,

        message: "Booking not found."

      });

    }

    // ---------------------------------
    // Delete Reference Images
    // ---------------------------------

for (const file of booking.referenceImages) {

    try {

        await cloudinary.uploader.destroy(

            file.publicId,

            {

                resource_type:file.resourceType

            }

        );

    }

 catch(err){

    console.error(

        "Failed to delete:",

        file.publicId,

        err.message

    );

}

}

for (const file of booking.projectFiles) {

    try {

        await cloudinary.uploader.destroy(

            file.publicId,

            {

                resource_type:file.resourceType

            }

        );

    }

  catch(err){

    console.error(

        "Failed to delete:",

        file.publicId,

        err.message

    );

}

}
    // ---------------------------------
    // Delete Project Files
    // ---------------------------------


    await booking.deleteOne();

    await createNotification(

      booking.user,

      "Booking Removed",

      `Your booking for "${booking.serviceName}" has been removed.`

    );

    return res.status(200).json({

      success: true,

      message: "Booking deleted successfully."

    });

  }

  catch (error) {

    console.error(

      "Delete Booking Error:",

      error

    );

    return res.status(500).json({

      success: false,

      message: "Unable to delete booking."

    });

  }

};
// =======================================================
// DELETE PROJECT FILE
// =======================================================

exports.deleteProjectFile = async (req, res) => {

  try {

    const { bookingId, fileId } = req.params;
    if (!validateObjectId(bookingId)) {

    return res.status(400).json({

        success: false,

        message: "Invalid Booking ID."

    });

}
    const booking = await Booking.findById(bookingId);

    if (!booking) {

      return res.status(404).json({

        success: false,

        message: "Booking not found."

      });

    }

    const file = booking.projectFiles.id(fileId);

    if (!file) {

      return res.status(404).json({

        success: false,

        message: "File not found."

      });

    }
try {

    await cloudinary.uploader.destroy(

        file.publicId,

        {

            resource_type: file.resourceType

        }

    );

}

catch(err){

    console.error(

        "Cloudinary Delete Error:",

        err.message

    );

}
  


    file.deleteOne();

    await booking.save();

    await createNotification(

      booking.user,

      "Project File Removed",

      `A project file for "${booking.serviceName}" has been removed.`

    );

    return res.status(200).json({

      success: true,

      message: "Project file deleted successfully.",

      booking

    });

  }

  catch (error) {

    console.error(

      "Delete Project File Error:",

      error

    );

    return res.status(500).json({

      success: false,

      message: "Unable to delete project file."

    });

  }

};

// =======================================================
// DOWNLOAD PROJECT FILE
// =======================================================

exports.downloadProjectFile = async (req, res) => {

  try {

    const { bookingId, fileId } = req.params;

    if (!validateObjectId(bookingId)) {

      return res.status(400).json({

        success: false,

        message: "Invalid Booking ID."

      });

    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {

      return res.status(404).json({

        success: false,

        message: "Booking not found."

      });

    }

    if (

      req.user.role !== "admin" &&

      booking.user.toString() !== req.user._id.toString()

    ) {

      return res.status(403).json({

        success: false,

        message: "Access denied."

      });

    }

    const file = booking.projectFiles.id(fileId);

    if (!file) {

      return res.status(404).json({

        success: false,

        message: "File not found."

      });

    }

    return streamDownload(file, res);

  }

  catch (error) {

    console.error("Download File Error:", error);

    return res.status(500).json({

      success: false,

      message: "Unable to download file."

    });

  }

};
exports.downloadReferenceFile = async (req,res)=>{

    try{

        const { bookingId,fileName } = req.params;
        if (!validateObjectId(bookingId)) {

    return res.status(400).json({

        success: false,

        message: "Invalid Booking ID."

    });

}

        const booking = await Booking.findById(bookingId);

        if(!booking){

            return res.status(404).json({

                success:false,

                message:"Booking not found"

            });

        }

        if(

            req.user.role!=="admin" &&

            booking.user.toString()!==req.user._id.toString()

        ){

            return res.status(403).json({

                success:false,

                message:"Access denied"

            });

        }
const file = booking.referenceImages.find(

file =>

file.originalName===fileName ||

file.displayName===fileName ||

file.publicId===fileName

);

if (!file) {

    return res.status(404).json({

        success:false,

        message:"Reference file not found."

    });

}

return streamDownload(file, res);
        

    }

catch(err){

    console.error(

        "Download Reference Error:",

        err

    );

    return res.status(500).json({

        success:false,

        message:"Unable to download"

    });

}

};


exports.viewReferenceFile = async (req,res)=>{

    try{

        const { bookingId,fileName } = req.params;
        if (!validateObjectId(bookingId)) {

    return res.status(400).json({

        success: false,

        message: "Invalid Booking ID."

    });

}

        const booking = await Booking.findById(bookingId);

        if(!booking){

            return res.status(404).json({

                success:false,

                message:"Booking not found"

            });

        }

        if(

            req.user.role!=="admin" &&

            booking.user.toString()!==req.user._id.toString()

        ){

            return res.status(403).json({

                success:false,

                message:"Access denied"

            });

        }
const file = booking.referenceImages.find(

    f =>

        f.originalName === fileName ||

        f.displayName === fileName ||

        f.publicId === fileName

);

if (!file) {

    return res.status(404).json({

        success:false,

        message:"Reference file not found."

    });

}

return res.redirect(file.url);

    }

catch(err){

    console.error(

        "View Reference Error:",

        err

    );

    return res.status(500).json({

        success:false,

        message:"Unable to download"

    });

}

};

// =======================================================
// VIEW PROJECT FILE
// =======================================================
// =======================================================
// VIEW PROJECT FILE
// =======================================================

exports.viewProjectFile = async (req, res) => {

  try {

    const { bookingId, fileId } = req.params;

    if (!validateObjectId(bookingId)) {

      return res.status(400).json({

        success: false,

        message: "Invalid Booking ID."

      });

    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {

      return res.status(404).json({

        success: false,

        message: "Booking not found."

      });

    }

    if (

      req.user.role !== "admin" &&

      booking.user.toString() !== req.user._id.toString()

    ) {

      return res.status(403).json({

        success: false,

        message: "Access denied."

      });

    }

    const file = booking.projectFiles.id(fileId);

    if (!file) {

      return res.status(404).json({

        success: false,

        message: "File not found."

      });

    }

    return res.redirect(file.url);

  }

  catch (error) {

    console.error("View File Error:", error);

    return res.status(500).json({

      success: false,

      message: "Unable to open file."

    });

  }

};