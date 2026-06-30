const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const express = require("express");
const app = express();
app.set("trust proxy", 1);
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const connectDB = require("./src/config/database");

const authRoutes = require("./src/routes/authRoutes");
const serviceRoutes = require("./src/routes/serviceRoutes");
const messageRoutes = require("./src/routes/messageRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");
const notificationRoutes =require("./src/routes/notificationRoutes");
const errorHandler =require("./src/middleware/errorHandler");



// Security Headers
app.use(helmet());

// Compress responses
app.use(compression());

// Limit request size
app.use(express.json({
  limit: "10mb"
}));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message:
      "Too many requests. Please try again later."
  }
});

app.use(limiter);
console.log("MONGODB_URI =", process.env.MONGODB_URI);
connectDB();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

// =====================================
// Static Uploads
// =====================================

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
app.use("/api/notifications",notificationRoutes);
app.use(errorHandler);



app.get("/", (req, res) => {
  res.send("Connect2Creovox API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});