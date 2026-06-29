const Booking = require("../models/Booking");
const Notification =
require("../models/Notification");


/*
====================================
CREATE BOOKING
====================================
*/
exports.createBooking = async (req, res) => {
  try {

    const sanitize = (value) =>
      typeof value === "string"
        ? value.trim()
        : "";

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex =
      /^[6-9]\d{9}$/;

    const referenceImages =
      req.files?.map(file => file.filename) || [];

    const serviceName = sanitize(req.body.serviceName);
    const companyName = sanitize(req.body.companyName);
    const clientName = sanitize(req.body.clientName);
    const email = sanitize(req.body.email).toLowerCase();
    const phone = sanitize(req.body.phone);
    const budget = sanitize(req.body.budget);
    const description = sanitize(req.body.description);

    // Required Fields

    if (
      !serviceName ||
      !clientName ||
      !email ||
      !phone ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields."
      });
    }

    // Email Validation

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address."
      });
    }

    // Phone Validation

    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit mobile number."
      });
    }

    // Description Validation

    if (description.length < 10) {
      return res.status(400).json({
        success: false,
        message:
          "Description should contain at least 10 characters."
      });
    }

    if (description.length > 2000) {
      return res.status(400).json({
        success: false,
        message:
          "Description is too long."
      });
    }

    // Name Validation

    if (clientName.length < 3) {
      return res.status(400).json({
        success: false,
        message:
          "Client name must contain at least 3 characters."
      });
    }

    if (companyName.length > 100) {
      return res.status(400).json({
        success: false,
        message:
          "Company name is too long."
      });
    }

    const booking = await Booking.create({

      user: req.user.id,

      serviceName,

      companyName,

      clientName,

      email,

      phone,

      budget,

      description,

      referenceImages

    });

    // Notification for user

    await Notification.create({

      user: req.user.id,

      title: "Booking Submitted",

      message:
        `Your booking for "${serviceName}" has been submitted successfully.`

    });

    return res.status(201).json({

      success: true,

      message:
        "Booking created successfully.",

      booking

    });

  } catch (error) {

    console.error("Booking Error:", error);

    if (error.name === "ValidationError") {

      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)
          .map(err => err.message)
          .join(", ")
      });

    }

    return res.status(500).json({

      success: false,

      message:
        "Internal server error."

    });

  }

};


/*
====================================
USER BOOKINGS
====================================
*/

exports.getMyBookings = async (req, res) => {

  try {

    const bookings = await Booking.find({
      user: req.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


/*
====================================
ADMIN - ALL BOOKINGS
====================================
*/

exports.getAllBookings = async (req, res) => {

  try {

    const bookings = await Booking.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


/*
====================================
ADMIN - SINGLE BOOKING
====================================
*/

exports.getBookingById = async (req, res) => {

  try {

    const booking = await Booking.findById(req.params.id)
      .populate("user", "name email");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.status(200).json({
      success: true,
      booking
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


/*
====================================
ADMIN - UPDATE STATUS
====================================
*/

exports.updateStatus = async (req, res) => {

  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    booking.status =
      req.body.status || booking.status;

    booking.adminNotes =
      req.body.adminNotes || booking.adminNotes;

    await booking.save();
    await Notification.create({

user: booking.user,

title: "Project Update",

message:
`Your ${booking.serviceName}
project is now ${booking.status}`

});

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      booking
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


/*
====================================
ADMIN - UPDATE NOTES
====================================
*/

exports.updateAdminNotes = async (req, res) => {

  try {

    const booking =
      await Booking.findById(req.params.id);

    if (!booking) {

      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });

    }

    booking.adminNotes =
      req.body.adminNotes;

    await booking.save();

    res.status(200).json({

      success: true,

      message:
        "Admin notes updated",

      booking

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        error.message

    });

  }

};


/*
====================================
DELETE BOOKING
====================================
*/

exports.deleteBooking = async (req, res) => {

  try {

    const booking =
      await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    await booking.deleteOne();

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



/*
====================================
UPLOAD PROJECT FILE
====================================
*/

exports.uploadProjectFile =
async(req,res)=>{

try{

const booking =
await Booking.findById(
req.params.id
);

if(!booking){

return res.status(404).json({
success:false,
message:"Booking not found"
});

}

booking.projectFiles.push({

fileName:
req.file.originalname,

filePath:
req.file.filename

});

await booking.save();

res.status(200).json({

success:true,

message:
"File uploaded",

booking

});

}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};