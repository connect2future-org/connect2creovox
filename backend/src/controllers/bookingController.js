const fs = require("fs");
const path = require("path");

const Booking = require("../models/Booking");
const Notification = require("../models/Notification");

// =======================================================
// Helpers
// =======================================================

const sanitize = (value) => {
  if (typeof value !== "string") return "";
  return value.trim();
};

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phoneRegex =
  /^[6-9]\d{9}$/;

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

// =======================================================
// CREATE BOOKING
// =======================================================

exports.createBooking = async (req, res) => {

  try {

    console.log("========== BOOKING REQUEST ==========");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    console.log("=====================================");

    const serviceName =
      sanitize(req.body.serviceName);

    const companyName =
      sanitize(req.body.companyName);

    const clientName =
      sanitize(req.body.clientName);

    const email =
      sanitize(req.body.email).toLowerCase();

    const phone =
      sanitize(req.body.phone);

    const budget =
      sanitize(req.body.budget);

    const description =
      sanitize(req.body.description);

    // =====================================
    // Uploaded Reference Images
    // =====================================

    const referenceImages =
      req.files
        ? req.files.map(file => file.filename)
        : [];

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
    // Email Validation
    // =====================================

    if (!emailRegex.test(email)) {

      return res.status(400).json({

        success: false,

        message:
          "Please enter a valid email."

      });

    }

    // =====================================
    // Phone Validation
    // =====================================

    if (!phoneRegex.test(phone)) {

      return res.status(400).json({

        success: false,

        message:
          "Please enter a valid mobile number."

      });

    }

    // =====================================
    // Client Name Validation
    // =====================================

    if (

      clientName.length < 3 ||

      clientName.length > 60

    ) {

      return res.status(400).json({

        success: false,

        message:
          "Client name must contain between 3 and 60 characters."

      });

    }

    // =====================================
    // Company Name Validation
    // =====================================

    if (

      companyName.length > 100

    ) {

      return res.status(400).json({

        success: false,

        message:
          "Company name is too long."

      });

    }

    // =====================================
    // Description Validation
    // =====================================

    if (

      description.length < 10

    ) {

      return res.status(400).json({

        success: false,

        message:
          "Description should contain at least 10 characters."

      });

    }

    if (

      description.length > 3000

    ) {

      return res.status(400).json({

        success: false,

        message:
          "Description is too long."

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

    const booking = await Booking.findById(

      req.params.id

    )

      .populate({

        path: "user",

        select: "name email role"

      });

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
      sanitize(req.body.status);

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
      sanitize(req.body.adminNotes);

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

exports.uploadProjectFile = async (req, res) => {

  try {
      console.log("========== ADMIN FILE UPLOAD ==========");
      console.log("Booking ID:", req.params.id);
      console.log("BODY:", req.body);
      console.log("FILE:", req.file);
      console.log("======================================");


      
    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {

      return res.status(404).json({

        success: false,

        message: "Booking not found."

      });

    }

    if (!req.file) {

      return res.status(400).json({

        success: false,

        message: "Please select a file to upload."

      });

    }

    booking.projectFiles.push({

      fileName: req.file.originalname,

      filePath: req.file.filename,

      fileSize: req.file.size,

      mimeType: req.file.mimetype,

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

    console.error(

      "Upload Project File Error:",

      error

    );

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

    if (

      booking.referenceImages?.length

    ) {

      booking.referenceImages.forEach((img) => {

        const imagePath = path.join(

          __dirname,

          "../../uploads",

          img

        );

        if (

          fs.existsSync(imagePath)

        ) {

          fs.unlinkSync(imagePath);

        }

      });

    }

    // ---------------------------------
    // Delete Project Files
    // ---------------------------------

    if (

      booking.projectFiles?.length

    ) {

      booking.projectFiles.forEach((file) => {

        const filePath = path.join(

          __dirname,

          "../../uploads/project-files",

          file.filePath

        );

        if (

          fs.existsSync(filePath)

        ) {

          fs.unlinkSync(filePath);

        }

      });

    }

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

    const fileLocation = path.join(

      __dirname,

      "../../uploads/project-files",

      file.filePath

    );

    if (fs.existsSync(fileLocation)) {

      fs.unlinkSync(fileLocation);

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

    const fileLocation = path.join(

      __dirname,

      "../../uploads/project-files",

      file.filePath

    );

    if (!fs.existsSync(fileLocation)) {

      return res.status(404).json({

        success: false,

        message: "Physical file not found."

      });

    }

    return res.download(

      fileLocation,

      file.fileName

    );

  }

  catch (error) {

    console.error(

      "Download File Error:",

      error

    );

    return res.status(500).json({

      success: false,

      message: "Unable to download file."

    });

  }

};

// =======================================================
// VIEW PROJECT FILE
// =======================================================

exports.viewProjectFile = async (req, res) => {

  try {

    const { bookingId, fileId } = req.params;

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

    const fileLocation = path.join(

      __dirname,

      "../../uploads/project-files",

      file.filePath

    );

    if (!fs.existsSync(fileLocation)) {

      return res.status(404).json({

        success: false,

        message: "Physical file not found."

      });

    }

    return res.sendFile(fileLocation);

  }

  catch (error) {

    console.error(

      "View File Error:",

      error

    );

    return res.status(500).json({

      success: false,

      message: "Unable to open file."

    });

  }

};