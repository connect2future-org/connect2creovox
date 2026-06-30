const multer = require("multer");
const path = require("path");
const fs = require("fs");

// =====================================
// Upload Folder
// =====================================

const uploadDir = path.join(
  __dirname,
  "../../uploads/booking-images"
);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// =====================================
// Storage
// =====================================

const storage = multer.diskStorage({

  destination(req, file, cb) {

    cb(null, uploadDir);

  },

  filename(req, file, cb) {

    const ext = path.extname(file.originalname);

    const name = path
      .basename(file.originalname, ext)
      .replace(/\s+/g, "_")
      .replace(/[^\w-]/g, "");

    cb(
      null,
      Date.now() +
      "-" +
      name +
      ext
    );

  }

});

// =====================================
// Allowed Types
// =====================================

const allowedExtensions = [

  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",

  ".pdf",

  ".doc",
  ".docx",

  ".txt",

  ".xls",
  ".xlsx",

  ".ppt",
  ".pptx",

  ".zip",
  ".rar"

];

// =====================================
// File Filter
// =====================================

const fileFilter = (req, file, cb) => {

  const ext =
    path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {

    return cb(null, true);

  }

  cb(
    new Error(
      "Unsupported file type."
    )
  );

};

// =====================================
// Multer
// =====================================

module.exports = multer({

  storage,

  fileFilter,

  limits: {

    fileSize: 20 * 1024 * 1024

  }

});