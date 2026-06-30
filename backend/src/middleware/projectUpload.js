const multer = require("multer");
const path = require("path");
const fs = require("fs");

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

// ============================================
// Allowed Mime Types
// ============================================

const allowedMimeTypes = [

  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",

  "application/pdf",

  "application/msword",

  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  "text/plain",

  "application/vnd.ms-excel",

  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

  "application/vnd.ms-powerpoint",

  "application/vnd.openxmlformats-officedocument.presentationml.presentation",

  "application/zip",

  "application/x-rar-compressed",

  "application/vnd.rar"

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

  const ext =
    path.extname(file.originalname).toLowerCase();

  const mime =
    file.mimetype;

  if (

    allowedExtensions.includes(ext) &&

    allowedMimeTypes.includes(mime)

  ) {

    return cb(null, true);

  }

  cb(

    new Error(

      "Unsupported file type. Allowed: PDF, DOC, DOCX, TXT, JPG, PNG, GIF, WEBP, XLS, XLSX, PPT, PPTX, ZIP, RAR."

    )

  );

};

// ============================================
// Multer Upload
// ============================================

const upload = multer({

  storage,

  fileFilter,

  limits: {

    fileSize: 20 * 1024 * 1024 // 20 MB

  }

});

// ============================================
// Export
// ============================================

module.exports = upload;