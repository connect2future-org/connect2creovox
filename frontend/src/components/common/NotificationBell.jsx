import { useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";
import api from "../../utils/api";
import toast from "react-hot-toast";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const bellRef = useRef(null);

  // ===========================
  // Fetch Notifications
  // ===========================

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const response = await api.get("/api/notifications");

      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error(error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  let mounted = true;

  const load = async () => {
    if (mounted) {
      await fetchNotifications();
    }
  };

  load();

  return () => {
    mounted = false;
  };
}, []);

  // ===========================
  // Close when clicked outside
  // ===========================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        bellRef.current &&
        !bellRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ===========================
  // Mark One Notification Read
  // ===========================

  const markRead = async (id) => {
    try {
      await api.put(`/api/notifications/${id}`);

      fetchNotifications();
    } catch (error) {
      console.error(error);
      toast.error("Unable to update notification.");
    }
  };

  // ===========================
  // Mark All Notifications Read
  // ===========================

  const markAllRead = async () => {
    try {
      await api.put("/api/notifications/read-all");

      fetchNotifications();

      toast.success("All notifications marked as read.");
    } catch (error) {
      console.error(error);

      toast.error("Unable to update notifications.");
    }
  };

  const unreadCount = notifications.filter(
    (n) => !n.read
  ).length;

  return (
    <div
      ref={bellRef}
      className="relative"
    >
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-pink-50 transition"
      >
        <FaBell className="text-xl text-gray-700" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">

          <div className="flex justify-between items-center p-4 border-b">

            <h3 className="font-bold text-gray-800">
              Notifications
            </h3>

            {notifications.length > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-pink-500 hover:underline"
              >
                Mark All
              </button>
            )}

          </div>

          <div className="max-h-96 overflow-y-auto">

            {loading ? (

              <p className="text-center py-6 text-gray-500">
                Loading...
              </p>

            ) : notifications.length === 0 ? (

              <p className="text-center py-6 text-gray-500">
                No notifications yet.
              </p>

            ) : (

              notifications.map((notification) => (

                <div
                  key={notification._id}
                  className={`border-b p-4 transition ${
                    notification.read
                      ? "bg-white"
                      : "bg-pink-50"
                  }`}
                >
                  <p className="font-semibold text-gray-800">
                    {notification.title}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>

                  {!notification.read && (
                    <button
                      onClick={() =>
                        markRead(notification._id)
                      }
                      className="text-xs text-pink-500 mt-2 hover:underline"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>

              ))

            )}

          </div>

        </div>
      )}
    </div>
  );
};

export default NotificationBell;