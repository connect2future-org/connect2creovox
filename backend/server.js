const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const connectDB = require("./src/config/database");

const authRoutes = require("./src/routes/authRoutes");
const serviceRoutes = require("./src/routes/serviceRoutes");
const messageRoutes = require("./src/routes/messageRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");
const notificationRoutes =
require(
"./src/routes/notificationRoutes"
);



const app = express();
console.log("MONGODB_URI =", process.env.MONGODB_URI);
connectDB();

app.use(cors());
app.use(express.json());

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);



app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use(
"/api/notifications",
notificationRoutes
);




app.get("/", (req, res) => {
  res.send("Connect2Creovox API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});