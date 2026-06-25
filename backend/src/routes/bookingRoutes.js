const express = require("express");

const router = express.Router();

const upload =
require("../middleware/upload");

const {protect,admin} =
require("../middleware/auth");


const projectUpload =
require("../middleware/projectUpload");


const {

  createBooking,
  getMyBookings,
  getAllBookings,
  updateStatus,
  updateAdminNotes,
  uploadProjectFile

}
=
require("../controllers/bookingController");

router.post(
 "/create",
 protect,
 upload.array("images",5),
 createBooking
);

router.get(
 "/my-bookings",
 protect,
 getMyBookings
);



router.get(
 "/all",
 protect,
 admin,
 getAllBookings
);



router.put(
 "/status/:id",
 protect,
 admin,
 updateStatus
);

router.put(
 "/notes/:id",
 protect,
 admin,
 updateAdminNotes
);

router.post(
"/upload-file/:id",
protect,
admin,
projectUpload.single("file"),
uploadProjectFile
);




module.exports = router;