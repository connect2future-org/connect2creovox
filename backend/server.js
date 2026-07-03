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
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const connectDB = require("./src/config/database");

const authRoutes = require("./src/routes/authRoutes");
const serviceRoutes = require("./src/routes/serviceRoutes");
const messageRoutes = require("./src/routes/messageRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");
const notificationRoutes =require("./src/routes/notificationRoutes");
const errorHandler =require("./src/middleware/errorHandler");



// Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

app.use(compression());

app.use(mongoSanitize());

app.use(hpp());

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

const uploadLimiter = rateLimit({

windowMs:60*60*1000,

max:10,

message:{

success:false,

message:

"Too many uploads. Please try again later."

}

});

app.use(limiter);
console.log("MONGODB_URI =", process.env.MONGODB_URI);
connectDB();

const allowedOrigins = [

  "http://localhost:5173",

  "http://localhost:5174",

  "https://luminous-salmiakki-064f96.netlify.app"

];

app.use(

  cors({

    origin: function (origin, callback) {

      // Allow requests without an Origin (Postman, Render health checks, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {

        return callback(null, true);

      }

      return callback(new Error("Not allowed by CORS"));

    },

    credentials: true

  })

);



app.use(
  express.urlencoded({
    extended: true
  })
);

// =====================================
// Static Uploads
// =====================================

app.use(
  "/uploads/booking-images",
  express.static(
    path.join(__dirname, "uploads/booking-images")
  )
);

app.use(
  "/uploads/project-files",
  express.static(
    path.join(__dirname, "uploads/project-files")
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