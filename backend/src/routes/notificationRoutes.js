const express = require("express");

const router = express.Router();

const {

getMyNotifications,

markAsRead,

markAllAsRead,

deleteNotification

} = require("../controllers/notificationController");

const { protect } =
require("../middleware/auth");

router.get("/", protect, getMyNotifications);

router.put("/:id", protect, markAsRead);

router.put("/read-all", protect, markAllAsRead);

router.delete("/:id", protect, deleteNotification);

module.exports = router;