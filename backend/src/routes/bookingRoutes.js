const express = require("express");
const router = express.Router();

const upload = require("../middleware/cloudinaryUpload");
const { protect, authorize } = require("../middleware/auth");

const {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateStatus,
  updateAdminNotes,
  uploadProjectFile,
  deleteProjectFile,
  downloadProjectFile,
  viewProjectFile,
  downloadReferenceFile,
  viewReferenceFile,
} = require("../controllers/bookingController");

// =====================================
// User Routes
// =====================================

router.post(
  "/create",
  protect,
  upload.array("images", 5),
  createBooking
);

router.get(
  "/my-bookings",
  protect,
  getMyBookings
);

// =====================================
// Admin Routes
// =====================================

router.get(
  "/all",
  protect,
  authorize("admin"),
  getAllBookings
);

router.put(
  "/status/:id",
  protect,
  authorize("admin"),
  updateStatus
);

router.put(
  "/notes/:id",
  protect,
  authorize("admin"),
  updateAdminNotes
);

// =====================================
// Project Files
// =====================================

router.post(
  "/upload-file/:id",
  protect,
  authorize("admin"),
  upload.single("file"),
  uploadProjectFile
);

router.get(
  "/file/view/:bookingId/:fileId",
  protect,
  viewProjectFile
);

router.get(
  "/file/download/:bookingId/:fileId",
  protect,
  downloadProjectFile
);

router.delete(
  "/file/:bookingId/:fileId",
  protect,
  authorize("admin"),
  deleteProjectFile
);

// =====================================
// Reference Files
// =====================================

router.get(
  "/reference/view/:bookingId/:fileName",
  protect,
  viewReferenceFile
);

router.get(
  "/reference/download/:bookingId/:fileName",
  protect,
  downloadReferenceFile
);

module.exports = router;