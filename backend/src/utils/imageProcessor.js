const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// ======================================
// Resize & Compress JPG Images
// ======================================

const processImage = async (filePath) => {

    const extension = path
        .extname(filePath)
        .toLowerCase();

    if (

        extension !== ".jpg" &&

        extension !== ".jpeg"

    ) {

        return;

    }

    const tempFile = filePath + ".tmp";

    await sharp(filePath)

        .resize({

            width: 1200,

            withoutEnlargement: true

        })

        .jpeg({

            quality: 85

        })

        .toFile(tempFile);

    fs.unlinkSync(filePath);

    fs.renameSync(tempFile, filePath);

};

module.exports = processImage;