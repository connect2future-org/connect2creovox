const express = require("express");

const router = express.Router();

const {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

const { protect } = require("../middleware/auth");

// Get notifications
router.get("/", protect, getMyNotifications);

// IMPORTANT: This MUST come BEFORE "/:id"
router.put("/read-all", protect, markAllAsRead);

// Mark a single notification as read
router.put("/:id", protect, markAsRead);

// Delete notification
router.delete("/:id", protect, deleteNotification);

module.exports = router;