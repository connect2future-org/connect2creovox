const Notification = require("../models/Notification");

// ===============================
// Get Logged-in User Notifications
// GET /api/notifications
// ===============================
exports.getMyNotifications = async (req, res) => {
  try {

    const notifications = await Notification.find({
      user: req.user.id
    }).sort({ createdAt: -1 });

    const unreadCount = notifications.filter(
      (n) => !n.read
    ).length;

    return res.status(200).json({
      success: true,
      count: notifications.length,
      unreadCount,
      notifications
    });

  } catch (error) {

    console.error("Get Notifications Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch notifications."
    });

  }
};

// ===============================
// Mark Single Notification Read
// PUT /api/notifications/:id
// ===============================
exports.markAsRead = async (req, res) => {

  try {

    const notification =
      await Notification.findById(req.params.id);

    if (!notification) {

      return res.status(404).json({
        success: false,
        message: "Notification not found."
      });

    }

    // Security Check

    if (
      notification.user.toString() !==
      req.user.id
    ) {

      return res.status(403).json({
        success: false,
        message: "Unauthorized access."
      });

    }

    notification.read = true;

    await notification.save();

    return res.status(200).json({

      success: true,

      message: "Notification marked as read.",

      notification

    });

  } catch (error) {

    console.error("Mark Read Error:", error);

    return res.status(500).json({

      success: false,

      message:
        "Failed to update notification."

    });

  }

};

// ===============================
// Mark All Notifications Read
// PUT /api/notifications/read-all
// ===============================
exports.markAllAsRead =
async (req, res) => {

  try {

    await Notification.updateMany(

      {
        user: req.user.id,
        read: false
      },

      {
        read: true
      }

    );

    return res.status(200).json({

      success: true,

      message:
        "All notifications marked as read."

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message:
        "Failed to update notifications."

    });

  }

};

// ===============================
// Delete Notification
// DELETE /api/notifications/:id
// ===============================
exports.deleteNotification =
async (req, res) => {

  try {

    const notification =
      await Notification.findById(
        req.params.id
      );

    if (!notification) {

      return res.status(404).json({

        success: false,

        message:
          "Notification not found."

      });

    }

    if (
      notification.user.toString() !==
      req.user.id
    ) {

      return res.status(403).json({

        success: false,

        message:
          "Unauthorized access."

      });

    }

    await notification.deleteOne();

    return res.status(200).json({

      success: true,

      message:
        "Notification deleted successfully."

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message:
        "Failed to delete notification."

    });

  }

};

// ===============================
// Create Notification (Internal)
// ===============================
exports.createNotification =
async (userId, title, message) => {

  try {

    await Notification.create({

      user: userId,

      title,

      message

    });

  } catch (error) {

    console.error(
      "Notification Create Error:",
      error
    );

  }

};