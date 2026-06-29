const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getMessages,
  markAsRead,
  deleteMessage,
} = require("../controllers/messageController");

const { protect, authorize } = require("../middleware/auth");

// Public
router.post("/", sendMessage);

// Admin
router.get(
  "/",
  protect,
  authorize("admin"),
  getMessages
);

router.put(
  "/:id/read",
  protect,
  authorize("admin"),
  markAsRead
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteMessage
);

module.exports = router;