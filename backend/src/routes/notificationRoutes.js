const express =
require("express");

const router =
express.Router();

const {
protect
}
=
require("../middleware/auth");

const {

getMyNotifications,
markAsRead

}
=
require(
"../controllers/notificationController"
);

router.get(
"/my",
protect,
getMyNotifications
);

router.put(
"/read/:id",
protect,
markAsRead
);

module.exports =
router;