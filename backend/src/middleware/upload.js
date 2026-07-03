const multer = require("multer");
const path = require("path");
const fs = require("fs");
const processImage = require("../utils/imageProcessor");
// =====================================
// Upload Folder
// =====================================

const uploadDir = path.join(
  __dirname,
  "../../uploads/booking-images"
);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true,
  });
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
      `${Date.now()}-${name}${ext}`
    );

  },

});

// =====================================
// Allowed Types
// =====================================

const allowedExtensions = [

  ".jpg",
  ".jpeg",

  ".pdf",

  ".doc",
  ".docx",

  ".txt"

];

// =====================================
// Filter
// =====================================

const fileFilter = (req, file, cb) => {

  const ext =
    path.extname(file.originalname)
      .toLowerCase();

  if (!allowedExtensions.includes(ext)) {

    return cb(

      new Error(

        "Only JPG, PDF, DOC and TXT files are allowed."

      )

    );

  }

  cb(null, true);

};

// =====================================
// Upload
// =====================================

const upload = multer({

  storage,

  fileFilter,

  limits: {

    fileSize: 10 * 1024 * 1024

  }

});

module.exports = {

  array: (fieldName, maxCount) => [

    upload.array(fieldName, maxCount),

    async (req, res, next) => {

      try {

        if (req.files?.length) {

  for (const file of req.files) {

    const ext = path.extname(file.filename).toLowerCase();

    if (ext === ".jpg" || ext === ".jpeg") {

        await processImage(file.path);

    }

}

        }

        next();

      } catch (err) {

        next(err);

      }

    }

  ]

};