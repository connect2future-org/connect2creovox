const multer = require("multer");
const path = require("path");

// ===============================
// Allowed Extensions
// ===============================

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

// ===============================
// Memory Storage
// ===============================

const storage = multer.memoryStorage();

// ===============================
// File Filter
// ===============================

const fileFilter = (req, file, cb) => {

  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.includes(ext)) {

    return cb(new Error("Unsupported file type."));

  }

  cb(null, true);

};

// ===============================
// Upload
// ===============================

module.exports = multer({

  storage,

  fileFilter,

  limits: {

    fileSize: 20 * 1024 * 1024

  }

});