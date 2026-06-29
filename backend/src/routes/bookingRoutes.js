const express = require("express");

const router = express.Router();

const upload =
require("../middleware/upload");

const {protect,authorize} =
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




router.post(
"/upload-file/:id",
protect,
authorize("admin"),
projectUpload.single("file"),
uploadProjectFile
);





module.exports = router;