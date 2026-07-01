const multer = require("multer");
const path = require("path");
const fs = require("fs");
const processImage = require("../utils/imageProcessor");


// ============================================
// Upload Folder
// ============================================

const uploadDir = path.join(
  __dirname,
  "../../uploads/project-files"
);

// Create folder if it doesn't exist

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ============================================
// Allowed File Extensions
// ============================================

const allowedExtensions = [

  ".jpg",

  ".jpeg",

  ".pdf",

  ".doc",

  ".docx",

  ".txt"

];

// ============================================
// Allowed Mime Types
// ============================================

const allowedMimeTypes = [

  "image/jpeg",

  "application/pdf",

  "application/msword",

  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  "text/plain"

];

// ============================================
// Storage
// ============================================

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

// ============================================
// File Filter
// ============================================

const fileFilter = (req, file, cb) => {

  const ext = path
    .extname(file.originalname)
    .toLowerCase();

  const mime = file.mimetype;

  const extensionAllowed =
    allowedExtensions.includes(ext);

  const mimeAllowed =
    allowedMimeTypes.includes(mime);

  if (!extensionAllowed || !mimeAllowed) {

    return cb(
      new Error(
        "Only JPG, PDF, DOC, DOCX and TXT files are allowed."
      )
    );

  }

  cb(null, true);

};

// ============================================
// Multer Upload
// ============================================

const upload = multer({

  storage,

  fileFilter,

  limits: {

    fileSize: 10 * 1024 * 1024

  }

});

// ============================================
// Export
// ============================================

module.exports = {

  single: (fieldName) => [

    upload.single(fieldName),

    async (req, res, next) => {

      try {

        if (req.file) {

          await processImage(req.file.path);

        }

        next();

      }

      catch (err) {

        next(err);

      }

    }

  ]

};