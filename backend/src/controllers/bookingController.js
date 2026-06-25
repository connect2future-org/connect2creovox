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

    const referenceImages =
      req.files?.map(file => file.filename) || [];

    const booking = await Booking.create({

      user: req.user.id,

      serviceName: req.body.serviceName,

      companyName: req.body.companyName,

      clientName: req.body.clientName,

      email: req.body.email,

      phone: req.body.phone,

      budget: req.body.budget,

      description: req.body.description,

      referenceImages

    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
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